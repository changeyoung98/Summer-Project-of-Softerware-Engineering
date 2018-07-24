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


def quit(signum, frame):
    sys.exit()


def sock_client():
    ip, port = init()
    signal.signal(signal.SIGINT, quit)
    while True:
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.connect((ip, port))
        except socket.error as msg:
            print(msg)
            print(sys.exit(1))
        filepath = input('input the file: ')
        # filepath = 'test.png'
        fhead = struct.pack(b'128sl', bytes(os.path.basename(filepath), encoding='utf-8'), os.stat(filepath).st_size)
        s.send(fhead)
        print('client filepath: {0}'.format(filepath))

        fp = open(filepath, 'rb')
        while 1:
            data = fp.read(1024)
            if not data:
                print('{0} file send over...'.format(filepath))
                break
            s.send(data)
        s.close()


if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('--ip')
    parser.add_argument('--port')
    sock_client()