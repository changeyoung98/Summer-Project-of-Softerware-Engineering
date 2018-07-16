package algorithm;

import classes.*;

import java.util.*;

public class Dij {
    private Matrix mat;
    private int size;
    private HashSet<Integer> pointSet;
    private ArrayList<Integer> dist;
    public Dij(String file,int size){
        this.mat = new Matrix(file,size);
        this.pointSet = new HashSet<Integer>();
        this.dist = new ArrayList<Integer>();
        for(int i = 0; i < size; i++){
            this.pointSet.add(i);
        }
        this.size = size;
        mat.show();
    }

    private int getMin(ArrayList<Integer> dista, int id){
        int min = 9999;
        int idx = 0;
        for (int i = 0;i < dista.size();i++){

            if (!(i == id) && pointSet.contains(i)) {
                if (dista.get(i) < min) {
//                    System.out.println("changed with" + i);
                    min = dist.get(i);
                    idx = i;
                }
            }
        }
        return idx;
    }

    public void runDij(int start){
        start --;
        HashSet<Integer> reach = new HashSet<Integer>();
        pointSet.remove(start);
        reach.add(start);
        for (int i = 0;i < size;i++){
            dist.add(999);
        }
        dist.set(start,0);
        ArrayList<Integer> temp = mat.getNeighbour(start+1);
        for(int i : temp){
            i --;
            dist.set(i,mat.getRoute()[start][i]);
        }
        for (int i = 0;i < size - 1;i++){
            int j = getMin(dist,start);
            System.out.println("j : " + j);
            reach.add(j);
            pointSet.remove(j);

            ArrayList<Integer> tmp = mat.getNeighbour(j+1);
            System.out.println("tmp : "+ tmp);
            for(int k : tmp){
                k --;
                System.out.println("k : " + k);
                int len = mat.getRoute()[k][j];
                if (len != -1) {
                    if (pointSet.contains(k) && (dist.get(j) + len < dist.get(k))) {
                        dist.set(k, dist.get(j) + len);
                    }
                }
                int len1 = mat.getRoute()[j][k];
                if (len1 != -1) {
                    if (pointSet.contains(k) && (dist.get(j) + len1 < dist.get(k))) {
                        dist.set(k, dist.get(j) + len1);
                    }

                }
                System.out.println(dist);

            }
        }
        System.out.println("final" + dist);
    }

    public static void main(String[] args){
        Dij d = new Dij("D:\\Proj\\Summer-Project-of-Softerware-" +
                "Engineering\\code\\algo\\src\\main\\java\\classes\\test.txt",6);
        d.runDij(2);
    }
}
