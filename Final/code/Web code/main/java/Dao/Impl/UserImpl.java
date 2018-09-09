package Dao.Impl;

import Dao.User;
import Entity.HibernateUtil;
import Entity.UserEntity;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.classic.Session;

import java.util.List;

public class UserImpl implements User {

  public int checkUser(String username, String password) {
    Session session = null;
    List<UserEntity> list = null;
    MD5 md5 = new MD5();
    String passwordHash = md5.GetMD5Code(username+password);
    int isValid = 0;
    try {
      Configuration conf = new Configuration().configure();
      SessionFactory sf = conf.buildSessionFactory();
      session = sf.openSession();
      String hql = "from UserEntity user where username=:name and password=:password";
      Query query;
      query = session.createQuery(hql);
      query.setParameter("name", username);
      query.setParameter("password", passwordHash);
      list = query.list();
      if (list.size() > 0)
        isValid = 1;
      session.close();
      return isValid;
    } catch (HibernateException e) {
      e.printStackTrace();
      return 0;
    }
  }

  public int addUser(String username,String password ,String email,String phone){
    try{
      if(checkUser(username,password)==1){
        return 2;          /* duplicate */
      }
      else {
        insertUser(username, password, email, phone);
        return 1;
      }
    }catch (HibernateException e) {
      e.printStackTrace();
      return 0;
    }
  }


  private void insertUser(String username,String password ,String email,String phone) {
    Session session = HibernateUtil.getSessionFactory().getCurrentSession();
    Transaction tx = session.beginTransaction();
    UserEntity user = new UserEntity();

    MD5 md5 = new MD5();
    String passwordHash = md5.GetMD5Code(username + password);
    user.setUsername(username);
    user.setEmail(email);
    user.setPhone(phone);
    user.setPassword(passwordHash);
    session.save(user);
    tx.commit();
  }
}

