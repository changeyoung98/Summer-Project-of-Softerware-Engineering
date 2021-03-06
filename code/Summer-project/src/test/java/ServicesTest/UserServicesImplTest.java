package ServicesTest;

import Services.Impl.UserServicesImpl;
import org.junit.Assert;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath*:applicationContext.xml"})
public class UserServicesImplTest {

  @Autowired
  private UserServicesImpl user;

  @org.junit.Test
  public void checkUser() {
    /* right test */
    String username = "crystal";
    String password = "1234567";
    int result = user.checkUser(username, password);
    Assert.assertTrue(result == 1);

    /* execption test */
    String username1 = "wrong";
    String password1 = "wrong";
    int result1 = user.checkUser(username1, password1);
    Assert.assertTrue(result1 == 0);
  }

  @org.junit.Test
  public void addUser() {
    String username = "crystal";
    String password = "1234567";
    String email = "8888888@google.com";
    String phone = "8888888";
    Assert.assertTrue(user.addUser(username, password, email, phone) == 2);

    /* execption */
    String username1 = "Joe";
    String password1 = "a good name";
    Assert.assertTrue(user.addUser(username1, password1, email, phone) == 1);
  }
}
