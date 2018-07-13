package Util;

import java.io.*;
import java.net.URI;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.servlet.ServletContext;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import static java.lang.Thread.sleep;

/*
截取直播视频中的画面
 */

public class VideoCut {

  private String url;
  private int camera;

  public int getCamera() {
    return camera;
  }

  public String getUrl() {
    return url;
  }

  public void setCamera(int camera) {
    this.camera = camera;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public int cut(String url, String time) {
    final String FFMPEG_PATH = "c:\\ffmpeg\\bin\\ffmpeg.exe";

    String path = url;
    String out = "C:\\Users\\联想\\demo.jpg";

    List<String> commands = new java.util.ArrayList<String>();
    commands.add(FFMPEG_PATH);
    commands.add("-i");
    commands.add(path);
    commands.add("-y");
    commands.add("-f");
    commands.add("image2");
    commands.add("-ss");
    commands.add("8");
    commands.add("-t");
    commands.add("0.001");
    commands.add("-s");
    commands.add("720X640");
    commands.add(out);
    System.out.println(out);
    try {
      ProcessBuilder builder = new ProcessBuilder();
      builder.command(commands);
      builder.start();
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
        String time=String.valueOf(tem);
        String out = "C:\\Users\\联想\\image\\";
        out = out+time+".jpg";
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
        commands.add("720X640");
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
}
