import numpy as np
from argparse import ArgumentParser
from selenium import webdriver


def main():
    args = parser.parse_args()
    a = np.ones(int(args.arg))
    print(a)
    print('java 调用有第三方库的python脚本成功')


if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('--arg')
    main()