package Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import Util.VideoCut;

import java.util.List;

@Controller
@RequestMapping("/videos")
public class VideoWeb {

  @RequestMapping(value="/cut")
  @ResponseBody
  public int cut(@RequestParam String url,@RequestParam String time){
    VideoCut cut = new VideoCut();
    return cut.cut(url,time);
  }

  @RequestMapping(value="/Icut")
  @ResponseBody
  public int icut(@RequestParam String url){
    VideoCut cut = new VideoCut();
    return cut.InstanceCut(url);
  }

  @RequestMapping(value="/con_cut")
  @ResponseBody
  public int con_cut(@RequestParam String camera){
    VideoCut cut = new VideoCut();
    return cut.con_cut(camera);
  }
}
