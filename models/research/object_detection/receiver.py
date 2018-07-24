import socket
import os
import sys
import struct
from argparse import ArgumentParser
import signal
import time

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
    s.close()


def deal_data(sock, addr):
    print("Accept connection from {0}".format(addr))

    while True:
        fileinfo_size = struct.calcsize('128sl')
        buf = sock.recv(fileinfo_size)
        if buf:
            filename, filesize = struct.unpack('128sl', buf)
            fn = filename.decode().strip('\x00')
            new_filename = os.path.join('image/', 'query1.jpg')

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


if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('--ip')
    parser.add_argument('--port')
    socket_service()
