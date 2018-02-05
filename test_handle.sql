/*
Navicat MySQL Data Transfer

Source Server         : hr
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2018-01-24 09:16:17
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for test_handle
-- ----------------------------
DROP TABLE IF EXISTS `test_handle`;
CREATE TABLE `test_handle` (
  `handle_id` int(11) NOT NULL AUTO_INCREMENT,
  `handle_check_uid` varchar(255) NOT NULL COMMENT '审核人id',
  `handle_check_activityid` int(11) NOT NULL COMMENT '活动的id',
  `handle_one_or_two` int(11) NOT NULL COMMENT '是初审还是终审',
  PRIMARY KEY (`handle_id`),
  KEY `handle_check_uid` (`handle_check_uid`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of test_handle
-- ----------------------------

