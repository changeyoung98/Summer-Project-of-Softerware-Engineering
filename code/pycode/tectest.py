from argparse import ArgumentParser
import os
import tensorflow as tf
import cv2
import numpy

def sess_init(sess):
    init = tf.global_variables_initializer()
    sess.run(init)

def main():

    W = tf.Variable([.1], dtype=tf.float32)
    b = tf.Variable([-.1], dtype=tf.float32)
    x = tf.placeholder(tf.float32)
    linear_model = W * x + b
    y = tf.placeholder(tf.float32)

    x_arr = [1,2,3,6,8]
    y_arr = [4.8,8.5,10.4,21.0,25.3]

    sess = tf.Session()
    sess_init(sess)

    loss = tf.reduce_sum(tf.square(linear_model - y))
    optimizer = tf.train.GradientDescentOptimizer(0.001)
    train = optimizer.minimize(loss)
    for i in range(100000):
        sess.run(train,{x:x_arr,y:y_arr})

    print ('W: %s b :%s loss: %s' % (sess.run(W),sess.run(b),sess.run(loss,{x:x_arr,y:y_arr})))







if __name__ == '__main__':
    main()