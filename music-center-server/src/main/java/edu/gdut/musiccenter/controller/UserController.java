package edu.gdut.musiccenter.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.gdut.musiccenter.entity.CustomResponse;
import edu.gdut.musiccenter.entity.UserInfo;
import edu.gdut.musiccenter.entity.UserLogin;
import edu.gdut.musiccenter.service.FileService;
import edu.gdut.musiccenter.service.UserService;
import edu.gdut.musiccenter.utils.RedisUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * @description: UserController
 * @date: 2020/11/9 11:11
 * @author: Stephen
 */
@RestController
@Slf4j
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    FileService fileService;

    @Autowired
    RedisUtil redisUtil;

    @Autowired
    ObjectMapper objectMapper;


    @PostMapping("/register")
    public CustomResponse createUser(@RequestBody UserLogin userLogin) {
        return userService.createUser(userLogin);
    }

    @PostMapping("/login")
    public CustomResponse userLogin(@RequestBody UserLogin userLogin) {
        return userService.userLogin(userLogin);
    }

    @PostMapping("/logout")
    public CustomResponse logout(@RequestBody String token) {
        if (redisUtil.expire(token, 0)){
            return new CustomResponse(200,null);
        } else {
            return new CustomResponse(500, null);
        }
    }

    @PostMapping("/userInfo")
    public CustomResponse getUserInfo(@RequestBody String token) {
        if (token == null) {
            return new CustomResponse(400, "token不可为空");
        } else {
            Long userId = null;
            Object tokenCheck = redisUtil.get(token);
            try {
                if (tokenCheck==null) {
                    return new CustomResponse(401, "用户已过期，请重新登录");
                } else {
                    userId = Long.parseLong(tokenCheck.toString());
                    return userService.getUserInfo(userId);
                }
            } catch (Exception e) {
                log.error(e.getMessage());
                return new CustomResponse(500, "系统繁忙，请稍后重试");
            }
        }
    }

    @PostMapping("/updateUserInfo")
    public CustomResponse updateUserInfo(UserInfo userInfo,@RequestParam String token) {
        if (token == null || token.equals("")) {
            return new CustomResponse(400, "token不可为空");
        } else {
            Long userId = null;
            Object tokenCheck = redisUtil.get(token);
            try {
                if (tokenCheck==null) {
                    return new CustomResponse(401, "用户已过期，请重新登录");
                } else {
                    userId = Long.parseLong(tokenCheck.toString());
                    userInfo.setUserId(userId);
                    return userService.updateUserInfo(userInfo);
                }
            } catch (Exception e) {
                log.error(e.getMessage());
                return new CustomResponse(500, "系统繁忙，请稍后重试");
            }
        }
    }

    @PostMapping("/uploadImage")
    public CustomResponse uploadImage(@RequestParam MultipartFile file, @RequestParam String token) {
        if (token == null || token.equals("")) {
            return new CustomResponse(400, "token不可为空");
        } else {
            Long userId = null;
            Object tokenCheck = redisUtil.get(token);
            try {
                if (tokenCheck==null) {
                    return new CustomResponse(401, "用户已过期，请重新登录");
                } else {
                    userId = Long.parseLong(tokenCheck.toString());
                    return fileService.uploadImage(file, userId);
                }
            } catch (Exception e) {
                log.error(e.getMessage());
                return new CustomResponse(500, "系统繁忙，请稍后重试");
            }
        }
    }

    @PostMapping("/addFavouriteSong")
    public CustomResponse addFavouriteSong(@RequestParam String songs, @RequestParam String token) {
        if (token == null || token.equals("")) {
            return new CustomResponse(400, "token不可为空");
        } else {
            Long userId = null;
            Object tokenCheck = redisUtil.get(token);
            try {
                if (tokenCheck==null) {
                    return new CustomResponse(401, "用户已过期，请重新登录");
                } else {
                    userId = Long.parseLong(tokenCheck.toString());
                    return userService.addFavouriteSong(songs, userId);
                }
            } catch (Exception e) {
                log.error(e.getMessage());
                return new CustomResponse(500, "系统繁忙，请稍后重试");
            }
        }
    }

    @PostMapping("/addRecentPlaySongs")
    public CustomResponse addRecentPlaySongs(@RequestParam String recentPlaySongs, @RequestParam String token) {
        if (token == null || token.equals("")) {
            return new CustomResponse(400, "token不可为空");
        } else {
            Long userId = null;
            Object tokenCheck = redisUtil.get(token);
            try {
                if (tokenCheck==null) {
                    return new CustomResponse(401, "用户已过期，请重新登录");
                } else {
                    userId = Long.parseLong(tokenCheck.toString());
                    return userService.addRecentPlaySongs(recentPlaySongs, userId);
                }
            } catch (Exception e) {
                log.error(e.getMessage());
                return new CustomResponse(500, "系统繁忙，请稍后重试");
            }
        }
    }

    @PostMapping("/getRecentPlaySongs")
    public CustomResponse getRecentPlaySongs(@RequestBody String token) {
        if (token == null || token.equals("")) {
            return new CustomResponse(400, "token不可为空");
        } else {
            Long userId = null;
            Object tokenCheck = redisUtil.get(token);
            try {
                if (tokenCheck==null) {
                    return new CustomResponse(401, "用户已过期，请重新登录");
                } else {
                    userId = Long.parseLong(tokenCheck.toString());
                    return userService.getRecentPlaySongs(userId);
                }
            } catch (Exception e) {
                log.error(e.getMessage());
                return new CustomResponse(500, "系统繁忙，请稍后重试");
            }
        }
    }

    @PostMapping("/getFavouriteSong")
    public CustomResponse getFavouriteSong(@RequestBody String token) {
        if (token == null || token.equals("")) {
            return new CustomResponse(400, "token不可为空");
        } else {
            Long userId = null;
            Object tokenCheck = redisUtil.get(token);
            try {
                if (tokenCheck==null) {
                    return new CustomResponse(401, "用户已过期，请重新登录");
                } else {
                    userId = Long.parseLong(tokenCheck.toString());
                    return userService.getFavouriteSong(userId);
                }
            } catch (Exception e) {
                log.error(e.getMessage());
                return new CustomResponse(500, "系统繁忙，请稍后重试");
            }
        }
    }

    @PostMapping("/userBack")
    public CustomResponse userBack(@RequestBody String token) {
        if (redisUtil.persist(token)) {
            return new CustomResponse(200, null);
        } else {
            return new CustomResponse(500, null);
        }
    }

    @PostMapping("/userQuit")
    public CustomResponse userQuit(@RequestBody String token) {
        if (redisUtil.expire(token, 300)){
            return new CustomResponse(200,null);
        } else {
            return new CustomResponse(500, null);
        }
    }



    @PostMapping("/checkAuthc")
    public CustomResponse checkAuthc(@RequestBody String token) {
        if (token == null || token.equals("")) {
            return new CustomResponse(400, "token不可为空");
        } else {
            try {
                if (redisUtil.get(token)==null) {
                    return new CustomResponse(401, "用户已过期，请重新登录");
                } else {
                    return new CustomResponse(200, null);
                }
            } catch (Exception e) {
                log.error(e.getMessage());
                return new CustomResponse(500, "系统繁忙，请稍后重试");
            }
        }
    }
}
