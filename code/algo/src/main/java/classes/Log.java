package classes;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.lang.*;

public class Log {
    ArrayList<Integer> times;
    Map<Integer,Integer> log;

    public Log(String file){
        this.times = new ArrayList<Integer>();
        this.log = new HashMap<Integer, Integer>();
        try {
            InputStreamReader reader = new InputStreamReader(new FileInputStream(file));
            BufferedReader br = new BufferedReader(reader);
            String line = "";
            while ((line = br.readLine()) != null) {
                String[] tmp = line.split(" ");
                int tmp_time = Integer.valueOf(tmp[0]);
                int tmp_id = Integer.valueOf(tmp[1]);
                this.times.add(tmp_time);
                this.log.put(tmp_time,tmp_id);

            }
        }
        catch (Exception e){
            System.out.println(e.getStackTrace());
        }

    }

    public ArrayList<Double> getFrequency(int num){
        ArrayList<Double> ret = new ArrayList<Double>();
        int loop = times.size();
        for (int i = 0;i < num; i++){
            ret.add(0.0);
        }
        int[] cnt = new int[num];
        for (int k : times){
            int tmp = log.get(k) - 1;
            cnt[tmp] ++;
        }
        for (int i = 0; i < num;i++){
            Double tmp =  cnt[i]/(double)num;
            ret.set(i,tmp);
        }

        return ret;
    }

    public int getRecent(){
        int min = 100;
        for (Integer i : times){
            if ( i < min ){
                min = i;
            }
        }
        return this.log.get(min);
    }

    public ArrayList<Integer> getTimes() {
        return this.times;
    }

    public Map<Integer, Integer> getLog() {
        return this.log;
    }

    public static void main(String[] args){
        Log log = new Log("D:\\Proj\\algo\\src\\main\\java\\classes\\log.txt");
        ArrayList<Integer> i = log.getTimes();
        Map<Integer,Integer> k = log.getLog();
        for (Integer j : i){
            System.out.print(j);
            System.out.print(" ");
            System.out.print(k.get(j));
            System.out.print("\n");
        }
        System.out.print(log.getFrequency(4));


    }
}
