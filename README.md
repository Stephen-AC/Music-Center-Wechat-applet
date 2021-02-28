# 网络音乐播放器

> ### 基本介绍

本网络音乐播放小程序，实现了播放、搜索、推荐、收藏音乐和用户管理等功能，music-center-server文件为服务器源代码，其他均为小程序源代码

> ### 使用技术

* 小程序
  1. Vant Weapp小程序UI组件库——提高界面美观
* 服务器
  1. 基于Springboot的SSM框架
  2. Druid——便于监控数据库变化
  3. Redis——用户Token的存储
  4. Self4j+Logback——日志系统

> ### 运行环境

本项目提供两种运行环境，一个是基于本地服务器运行的环境，另外一个是基于远程服务器运行的环境，他们分别在localhost和remote分支上

* 基于本地服务器运行的环境：
  1. [Http://localhost:8080/](Http://localhost:8080/) ——用户管理服务器
  2. [Http://47.110.241.150:3000/](Http://47.110.241.150:3000/) ——网易云Api环境
  3. Mysql5.7
  4. Jdk8

* 基于远程服务器运行的环境
  1. [Http://47.110.241.150:8080/music-center](Http://47.110.241.150:8080/music-center) ——用户管理服务器
  2. [Http://47.110.241.150:3000/](Http://47.110.241.150:3000/) ——网易云Api环境
  3. Mysql5.7
  4. Jdk8
  5. Redis5

> ### 配置小程序运行环境步骤

开启基于本地服务器运行的环境

1. 修改\music-center-server\src\main\resources路径下application.yml文件中关于数据库配置的url、username、password的值

2. 执行SQL文件，创建数据库

3. 将War包部署到Tomcat

4. 运行小程序

开启基于远程服务器运行的环境：

1. 无需配置小程序运行环境，运行小程序即可

> ### 小程序使用说明

用户未登录状态下可以使用音乐搜索，播放，查看歌单等基本音乐播放功能，登录后才可以进行歌曲收藏，用户信息修改，查看最近播放十首歌等基于用户的功能。

> ### 本项目亮点

本项目具备很多亮点，下面将从小程序方面与服务器方面来讲述。

小程序端：

1. 手写样式+Vant Weapp组件优化外观，界面简洁大方并且美观。

2. 充分利用小程序数据缓存的功能，不仅降低了较少了IO减低服务器压力，还增加了用Token记住用户身份与信息与最近播放的功能。

3. 利用Wxs技术实现在WXML中调用函数格式化数据的功能

服务器端：

1. 服务器已部署到阿里云服务器中，本项目可以真正实现部署上线，不依赖于本地环境

2. 利用Redis来存储用户登录认证后的Token，并为之设置了过期时间，既减低了服务器的压力，又提高了服务器的安全性

3. 日志系统完备，Druid技术提供页面UI来查询SQL语句执行情况，完整的Logback配置五个等级日志分别输出到五个文件中

4. 自定义CustomResponse类来统一小程序端request的返回结果，便于操作。

5. 使用大量的try catch语句来减少报错，提高用户友好度

6. 数据库查询密码时使用MD5加密，提高密码安全性

7. Service中的每个事务具有原子性

8. 数据库设计考虑周全许多字段并且每个表有都有一个字段ut（记录更新时间）、用户信息表还有字段create_time（字段创建时间）

9. 数据库并非使用了Root账户，而是使用了经过授权的admin账户。

> ### 运行截图

![image-20210228105359258](https://i.loli.net/2021/02/28/wCGnycAplIbr2RK.png)

![image-20210228105411543](https://i.loli.net/2021/02/28/OcF74TVEulWYHGp.png)

![image-20210228105421474](https://i.loli.net/2021/02/28/94VuUrCGlyateoD.png)

![image-20210228105435101](https://i.loli.net/2021/02/28/klJDIb8sxEd7jQe.png)

![image-20210228105455419](https://i.loli.net/2021/02/28/S42NCPerBYHwZcn.png)

![image-20210228105505110](https://i.loli.net/2021/02/28/GUfRAV7HIKZ6NYk.png)