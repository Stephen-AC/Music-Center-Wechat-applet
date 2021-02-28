package edu.gdut.musiccenter.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.io.Serializable;


@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserLogin implements Serializable {

  @JsonIgnore
  private long userId;
  private long userPhone;
  private String userPassword;
  private java.sql.Timestamp ut;


  public long getUserId() {
    return userId;
  }

  public void setUserId(long userId) {
    this.userId = userId;
  }


  public long getUserPhone() {
    return userPhone;
  }

  public void setUserPhone(long userPhone) {
    this.userPhone = userPhone;
  }


  public String getUserPassword() {
    return userPassword;
  }

  public void setUserPassword(String userPassword) {
    this.userPassword = userPassword;
  }


  public java.sql.Timestamp getUt() {
    return ut;
  }

  public void setUt(java.sql.Timestamp ut) {
    this.ut = ut;
  }

}
