/*
 Navicat Premium Data Transfer

 Source Server         : 47.110.241.150
 Source Server Type    : MySQL
 Source Server Version : 50731
 Source Host           : 47.110.241.150:3306
 Source Schema         : music_center

 Target Server Type    : MySQL
 Target Server Version : 50731
 File Encoding         : 65001

 Date: 21/11/2020 18:46:19
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info`  (
  `user_id` int(4) UNSIGNED NOT NULL,
  `user_sex` enum('男','女') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '女',
  `user_alias` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `user_signature` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '这个人很懒，什么也没留下',
  `user_avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `user_favourite` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `user_recent_play` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `ut` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`user_id`) USING BTREE,
  CONSTRAINT `user_info_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_login` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES (1015, '女', 'KlyTom', '这个人很懒，什么也没留下', 'images/avatar/2020/11/21/fd91dd08-a3cb-4fa5-964b-dcbee549e817.jpg', '[1492901592,561452914,1488737309,1496093993]', '[561452914,1488737309,1496093993,1490643011,1493125710,1492901592,1496337208,1495827373,1495077936,1496075992]', '2020-11-14 15:57:22', '2020-11-21 18:43:10');
INSERT INTO `user_info` VALUES (1017, '女', 'niubi', '这个人很懒，什么也没留下', 'images/avatar/2020/11/21/7934cb61-fed8-4552-8997-2772ed481376.jpg', '[]', '[]', '2020-11-19 23:14:42', '2020-11-21 18:42:17');
INSERT INTO `user_info` VALUES (1018, '男', '丁老师辛苦了', '我爱网易云！我爱小程序', 'images/avatar/2020/11/21/2f4336fd-85c7-4776-9a38-da13e6275ad4.jpg', '[1493125710,1492901592,333750]', '[]', '2020-11-21 16:03:53', '2020-11-21 18:42:35');
INSERT INTO `user_info` VALUES (1019, '女', '丁老师好', '这个人很懒，什么也没留下！', 'images/avatar/2020/11/21/c92423d0-8827-43c3-b940-af5db02bf714.jpg', '[1490643011,1496075992]', '[1490643011,1493125710,561452914,null,null,null,null,null,null,null]', '2020-11-21 18:27:25', '2020-11-21 18:40:30');

-- ----------------------------
-- Table structure for user_login
-- ----------------------------
DROP TABLE IF EXISTS `user_login`;
CREATE TABLE `user_login`  (
  `user_id` int(4) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `user_phone` char(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_password` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ut` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE INDEX `user_id`(`user_phone`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1020 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_login
-- ----------------------------
INSERT INTO `user_login` VALUES (1015, '13316667441', '123456', '2020-11-19 23:09:59');
INSERT INTO `user_login` VALUES (1017, '13316667443', '123456', '2020-11-19 23:14:42');
INSERT INTO `user_login` VALUES (1018, '13316667442', '123456', '2020-11-21 16:03:53');
INSERT INTO `user_login` VALUES (1019, '13316667444', '123456', '2020-11-21 18:27:25');

SET FOREIGN_KEY_CHECKS = 1;
