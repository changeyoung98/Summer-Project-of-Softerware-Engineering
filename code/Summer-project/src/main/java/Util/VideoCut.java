package Util;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.List;

/*
截取直播视频中的画面
 */

public class VideoCut {

  public int cut(String url, String time) {
    final String FFMPEG_PATH = "c:\\ffmpeg\\bin\\ffmpeg.exe";

    int idx = time.lastIndexOf(".");//查找小数点的位置
    String times = time.substring(0,idx);//截取从字符串开始到小数点位置的字符串，就是整数部分
    long cut_time=Long.parseLong(times);
    long hours = (cut_time % ( 60 * 60 * 24)) / (60 * 60);
    long minutes = (cut_time % ( 60 * 60)) /60;
    long seconds = cut_time % 60;
    String hour = String.valueOf(hours);
    String minute = String.valueOf(minutes);
    String second = String.valueOf(seconds);
    String final_time = hour+":"+minute+":"+second;
    String out = "C:\\Users\\Public\\Image\\Tem\\";
    String name = times + ".jpg";
    String video_path = "C:\\Users\\Public\\Image\\Video\\";
    video_path +=url;
    out += name;

    List<String> commands = new java.util.ArrayList<String>();
    commands.add(FFMPEG_PATH);
    commands.add("-ss");
    commands.add(final_time);
    commands.add("-i");
    commands.add(video_path);
    commands.add("-f");
    commands.add("image2");
    commands.add("-s");
    commands.add("720x540");
    commands.add("-vframes");
    commands.add("1");
    commands.add(out);
    System.out.println(out);
    try {
      ProcessBuilder builder = new ProcessBuilder();
      builder.command(commands);
      builder.start();
      System.out.println("middle");
      boolean exist = false;
      while (!exist) {
        File file = new File(out);
        if (file.exists()) {
          exist = true;
        }
      }
      System.out.println("end");
      return 1;
    } catch (Exception e) {
      e.printStackTrace();
      return 0;
    }
  }

  public int InstanceCut(String url) {
    SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String now_time = String.valueOf(df.format(System.currentTimeMillis()));
    final String FFMPEG_PATH = "c:\\ffmpeg\\bin\\ffmpeg.exe";

    String path = url;

    int tem = 1;
    try {
      while (tem <= 30) {
        String time = String.valueOf(tem);
        String out = "C:\\Users\\Public\\Image\\Instance\\";
        out = out + time + ".jpg";
        List<String> commands = new java.util.ArrayList<String>();
        commands.add(FFMPEG_PATH);
        commands.add("-probesize");
        commands.add("32768");
        commands.add("-i");
        commands.add(path);
        commands.add("-y");
        commands.add("-t");
        commands.add("0.001");
        commands.add("-ss");
        commands.add("1");
        commands.add("-f");
        commands.add("image2");
        commands.add("-s");
        commands.add("640X640");
        commands.add(out);
        System.out.println(out);

        ProcessBuilder builder = new ProcessBuilder();
        builder.command(commands);
        builder.start();
        System.out.println("complete");
        tem++;
        Thread.sleep(500);
      }
      return 1;
    } catch (Exception e) {
      e.printStackTrace();
      return 0;
    }
  }

  public int record(String url) {
    SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String now_time = String.valueOf(df.format(System.currentTimeMillis()));
    final String FFMPEG_PATH = "c:\\ffmpeg\\bin\\ffmpeg.exe";

    String path = url;

    int tem = 1;
    try {
      String time = String.valueOf(tem);
      String out = "C:\\Users\\Public\\Image\\Video\\";
      out = out + time + ".flv";
      List<String> commands = new java.util.ArrayList<String>();
      commands.add(FFMPEG_PATH);
      commands.add("-y");
      commands.add("-i");
      commands.add(path);
      commands.add("-vcodec");
      commands.add("-copy");
      commands.add("-acodec");
      commands.add("-copy");
      commands.add("-t");
      commands.add("0:1:0");
      commands.add("-f");
      commands.add("-flv");
      commands.add(out);
      System.out.println(out);

      ProcessBuilder builder = new ProcessBuilder();
      builder.command(commands);
      builder.start();
      System.out.println("complete");
      return 1;
    } catch (Exception e) {
      e.printStackTrace();
      return 0;
    }
  }

  public int con_cut(String camera) {
    SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
    String now_time = String.valueOf(df.format(System.currentTimeMillis()));
    final String FFMPEG_PATH = "c:\\ffmpeg\\bin\\ffmpeg.exe";
    String[] all_camera = camera.split(";");
    try {
      for(String tem: all_camera) {
        String out = "C:\\Users\\Public\\Image\\Instance\\";
        String one = tem.split(" ")[0];
        String two = tem.split(" ")[1];
        out = out + now_time + "_"+ one+"_"+one+ ".jpg";
        List<String> commands = new java.util.ArrayList<String>();
        commands.add(FFMPEG_PATH);
        commands.add("-probesize");
        commands.add("32768");
        commands.add("-i");
        commands.add(two);
        commands.add("-y");
        commands.add("-t");
        commands.add("0.001");
        commands.add("-ss");
        commands.add("1");
        commands.add("-f");
        commands.add("image2");
        commands.add("-s");
        commands.add("640X640");
        commands.add(out);
        System.out.println(out);

        ProcessBuilder builder = new ProcessBuilder();
        builder.command(commands);
        builder.start();
        System.out.println("complete");
      }
      return 1;
    } catch (Exception e) {
      e.printStackTrace();
      return 0;
    }
  }
}
