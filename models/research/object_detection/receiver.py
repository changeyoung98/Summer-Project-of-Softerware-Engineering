import socket
import os
import sys
import struct
from argparse import ArgumentParser
import signal

def init():
    args = parser.parse_args()
    ip = args.ip
    port = int(args.port)
    return ip,port

def quit(signum,frame):
    print("Server exited with signal %s"%signum)
    sys.exit()

def socket_service():
    ip,port = init()
    signal.signal(signal.SIGINT,quit)
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
        os.system('python photo_test.py --path image/query1.jpg')
        os.system('cd /d e://triplet-reid &&'
                  ' python evaluate.py'
                  ' --query_dataset data\query.csv'
                  ' --query_embeddings experiments\my_experiment\query.h5'
                  ' --gallery_dataset data/test.csv'
                  ' --gallery_embeddings experiments\my_experiment/test.h5'
                  ' --loop')
        #os.system("python ")
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
        sock.close()
        break


if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('--ip')
    parser.add_argument('--port')
    socket_service()
