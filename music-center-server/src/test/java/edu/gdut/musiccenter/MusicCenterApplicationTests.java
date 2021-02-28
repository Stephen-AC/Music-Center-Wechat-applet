package edu.gdut.musiccenter;

import edu.gdut.musiccenter.mapper.UserInfoMapper;
import edu.gdut.musiccenter.mapper.UserLoginMapper;
import edu.gdut.musiccenter.utils.RedisUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class MusicCenterApplicationTests {

    @Autowired
    RedisUtil redisUtil;
    
    @Autowired
    UserInfoMapper userInfoMapper;

    @Autowired
    UserLoginMapper userLoginMapper;


    @Test
    void contextLoads() {
        System.out.println(redisUtil.get("hello"));
    }

}
