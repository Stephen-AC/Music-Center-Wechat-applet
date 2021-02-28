package edu.gdut.musiccenter.mapper;

import edu.gdut.musiccenter.entity.UserInfo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

/**
 * @description: UserInfoMapper
 * @date: 2020/11/9 10:58
 * @author: Stephen
 */
@Mapper
@Repository
public interface UserInfoMapper {

    @Insert("insert into user_info(user_id) value (#{userId})")
    public int addUserInfo(Long userId);

    @Select("select user_alias,user_avatar,user_sex,user_signature,user_favourite,user_recent_play from user_info where user_id = #{userId}")
    public UserInfo getUserInfo(Long userId);

    @Update("update user_info set user_alias = #{userAlias}, user_sex = #{userSex}, user_signature = #{userSignature}, user_favourite = #{userFavourite}, user_recent_play = #{userRecentPlay} where user_id = #{userId}")
    public int updateUserInfoById(UserInfo userInfo);

    @Update("update user_info set user_avatar = #{imagePath} where user_id = #{userId}")
    public int updateUserAvatarById(String imagePath, Long userId);

    @Update("update user_info set user_favourite = #{songs} where user_id = #{userId};")
    public int updateUserFavouriteById(String songs, Long  userId);

    @Update("update user_info set user_recent_play = #{recentPlaySongs} where user_id = #{userId}")
    int updateRecentPlaySongsById(String recentPlaySongs, Long userId);

    @Select("select user_recent_play from user_info where user_id = #{userId}")
    String getRecentPlaySongsById(Long userId);

    @Select("select user_favourite from user_info where user_id = #{userId}")
    String getFavouriteSongById(Long userId);
}
