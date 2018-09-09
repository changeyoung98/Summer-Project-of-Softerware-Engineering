import os

"""
# format filename with time, camera_id and pic_id :
  
"""


def format_filename(time,camera_id,pic_id):
    ret = time + "_" + camera_id + "_" + pic_id
    return ret


def parse_filename(filename):
    arr = filename.split("_")
    return arr[0],arr[1],arr[2]


def format_csvpath(fold,filename):
    id = '1'
    ret = fold + '/' +  filename + '.jpg'
    return id,ret


# Time, camera_id , pic_id
def parse_csv(filename):
    i = filename.rfind('.jpg',0,len(filename))
    arr = filename[:i].split('/')
    str = arr[len(arr)-1]
    return parse_filename(str)


def parse_mode(msg):
    arr = msg.split(" ")
    num = int(arr[2])
    mode = arr[1]
    return mode,num

if __name__ == '__main__':
    i = format_filename("12",'1','2')
    _,p = format_csvpath('query',i)
    print(p)
    a,b,c =parse_csv(p)
    print(a,b,c)

