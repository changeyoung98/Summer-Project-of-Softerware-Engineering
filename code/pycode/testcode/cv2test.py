import os
import cv2

import numpy as np
import tensorflow as tf
# os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
# a = tf.random_normal((100, 100))
# b = tf.random_normal((100, 500))
# c = tf.matmul(a, b)
# sess = tf.InteractiveSession()
# print (sess.run(c))
import numpy
import torch
if __name__ == '__main__':
    # CUDA Test
    x = torch.Tensor([1.0])
    xx = x.cuda()
    print(xx)

cap = cv2.VideoCapture(0)
while(1):
    # get a frame
    ret, frame = cap.read()
    # show a frame
    cv2.imshow("capture", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
cap.release()
cv2.destroyAllWindows()
