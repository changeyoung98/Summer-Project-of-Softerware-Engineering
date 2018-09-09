package Services.Impl;

import Dao.User;
import Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServicesImpl implements UserService {

    @Autowired
    private User userDao;

    public int checkUser(String username,String password){
        return userDao.checkUser(username,password);
    }

    public int addUser(String username,String password,String email,String phone){
      return userDao.addUser(username,password,email,phone);
    }


}
