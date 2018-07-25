package ControllerTest;

import Controller.VideoWeb;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.io.File;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath*:spring-mvc.xml"})


public class VideoWebTest {
    @Autowired
    private VideoWeb video;
    @Test
    public void cut() {
        String url="guardians2.mp4";
        String time="5";
        int result= video.cut(url);
    }
}