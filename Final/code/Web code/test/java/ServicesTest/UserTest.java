package ServicesTest;

import Services.UserService;
import org.junit.Test;
import org.junit.Assert;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath*:applicationContext.xml"})
public class UserTest {

  @Autowired
  private UserService userService;

  @Test
  public void checkUser() {
    String username = "crystal";
    String password = "1234567";
    int result = userService.checkUser(username, password);
    Assert.assertTrue(result == 1);

    /* execption test */
    String username1 = "bad";
    String password1 = "wrong";
    int result1 = userService.checkUser(username1, password1);
    Assert.assertTrue(result1 == 0);
  }

  @Test
  public void addUser() {
    String username = "crystal";
    String password = "1234567";
    String email = "6666666@google.com";
    String phone = "8888888";
    Assert.assertTrue(userService.addUser(username, password, email, phone) == 2);

    /* execption */
    String username1 = "Amber";
    String password1 = "a good name";
    Assert.assertTrue(userService.addUser(username1, password1, email, phone) == 1);
  }
}
