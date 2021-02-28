package edu.gdut.musiccenter.service;

import edu.gdut.musiccenter.entity.CustomResponse;
import org.springframework.web.multipart.MultipartFile;

/**
 * @description: FileService
 * @date: 2020/11/16 15:14
 * @author: Stephen
 */
public interface FileService {

    public CustomResponse uploadImage(MultipartFile file, Long userId);
}
