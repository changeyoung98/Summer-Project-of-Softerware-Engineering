package Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import Util.ReID;

@Controller
@RequestMapping("/find")
public class Find {

  @RequestMapping(value="/history")
  @ResponseBody
  public String find_history(){
    ReID test = new ReID();
    return test.find_person("none");
  }

  @RequestMapping(value="/instance")
  @ResponseBody
  public String find_instance(){
    ReID test=new ReID();
    return test.find_instance("none");
  }
}
