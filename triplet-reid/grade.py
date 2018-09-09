from multiprocessing import Process



import os

def embed(mode):
    if mode == 'test':
        os.system('cd /d d://triplet-reid &&'
                  ' python embed.py'
                  ' --experiment_root experiments/my_experiment'
                  ' --dataset data/test.csv --filename test.h5'
                  ' --flip_augment --aggregator mean'
                  ' --checkpoint checkpoint-25000 --quiet')
    elif mode == 'query':
        os.system('cd /d d://triplet-reid &&'
                  ' python embed.py'
                  ' --experiment_root experiments/my_experiment'
                  ' --dataset data/query.csv --filename query.h5'
                  ' --flip_augment --aggregator mean'
                  ' --checkpoint checkpoint-25000 --quiet')


def do_embed(i):
    print(i)
    child1= Process(target=embed, args=('query',))
    child2 = Process(target=embed,args=('test',))
    # child1.daemon = True
    # child2.daemon = True
    child1.start()
    child2.start()
    child1.join()
    child2.join()

    print("embed done")

def do_eval():
    os.system('cd /d d://triplet-reid &&'
              ' python evaluate.py'
              ' --query_dataset data\query.csv'
              ' --query_embeddings experiments\my_experiment\query.h5'
              ' --gallery_dataset data/test.csv'
              ' --gallery_embeddings experiments\my_experiment/test.h5'
              ' --loop'
              ' --show')


def main():
    child = Process(target=do_embed(1))

    child.daemon = False
    child.start()
    do_eval()

if __name__ == '__main__':
    main()
