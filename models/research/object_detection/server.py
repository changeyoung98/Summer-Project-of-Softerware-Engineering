import socket
import os
import sys
import struct
import format
from argparse import ArgumentParser
import time
import csv

BUF_SIZE = 1024

def init():
    args = parser.parse_args()
    if not args.ip:
        ip = '192.168.1.198'
    else:
        ip = args.ip
    if not args.port:
        port = 6666
    else:
        port = int(args.port)
    return ip,port


def quit(signum,frame):
    print("Server exited with signal %s"%signum)
    os._exit(0)

def recv_msg(sock):
    while 1:
        data = sock.recv(BUF_SIZE)
        if not data:
            break
        # data.decode(encoding='utf-8')
        data = str(data, 'utf-8')
        print(data)
        return data


def do_find(sock, addr):
    deal_data(sock, addr)
    os.system('python photo_query.py --path image/query1.jpg')
    os.system('cd /d e://triplet-reid &&'
              ' python evaluate.py'
              ' --query_dataset data\query.csv'
              ' --query_embeddings experiments\my_experiment\query.h5'
              ' --gallery_dataset data/test.csv'
              ' --gallery_embeddings experiments\my_experiment/test.h5')
    # data = "Person_Found"
    # sock.sendall(data.encode(encoding="utf-8"))
    # sock.close()
    f = open('ans/log.txt', 'r+')
    ans = f.readline()
    f.close()
    if ans == "Not Found":
        data = "Person_NotFound"
        sock.sendall(data.encode(encoding="utf-8"))
    else:
        data = "Person_Found"
        sock.sendall(data.encode(encoding="utf-8"))
        filepath = 'E://triplet-reid/' + ans
        fhead = struct.pack(b'128sl', bytes(os.path.basename(filepath), encoding='utf-8'), os.stat(filepath).st_size)
        sock.send(fhead)
        print('client filepath: {0}'.format(filepath))
        fp = open(filepath, 'rb')
        while 1:
            data = fp.read(1024)
            if not data:
                print('{0} file send over...'.format(filepath))
                break
            sock.send(data)
    sock.close()


def do_scan(sock, addr, num):
    scan_csv = open('E://triplet-reid/data/scan.csv', 'w')
    scan_writer = csv.writer(scan_csv)
    scan_csv.close()
    for i in range(num):
        filename = deal_data(sock, addr)
        os.system('python photo_test.py --path ' + filename)
        data = str(i) + " ok"
        sock.sendall(data.encode(encoding="utf-8"))
    scan_csv = open('E://triplet-reid/data/scan.csv', 'r')
    scan_reader = csv.reader(scan_csv)
    count = 0
    for row in scan_reader:
        temp = row
        count += 1
        if count >= 2:
            break
    scan_csv.close()
    if count == 0:
        data = "No person in cameras"
        sock.sendall(data.encode(encoding="utf-8"))
        sock.close()
    else:
        if count ==1:
            scan_csv = open('E://triplet-reid/data/scan.csv', 'a+', newline='')
            scan_writer = csv.writer(scan_csv)
            scan_writer.writerow(temp)
            scan_csv.close()
        os.system('cd /d e://triplet-reid &&'
                  ' python embed.py'
                  ' --experiment_root experiments/my_experiment'
                  ' --dataset data/scan.csv --filename scan.h5'
                  ' --flip_augment --aggregator mean'
                  ' --checkpoint checkpoint-25000 --quiet')
        os.system('cd /d e://triplet-reid &&'
                  ' python scan.py'
                  ' --query_dataset data\query.csv'
                  ' --query_embeddings experiments\my_experiment\query.h5'
                  ' --gallery_dataset data/scan.csv'
                  ' --gallery_embeddings experiments\my_experiment/scan.h5')
        f = open('ans/scan.txt', 'r+')
        ans = f.readline()
        f.close()
        if ans == "Not Found":
            data = "Person_NotFound"
            sock.sendall(data.encode(encoding="utf-8"))
        else:
            data = "Person_Found"
            sock.sendall(data.encode(encoding="utf-8"))
            data = format.parse_csv(ans)
            sock.sendall(data.encode(encoding="utf-8"))
        sock.close()


def do_cache(sock):
    sys.exit(0)
    return 0


def socket_service():
    ip, port = init()
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        s.bind((ip, port))
        s.listen(10)
    except socket.error as msg:
        print(msg)
        sys.exit(1)

    print("Wait")

    while True:
        sock, addr = s.accept()
        msg = recv_msg(sock)
        mode, num = format.parse_mode(msg)
        if mode == 'FIND':

            do_find(sock, addr)
        elif mode == 'SCAN':
            do_scan(sock, addr, num)
        elif mode == 'CACHE':
            do_cache(sock)



    s.close()


def deal_data(sock, addr):
    print("Accept connection from {0}".format(addr))
    while True:
        fileinfo_size = struct.calcsize('128sl')
        buf = sock.recv(fileinfo_size)
        if buf:
            filename, filesize = struct.unpack('128sl', buf)
            fn = filename.decode().strip('\x00')
            new_filename = os.path.join('image/', fn)

            recvd_size = 0
            fp = open(new_filename, 'wb')

            while not recvd_size == filesize:
                if filesize - recvd_size > 1024:
                    data = sock.recv(1024)
                    recvd_size += len(data)
                else:
                    data = sock.recv(1024)
                    recvd_size = filesize
                fp.write(data)
            fp.close()
        break
    return fn


if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('--ip')
    parser.add_argument('--port')
    socket_service()