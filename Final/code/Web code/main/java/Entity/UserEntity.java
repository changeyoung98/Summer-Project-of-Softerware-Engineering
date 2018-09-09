package Entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "user", schema = "summer", catalog = "")
public class UserEntity {
  private int id;
  private String username;
  private String password;
  private String email;
  private String phone;

  @Id
  @Column(name = "ID")
  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  @Basic
  @Column(name = "username")
  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  @Basic
  @Column(name = "password")
  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  @Basic
  @Column(name = "email")
  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  @Basic
  @Column(name = "phone")
  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    UserEntity that = (UserEntity) o;
    return id == that.id &&
      Objects.equals(username, that.username) &&
      Objects.equals(password, that.password) &&
      Objects.equals(email, that.email) &&
      Objects.equals(phone, that.phone);
  }

  @Override
  public int hashCode() {

    return Objects.hash(id, username, password, email, phone);
  }
}
