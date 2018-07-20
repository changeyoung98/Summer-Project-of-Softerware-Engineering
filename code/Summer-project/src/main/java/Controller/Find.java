package Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import Util.test;

@Controller
@RequestMapping("/find")
public class Find {

  @RequestMapping(value="/history")
  @ResponseBody
  public String find_history(){
    test test = new test();
    return test.find_person("none");
  }

  @RequestMapping(value="/instance")
  @ResponseBody
  public String find_instance(){
    test test=new test();
    return test.find_instance("none");
  }
}
