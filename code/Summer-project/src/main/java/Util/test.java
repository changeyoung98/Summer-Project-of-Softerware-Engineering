package Util;

import java.io.InputStreamReader;
import java.io.LineNumberReader;
import java.io.*;

public class test {

  public int find_person() {
    String result = "";

    try {
//            Process process = Runtime.getRuntime().exec("python src/test.py" );
//            //Process process = Runtime.getRuntime().exec("python src/client.py  --ip 192.168.1.198 --port 6666 --folder models/query/ --name sb" );
//            InputStreamReader ir = new InputStreamReader(process.getInputStream(),"GBK");
//            LineNumberReader input = new LineNumberReader(ir);
//            result = input.readLine();
//            input.close();
//            ir.close();
////            process.waitFor();
      File directory = new File("");
      String courseFile = directory.getCanonicalPath();
      System.out.println(courseFile);
      String temp2 = "C:\\Users\\Public\\Image\\client.py";
      String exe = courseFile + temp2;
      System.out.println(exe);
      String[] args1 = new String[]{"python", temp2, "--ip", "192.168.1.198",
        "--port", "6666", "--folder", "C:\\Users\\Public\\Image\\Sample\\", "--name", "query1"};
      Process pr = Runtime.getRuntime().exec(args1);

      BufferedReader in = new BufferedReader(new InputStreamReader(
        pr.getInputStream()));
      String line;
      while ((line = in.readLine()) != null) {
        System.out.println(line);
      }
      in.close();
      pr.waitFor();
      System.out.println("end");
      System.out.println(result);
      return 1;

    } catch (Exception e) {
      System.out.println("调用python脚本并读取结果时出错：" + e.getMessage());
      System.out.println(result);
      return 0;
    }


  }

}
