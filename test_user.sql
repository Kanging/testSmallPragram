/*
Navicat MySQL Data Transfer

Source Server         : hr
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2018-01-24 09:16:42
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for test_user
-- ----------------------------
DROP TABLE IF EXISTS `test_user`;
CREATE TABLE `test_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `user_englishname` varchar(255) DEFAULT NULL,
  `user_openid` varchar(255) DEFAULT NULL COMMENT '微信的openid',
  `user_num` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '工号',
  `user_pid` int(11) NOT NULL COMMENT 'posision id,职位id',
  `user_powerid` int(11) NOT NULL COMMENT '权限id',
  `user_departmentid` int(11) NOT NULL COMMENT 'department部门id',
  `user_ischeck` int(11) NOT NULL DEFAULT '0' COMMENT '有无权限审核别人的活动',
  PRIMARY KEY (`user_id`),
  KEY `1` (`user_powerid`),
  KEY `2` (`user_pid`),
  KEY `3` (`user_departmentid`),
  KEY `user_name` (`user_name`),
  CONSTRAINT `1` FOREIGN KEY (`user_powerid`) REFERENCES `test_power` (`power_id`),
  CONSTRAINT `2` FOREIGN KEY (`user_pid`) REFERENCES `test_position` (`position_id`),
  CONSTRAINT `3` FOREIGN KEY (`user_departmentid`) REFERENCES `test_department` (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of test_user
-- ----------------------------

