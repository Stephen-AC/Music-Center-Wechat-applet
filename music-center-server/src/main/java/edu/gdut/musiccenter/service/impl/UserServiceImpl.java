package edu.gdut.musiccenter.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.gdut.musiccenter.entity.CustomResponse;
import edu.gdut.musiccenter.entity.UserInfo;
import edu.gdut.musiccenter.entity.UserLogin;
import edu.gdut.musiccenter.mapper.UserInfoMapper;
import edu.gdut.musiccenter.mapper.UserLoginMapper;
import edu.gdut.musiccenter.service.UserService;
import edu.gdut.musiccenter.utils.RedisUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.DigestUtils;

/**
 * @description: UserServiceImpl
 * @date: 2020/11/9 10:54
 * @author: Stephen
 */

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    @Autowired
    private UserLoginMapper userLoginMapper;

    @Autowired
    private UserInfoMapper userInfoMapper;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    private RedisUtil redisUtil;


    @Override
    @Transactional
    public CustomResponse createUser(UserLogin userLogin) {
        CustomResponse customResponse = new CustomResponse();
        if (userLoginMapper.findUserLoginByPhone(userLogin.getUserPhone()).size() != 0) {
            return new CustomResponse(500, "请勿重复注册");
        }
        try {
            userLoginMapper.addUserLogin(userLogin);
            userInfoMapper.addUserInfo(userLogin.getUserId());
            customResponse.setCode(200);
            customResponse.setData("Success");
            return new CustomResponse(200, "成功");
        } catch (Exception e) {
            log.error(e.getMessage());
            return new CustomResponse(500, "系统繁忙，请重试");
        }
    }

    @Override
    @Transactional
    public CustomResponse userLogin(UserLogin userLogin) {
        try {
            if (userLoginMapper.findUserLoginByPhone(userLogin.getUserPhone()).size() != 0) {
                String userMD5Pwd = DigestUtils.md5DigestAsHex(userLogin.getUserPassword().getBytes());
                UserLogin userDB = userLoginMapper.findUserMD5PasswordByPhone(userLogin.getUserPhone());
                if (userDB.getUserPassword().equals(userMD5Pwd)) {
                    String token = DigestUtils.md5DigestAsHex(String.valueOf(userDB.getUserId()).getBytes());
                    redisUtil.set(token, userDB.getUserId());
                    return new CustomResponse(200, token);
                }
            }
            return new CustomResponse(500, "用户名或密码错误");

        } catch (Exception e) {
            log.error(e.getMessage());
            return new CustomResponse(500, "系统繁忙，请稍后尝试");
        }
    }

    @Override
    @Transactional
    public CustomResponse getUserInfo(Long userId) {
        UserInfo userInfo = userInfoMapper.getUserInfo(userId);
        if (userInfo == null) {
            return new CustomResponse(500, "无该用户");
        } else {
            try {
                return new CustomResponse(200, userInfo);
            } catch (Exception e) {
                log.error(e.getMessage());
                return new CustomResponse(500, "Json转化错误");
            }
        }
    }

    @Override
    @Transactional
    public CustomResponse updateUserInfo(UserInfo userInfo) {
        try {
            int i1 = 0;
            try {
                i1 = userLoginMapper.updateUserPhoneById(userInfo.getUserPhone(), userInfo.getUserId());
            } catch (Exception e) {
                log.error(e.getMessage());
                return new CustomResponse(500, "手机号重复，请重新输入");
            }
            int i2 = userInfoMapper.updateUserInfoById(userInfo);
            if (i1 > 0 && i2 > 0) {
                return new CustomResponse(200, "成功");
            } else {
                return new CustomResponse(500, "系统繁忙请重试");
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            return new CustomResponse(500, "系统繁忙请重试");
        }
    }

    @Override
    @Transactional
    public CustomResponse addFavouriteSong(String songs, Long userId) {
        int i = userInfoMapper.updateUserFavouriteById(songs, userId);
        if (i > 0) {
            return new CustomResponse(200,"成功");
        } else {
            return new CustomResponse(500, "系统繁忙,请稍后重试");
        }
    }

    @Override
    @Transactional
    public CustomResponse addRecentPlaySongs(String recentPlaySongs, Long userId) {
        int i = userInfoMapper.updateRecentPlaySongsById(recentPlaySongs, userId);
        if (i > 0) {
            return new CustomResponse(200,"成功");
        } else {
            return new CustomResponse(500, "系统繁忙,请稍后重试");
        }
    }

    @Override
    @Transactional
    public CustomResponse getRecentPlaySongs(Long userId) {
        String fav = userInfoMapper.getRecentPlaySongsById(userId);
        if (fav != null && !fav.equals("")) {
            return new CustomResponse(200,fav);
        } else {
            return new CustomResponse(500, "系统繁忙,请稍后重试");
        }
    }

    @Override
    @Transactional
    public CustomResponse getFavouriteSong(Long userId) {
        String rec = userInfoMapper.getFavouriteSongById(userId);
        if (rec != null && !rec.equals("")) {
            return new CustomResponse(200,rec);
        } else {
            return new CustomResponse(500, "系统繁忙,请稍后重试");
        }
    }
}
