package Services;

public interface UserService {
    public int checkUser(String username,String password);
    public int addUser(String username,String password,String email,String phone);
}
