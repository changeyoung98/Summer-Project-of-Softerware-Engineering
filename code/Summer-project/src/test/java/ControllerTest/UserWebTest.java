package ControllerTest;

import Controller.UserWeb;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath*:spring-mvc.xml"})
public class UserWebTest {
    @Autowired
    private UserWeb userweb;
    @Test
    public void checkUser() {
        String username = "crystal";
        String password = "1234567";
        int result = userweb.checkUser(username, password);
        Assert.assertTrue(result == 1);

        /* execption test */
        String username1 = "bad";
        String password1 = "bad";
        int result1 = userweb.checkUser(username1, password1);
        Assert.assertTrue(result1 == 0);
    }

    @Test
    public void addUser() {
        String username = "crystal";
        String password = "1234567";
        String email = "6666666@google.com";
        String phone = "77777777";
        Assert.assertTrue(userweb.addUser(username, password, email, phone) == 2);

        /* execption */
        String username1 = "Mike";
        String password1 = "a good name";
        Assert.assertTrue(userweb.addUser(username1, password1, email, phone) == 1);
    }
}