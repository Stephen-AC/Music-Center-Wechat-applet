package edu.gdut.musiccenter.service;

import edu.gdut.musiccenter.entity.CustomResponse;
import edu.gdut.musiccenter.entity.UserInfo;
import edu.gdut.musiccenter.entity.UserLogin;

/**
 * @description: UserLoginService
 * @date: 2020/11/9 10:52
 * @author: Stephen
 */

public interface UserService {

    public CustomResponse createUser(UserLogin userLogin);

    public CustomResponse userLogin(UserLogin userLogin);

    public CustomResponse getUserInfo(Long userId);

    public CustomResponse updateUserInfo(UserInfo userInfo);

    public CustomResponse addFavouriteSong(String songs, Long userId);

    public CustomResponse addRecentPlaySongs(String recentPlaySongs, Long userId);

    public CustomResponse getRecentPlaySongs(Long userId);

    public CustomResponse getFavouriteSong(Long userId);
}
