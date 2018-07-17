package Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import Util.Image;

@Controller
@RequestMapping("/image")
public class ImageWeb {

  @RequestMapping(value="/download")
  @ResponseBody
  public int download(@RequestParam String url){
   Image image = new Image();
    return image.download(url);
  }
}
