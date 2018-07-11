import socket
import os
import sys
import struct
from argparse import ArgumentParser


def sock_client():
    args = parser.parse_args()
    ip = args.ip
    port = args.port
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((ip, 6666))
    except socket.error as msg:
        print(msg)
        print(sys.exit(1))

    while True:
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
        break


if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument("--ip")
    parser
    sock_client()