package UtilTest;

import Util.VideoCut;
import org.junit.Assert;
import org.junit.Test;

import java.io.File;


public class VideoCutTest {

  @Test
  public void cut() {
    VideoCut cut = new VideoCut();
    String url = "guardinas2.mp4";
    String time = "5";
    int result = cut.cut(url,time);
    Assert.assertTrue(result==1);

  }

  @Test
  public void instanceCut() {
  }

  @Test
  public void record() {
    String url = "rtmp://ns8.indexforce.com/home/mystream";
    VideoCut cut = new VideoCut();
    int result = cut.record(url);
    String out = "C:\\Users\\Public\\Image\\Video\\1.flv";
    boolean exist = false;
    while (!exist) {
      File file = new File(out);
      if (file.exists()) {
        exist = true;
      }
    }
    Assert.assertTrue(result==1);
  }

  @Test
  public void con_cut() {
    VideoCut cut = new VideoCut();
    String camera = "1 rtmp://ns8.indexforce.com/home/mystream;2 rtmp://ns8.indexforce.com/home/mystream";
    int result = cut.con_cut(camera);
    Assert.assertTrue(result==1);
  }
}
