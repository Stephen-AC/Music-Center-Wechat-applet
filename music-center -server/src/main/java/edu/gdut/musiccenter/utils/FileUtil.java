package edu.gdut.musiccenter.utils;

import org.springframework.boot.system.ApplicationHome;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

/**
 * @description: FileUtil
 * @date: 2020/11/16 15:21
 * @author: Stephen
 */
@Component
public class FileUtil {

    public String uploadFile(MultipartFile multipartFile,String path) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd/");
        //构建文件上传所要保存的"文件夹路径"--这里是相对路径，保存到项目根路径的文件夹下
        String realPath = path;
        ApplicationHome applicationHome = new ApplicationHome(getClass());
        File source = applicationHome.getSource();
        System.out.println("applicationHome"+ source.getAbsolutePath());
        File webApp = source.getParentFile().getParentFile();
        System.out.println("webapp" + webApp.getAbsolutePath());
        System.out.println(realPath);
        String format = sdf.format(new Date());
        //存放上传文件的文件夹
        File file = new File(new ApplicationHome(getClass()).getSource().getAbsolutePath()+File.separator+"static"+File.separator+realPath+format);
        System.out.println(file);
        if(!file.isDirectory()){
            //递归生成文件夹
            file.mkdirs();
        }
        //获取原始的名字  original:最初的，起始的  方法是得到原来的文件名在客户机的文件系统名称
        String oldName = multipartFile.getOriginalFilename();
        System.out.println(oldName);
        String newName = UUID.randomUUID().toString() + oldName.substring(oldName.lastIndexOf("."),oldName.length());
        System.out.println(newName);
        try {
            //构建真实的文件路径
            File newFile = new File(file.getAbsolutePath() + File.separator + newName);
            //转存文件到指定路径，如果文件名重复的话，将会覆盖掉之前的文件,这里是把文件上传到 “绝对路径”
            multipartFile.transferTo(newFile);
            int index = file.getAbsolutePath().lastIndexOf(File.separator);
            System.out.println(newFile);
            return path+file.getAbsolutePath().substring(index-7)+File.separator+newName;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "fail";
    }
}
