import socket
import os
import sys
import struct
from argparse import ArgumentParser

BUF_SIZE = 1024

def arg_parse(args):

    ip = args.ip
    suffix = '.jpg'

    if not args.folder:
        prefix = 'models/query/'
    else:
        prefix = args.folder

    if not args.port:
        port = 6666
    else:
        port = int(args.port)

    if not args.name:
        filepath = 'sb'

    else:
        filepath = args.name

    path = prefix + filepath + suffix
    return ip,port,path

def recv_ans(sock):
    while 1:
        data = sock.recv(1024)
        if not data:
            break
        # data.decode(encoding='utf-8')
        data = str(data, 'utf-8')
        print(data)
        if data == "Person_NotFound":
            return 0
        else :
            return 1

def recv_data(sock):
    while True:
        fileinfo_size = struct.calcsize('128sl')
        buf = sock.recv(fileinfo_size)
        if buf:
            filename, filesize = struct.unpack('128sl', buf)
            fn = filename.decode().strip('\x00')
            new_filename = os.path.join('./', 'new_' + fn)

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

def sock_client():
    args = parser.parse_args()
    ip,port,path = arg_parse(args)


    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((ip, port))
    except socket.error as msg:
        print(msg)
        print(sys.exit(1))

    while True:
        # filepath = input('input the file: ')

        print(path + " reading...")
        # filepath = 'test.png'
        fhead = struct.pack(b'128sl', bytes(os.path.basename(path), encoding='utf-8'), os.stat(path).st_size)
        s.send(fhead)
        
        fp = open(path, 'rb')
        while 1:
            data = fp.read(1024)
            if not data:
                print('{0} file send over...'.format(path))
                break
            s.send(data)

        flag = recv_ans(s)
        if flag == 1:
            print("Person found, receving picture")
            recv_data(s)
        else:
            s.close()

        break

if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument("--ip")
    parser.add_argument("--port")
    parser.add_argument("--folder")
    parser.add_argument("--name")
    
    sock_client()
