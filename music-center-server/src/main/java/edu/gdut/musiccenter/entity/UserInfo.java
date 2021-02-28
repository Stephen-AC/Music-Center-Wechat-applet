package edu.gdut.musiccenter.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.io.Serializable;


@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserInfo implements Serializable {

  @JsonIgnore
  private long userId;
  @JsonIgnore
  private long userPhone;
  private String userSex;
  private String userAlias;
  private String userSignature;
  private String userAvatar;
  private String userFavourite;
  private String userRecentPlay;
  private java.sql.Timestamp createTime;
  private java.sql.Timestamp ut;

  public UserInfo() {
    this.userAvatar = "";
    this.userFavourite = "[]";
    this.userRecentPlay = "[]";
  }

  public long getUserPhone() {
    return userPhone;
  }

  public void setUserPhone(long userPhone) {
    this.userPhone = userPhone;
  }

  public long getUserId() {
    return userId;
  }

  public void setUserId(long userId) {
    this.userId = userId;
  }


  public String getUserSex() {
    return userSex;
  }

  public void setUserSex(String userSex) {
    this.userSex = userSex;
  }


  public String getUserAlias() {
    return userAlias;
  }

  public void setUserAlias(String userAlias) {
    this.userAlias = userAlias;
  }


  public String getUserSignature() {
    return userSignature;
  }

  public void setUserSignature(String userSignature) {
    this.userSignature = userSignature;
  }


  public String getUserAvatar() {
    return userAvatar;
  }

  public void setUserAvatar(String userAvatar) {
    this.userAvatar = userAvatar;
  }

  public String getUserFavourite() {
    return userFavourite;
  }

  public void setUserFavourite(String userFavourite) {
    this.userFavourite = userFavourite;
  }

  public String getUserRecentPlay() {
    return userRecentPlay;
  }

  public void setUserRecentPlay(String userRecentPlay) {
    this.userRecentPlay = userRecentPlay;
  }

  public java.sql.Timestamp getCreateTime() {
    return createTime;
  }

  public void setCreateTime(java.sql.Timestamp createTime) {
    this.createTime = createTime;
  }


  public java.sql.Timestamp getUt() {
    return ut;
  }

  public void setUt(java.sql.Timestamp ut) {
    this.ut = ut;
  }

}
