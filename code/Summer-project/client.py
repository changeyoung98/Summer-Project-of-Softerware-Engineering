import socket
import os
import sys
import struct
import time
from argparse import ArgumentParser

parser = ArgumentParser()

# Required
parser.add_argument(
    "--ip", required=True, help= "The IP address of the client")

# Optional
parser.add_argument(
    "--port", help = "The port of the client")

parser.add_argument(
    "--folder", help = 'The parent directory of the picture')

parser.add_argument(
    "--name", help = 'The name of the picture(s). If the mode is find, you'
                     'should give the name of the pictures in the following format:'
                     '1;2;3 standing for 1.jpg and 2.jpg and 3.jpg')

parser.add_argument(
    "--save", help = "The path of the file to save to")

parser.add_argument(
    "--mode", choices=['scan', 'find', 'cache'],help = 'The mode of the transfer')

BUF_SIZE = 1024

def arg_parse(args):
    ip = args.ip
    suffix = '.jpg'

    if not args.folder:
        prefix = 'D:/Proj/Summer-Project-of-Softerware-Engineering/code/algo/src/models/query/'
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

    if not args.save:
        savename = "D:/Proj/Summer-Project-of-Softerware-Engineering/code/algo/src/recv.jpg"
    else:
        savename = args.save

    if not args.mode:
        mode = 'find'
    else:
        mode = args.mode

    path = list()
    if mode == 'find':
        temp = prefix + filepath + suffix
        path.append(temp)
    elif mode == 'scan' or  mode == 'cache':
        pic_names = filepath.split(";")
        length = len(pic_names)
        for i in range(length):
            fp = pic_names[i]
            temp = prefix + fp + suffix
            path.append(temp)
    return ip, port, path, mode, savename


def recv_ans(sock):
    while 1:
        data = sock.recv(BUF_SIZE)
        if not data:
            break
        # data.decode(encoding='utf-8')
        data = str(data, 'utf-8')
        print(data)
        if data == "Person_NotFound":
            return data, 0
        elif data == "Person_Found":
            return data, 1
        else:
            return data, 0


def recv_data(sock, save_name):
    while True:
        fileinfo_size = struct.calcsize('128sl')
        buf = sock.recv(fileinfo_size)
        if buf:
            filename, filesize = struct.unpack('128sl', buf)
            fn = filename.decode().strip('\x00')
            cid = fn.split("_")[1]
            print("Found: in camera " + cid)
            new_filename = save_name
            recvd_size = 0
            fp = open(new_filename, 'wb')

            while not recvd_size == filesize:
                if filesize - recvd_size > BUF_SIZE:
                    data = sock.recv(BUF_SIZE)
                    recvd_size += len(data)
                else:
                    data = sock.recv(BUF_SIZE)
                    recvd_size = filesize
                fp.write(data)
            fp.close()
        break


def do_find(s, fpath, save_name):
    path = fpath[0]
    while True:
        print(path + " reading...")
        fhead = struct.pack(b'128sl', bytes(os.path.basename(path), encoding='utf-8'), os.stat(path).st_size)
        s.send(fhead)
        fp = open(path, 'rb')
        while 1:
            data = fp.read(BUF_SIZE)
            if not data:
                print('{0} file send over...'.format(path))
                break
            s.send(data)

        _, flag = recv_ans(s)
        if flag == 1:
            print("Person found, receving picture")
            recv_data(s,save_name)
            s.close()
        else:
            print("Person not found")
            s.close()

        break


def do_scan(s, fpath,save_name):
    num = len(fpath)
    for i in range(num):
        path = fpath[i]
        while True:
            print(path + " reading...")
            fhead = struct.pack(b'128sl', bytes(os.path.basename(path), encoding='utf-8'), os.stat(path).st_size)
            s.send(fhead)
            fp = open(path, 'rb')
            while 1:
                data = fp.read(BUF_SIZE)
                if not data:
                    print('{0} file send over...'.format(path))
                    break
                s.send(data)
            break
        s.recv(BUF_SIZE)
    _, flag = recv_ans(s)
    if (flag == 1):
        msg, _= recv_ans(s)
        i = msg.rfind('.jpg', 0, len(msg))
        fname = msg[:i-1]+".jpg"
        print("Found:"+fname)
    s.close()


def do_cache(s, fpath):
    num = len(fpath)
    for i in range(num):
        path = fpath[i]
        while True:
            fhead = struct.pack(b'128sl', bytes(os.path.basename(path), encoding='utf-8'), os.stat(path).st_size)
            s.send(fhead)
            fp = open(path, 'rb')
            while 1:
                data = fp.read(BUF_SIZE)
                if not data:
                    print('{0} file send over...'.format(path))
                    break
                s.send(data)
            break
        time.sleep(2)
    s.close()


def sock_client():
    args = parser.parse_args()
    ip, port, path, mode, savename = arg_parse(args)

    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((ip, port))
    except socket.error as msg:
        print(msg)
        print(sys.exit(1))

    if mode == 'find':
        msg = "MODE FIND 1"
        s.sendall(msg.encode(encoding='utf-8'))
        do_find(s, path, savename)

    elif mode == 'scan':
        num = str(len(path))
        msg = "MODE SCAN " + num
        print(msg)
        s.sendall(msg.encode(encoding='utf-8'))
        do_scan(s, path, savename)

    elif mode == 'cache':
        num = str(len(path))
        msg = "MODE CACHE " + num
        print(msg)
        s.sendall(msg.encode(encoding='utf-8'))
        do_cache(s, path)


if __name__ == '__main__':
    sock_client()
