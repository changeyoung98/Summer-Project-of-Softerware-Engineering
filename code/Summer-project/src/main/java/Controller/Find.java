package Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import Util.test;

@Controller
@RequestMapping("/find")
public class Find {

  @RequestMapping(value="/user")
  @ResponseBody
  public int find(){
    test test = new test();
    return test.find_person();
  }
}
