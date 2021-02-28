package edu.gdut.musiccenter.service.impl;

import edu.gdut.musiccenter.entity.CustomResponse;
import edu.gdut.musiccenter.mapper.UserInfoMapper;
import edu.gdut.musiccenter.service.FileService;
import edu.gdut.musiccenter.utils.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

/**
 * @description: FileServiceImpli
 * @date: 2020/11/16 15:15
 * @author: Stephen
 */
@Service
public class FileServiceImpl implements FileService {

    public static final String AVATAR_PATH = "images/avatar/";

    @Autowired
    FileUtil fileUtil;

    @Autowired
    UserInfoMapper userInfoMapper;

    @Override
    @Transactional
    public CustomResponse uploadImage(MultipartFile multipartFile, Long userId) {
        String savePath = fileUtil.uploadFile(multipartFile, AVATAR_PATH).replace('\\', '/');
        int i = userInfoMapper.updateUserAvatarById(savePath, userId);
        if (i == 1 ){
            return new CustomResponse(200, savePath);
        } else {
            return new CustomResponse(500, "系统繁忙，请重试");
        }
    }
}
