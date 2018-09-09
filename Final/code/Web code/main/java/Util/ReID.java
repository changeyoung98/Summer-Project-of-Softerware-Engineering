package Util;

import java.io.InputStreamReader;
import java.io.LineNumberReader;
import java.io.*;

public class ReID {

  public String find_person(String filename) {
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
        "--mode", "find", "--folder", "C:\\Users\\Public\\Image\\Sample\\", "--name", "query1",
        "--save", "C:\\Users\\Public\\Image\\Recv\\recv.jpg"
      };
      Process pr = Runtime.getRuntime().exec(args1);

      BufferedReader in = new BufferedReader(new InputStreamReader(
        pr.getInputStream()));
      String line;
      int iffind =0;
      while ((line = in.readLine()) != null) {
        if(line.contains("Found:")){
          iffind=1;
          result = line;
        }
        System.out.println(line);
      }
      in.close();
      pr.waitFor();
      System.out.println("end");
      System.out.println(result);
      if(iffind==0){
        return "Not Found";
      }
      else {
        return result;
      }

    } catch (Exception e) {
      System.out.println("调用python脚本并读取结果时出错：" + e.getMessage());
      System.out.println(result);
      return "Something wrong happened";
    }
  }

  public String find_instance(String filename) {
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
        "--mode", "scan", "--folder", "C:\\Users\\Public\\Image\\Instance\\", "--name", "11_1_1;3_2_2"};
      Process pr = Runtime.getRuntime().exec(args1);

      BufferedReader in = new BufferedReader(new InputStreamReader(
        pr.getInputStream()));
      String line;
      int iffind = 0;
      while ((line = in.readLine()) != null) {
        if(line.contains("Found:")){
          iffind=1;
          result = line;
          String path = line.split(":")[1];
          try {
            String oldPath = "C:\\Users\\Public\\Image\\Instance\\"+path;
            String newPath ="C:\\Users\\Public\\Image\\Recv\\"+path;
            int bytesum = 0;
            int byteread = 0;
            File oldfile = new File(oldPath);
            if (oldfile.exists()) { //文件存在时
              InputStream inStream = new FileInputStream(oldPath); //读入原文件
              FileOutputStream fs = new FileOutputStream(newPath);
              byte[] buffer = new byte[1444];
              int length;
              while ( (byteread = inStream.read(buffer)) != -1) {
                bytesum += byteread; //字节数 文件大小
//                    System.out.println(bytesum);
                fs.write(buffer, 0, byteread);
              }
              inStream.close();
            }
          }
          catch (Exception e) {
            System.out.println("复制单个文件操作出错");
            e.printStackTrace();
          }
        }
        System.out.println(line);
      }
      in.close();
      pr.waitFor();
      System.out.println("end");
      System.out.println(result);
      if(iffind==0){
        return "Not Found";
      }
      else{
        return result;
      }

    } catch (Exception e) {
      System.out.println("调用python脚本并读取结果时出错：" + e.getMessage());
      System.out.println(result);
      return "Something wrong happended";
    }


  }
}
