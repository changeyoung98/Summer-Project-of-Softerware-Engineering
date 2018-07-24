import socket
import os
import sys
import struct
import signal


def quit(signum, frame):
    sys.exit()


def sock_client(ip,port,filepath):
    signal.signal(signal.SIGINT, quit)
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((ip, port))
    except socket.error as msg:
        print(msg)
        print(sys.exit(1))
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

def main(ip,port,path):
    sock_client(ip,port,path)


if __name__ == '__main__':
    main()