package edu.gdut.musiccenter.mapper;

import edu.gdut.musiccenter.entity.UserLogin;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @description: UserLoginMapper
 * @date: 2020/11/9 10:17
 * @author: Stephen
 */

@Mapper
@Repository
public interface UserLoginMapper {

    @Insert("insert into user_login(user_phone, user_password) value (#{userPhone}, #{userPassword})")
    @Options(useGeneratedKeys = true, keyProperty = "userId", keyColumn = "user_id")
    public int addUserLogin(UserLogin userLogin);

    @Select("select * from user_login where user_phone = #{phone}")
    public List<UserLogin> findUserLoginByPhone(Long phone);

    @Select("select user_id,md5(user_password) user_password from user_login where user_phone = #{phone}")
    public UserLogin findUserMD5PasswordByPhone(Long phone);

    @Update("update user_login set user_phone = #{phone} where user_id = #{userId}")
    public int updateUserPhoneById(Long phone, Long userId);

}
