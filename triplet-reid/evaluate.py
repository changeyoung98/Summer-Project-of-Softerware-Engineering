#!/usr/bin/env python3
from argparse import ArgumentParser
from itertools import count
from PIL import Image,ImageTk

import tkinter
import cv2
import h5py
import numpy as np
import time
import tensorflow as tf

import common
import loss
import os
import csv
import format


parser = ArgumentParser(description='Evaluate a ReID embedding.')


parser.add_argument(
    '--query_dataset', required=True,
    help='Path to the query dataset csv file.')

parser.add_argument(
    '--query_embeddings', required=True,
    help='Path to the h5 file containing the query embeddings.')

parser.add_argument(
    '--gallery_dataset', required=True,
    help='Path to the gallery dataset csv file.')

parser.add_argument(
    '--gallery_embeddings', required=True,
    help='Path to the h5 file containing the gallery embeddings.')

parser.add_argument(
    '--show',action='store_true')

parser.add_argument(
    '--loop',action='store_true')

parser.add_argument(
    '--batch_size', default=256, type=common.positive_int,
    help='Batch size used during evaluation, adapt based on your memory usage.')




def show(img1,img2):
    win = tkinter.Tk()
    win.title("result")
    win.geometry("400x400")
    # img1 = cv2.imread(img1)
    # img2 = cv2.imread(img2)
    # cv2.imshow('target',img1)
    # cv2.imshow('result',img2)
    # cv2.waitKey(0)
    query = Image.open(img1)
    test = Image.open(img2)
    query_show = ImageTk.PhotoImage(query)
    test_show = ImageTk.PhotoImage(test)
    label_img = tkinter.Label(win,text ='target',image=query_show,compound='top')
    label_img1 = tkinter.Label(win,text='result',image=test_show,compound='top')
    label_img.pack(side='left')
    label_img1.pack(side='right')
    button1 = tkinter.Button(win,text='next',command=win.destroy)
    button1.pack(side='bottom')
    win.mainloop()





def result(distances,query_fids,gallery_fids,args,path,tid):
    fpath =list()
    if (min(distances[0]) > 18.5):
        print(query_fids[0] + " : Person not found")
        return "Not Found"
    for i in range(len(distances)):
        k = np.argsort(distances[0])[i]
        j = distances[0][k]
        if (j >= 18.5):
            break;
        fpath.append(gallery_fids[k])

    max = 0
    ret = ""
    for i in range(len(fpath)):
        pth = fpath[i]
        tmp, _, _ = format.parse_csv(pth)
        time = int(tmp)
        if time > max :
            max = time
            ret = pth

    relative_path = ret

    query_path = os.path.join(path, query_fids[0])
    final_path = os.path.join(path, relative_path)
    if args.show:
        show(query_path, final_path)
    else:
        print("Time: %s, Filename: %s"%(tid[k],relative_path))
        print(min(distances[0]))
    return final_path


def loop_result(distances,query_fids,gallery_fids,args,path,tid):
    for i in range(len(query_fids)):
        if (min(distances[i]) > 21):
            print(query_fids[i] + " : Person not found")
            continue
        k = np.argsort(distances[i])[0]
        relative_path = gallery_fids[k]

        query_path = os.path.join(path, query_fids[i])
        final_path = os.path.join(path, relative_path)
        if args.show:
            show(query_path, final_path)
        else:
            print("Time: %s, Filename: %s"%(tid[k],relative_path))
            print(min(distances[i]))



def main():


    # Verify that parameters are set correctly.
    args = parser.parse_args()

    # Load the query and gallery data from the CSV files.
    _,query_fids = common.load_dataset(args.query_dataset, None)
    tid,gallery_fids = common.load_dataset(args.gallery_dataset, None)

    # Load the two datasets fully into memory.
    with h5py.File(args.query_embeddings, 'r') as f_query:
        query_embs = np.array(f_query['emb'])
    with h5py.File(args.gallery_embeddings, 'r') as f_gallery:
        gallery_embs = np.array(f_gallery['emb'])

    # We go through the queries in batches, but we always need the whole gallery
    batch_fids, batch_embs = tf.data.Dataset.from_tensor_slices(
        (query_fids, query_embs)
    ).batch(args.batch_size).make_one_shot_iterator().get_next()


    batch_distances = loss.cdist(batch_embs, gallery_embs, metric='euclidean')

    # Loop over the query embeddings and compute their APs and the CMC curve.

    path = 'reid-test'

    with tf.Session() as sess:

        for start_idx in count(step=args.batch_size):

            try:
                # Compute distance to all gallery embeddings
                distances, fids = sess.run([
                    batch_distances, batch_fids])

            except tf.errors.OutOfRangeError:
                print()  # Done!
                break

            if args.loop:
                loop_result(distances,query_fids,gallery_fids,args,path,tid)
            else:
                msg = result(distances,query_fids,gallery_fids,args,path,tid)
                f = open('D://models/research/object_detection/ans/log.txt', 'w+')
                f.writelines(msg)
                f.close()



if __name__ == '__main__':
    main()
