package classes;

import java.lang.*;
import java.util.*;
import java.io.*;


public class Matrix {
    private int[][] route;
    private int size;

    public Matrix(int size) {
        this.size = size;
        this.route = new int[size][size];
        for(int i = 0;i < size;i++) {
            for (int j = 0;j < size; j++) {
                this.route[i][j] = 0;
            }
        }
    }

    public Matrix(String file, int size){
        this.size = size;
        this.route = new int[size][size];
        try {
            InputStreamReader reader = new InputStreamReader(new FileInputStream(file));
            BufferedReader br = new BufferedReader(reader);
            String line = "";
            int i = 0;
            while ((line = br.readLine()) != null) {
                //System.out.println(line);
                String[] tmp = line.split(" ");
                for (int j =0;j < tmp.length;j++){
                    this.route[i][j] = Integer.valueOf(tmp[j]);
                }
                i ++;
            }
        }
        catch (Exception e){
            System.out.println(e.getStackTrace());
        }
    }

    public void show(){
        int n = this.size;
        for(int i = 0;i < n;i++) {
            ArrayList<Integer> show = new ArrayList<Integer>();
            for (int j = 0; j < n;j++){
                show.add(this.route[i][j]);
            }
            System.out.println(show);
        }
    }

    public int[][] getRoute(){
        return this.route;
    }

    public int getSize(){
        return this.size;
    }

    public ArrayList<Integer> getNeighbour(int i){
        if (i < 1){
            return null;
        }
        i --;
        ArrayList<Integer> ret = new ArrayList<Integer>();
        for (int k = 0;k < this.size ;k++){
            if(this.route[i][k] > 0){
                ret.add(k+1);
            }
        }
        return ret;
    }

    public Map<Integer,Integer> getDist(int i){
        Map<Integer,Integer> ret = new HashMap<Integer, Integer>();
        ArrayList<Integer> neighbour = getNeighbour(i);
        for(int temp : neighbour){
            ret.put(temp,route[i][temp]);
        }
        return ret;
    }

    public static void main(String args[]) {

        Matrix mat = new Matrix("D:\\Proj\\algo\\src\\main\\java\\classes\\route.txt",4);

        mat.show();
        ArrayList<Integer> ret = mat.getNeighbour(1);
        System.out.println(ret);




    }

}