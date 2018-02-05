/*
Navicat MySQL Data Transfer

Source Server         : hr
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2018-01-24 09:16:34
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for test_power
-- ----------------------------
DROP TABLE IF EXISTS `test_power`;
CREATE TABLE `test_power` (
  `power_id` int(11) NOT NULL AUTO_INCREMENT,
  `power_name` varchar(255) NOT NULL COMMENT '权限名称',
  PRIMARY KEY (`power_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of test_power
-- ----------------------------
INSERT INTO `test_power` VALUES ('1', 'admin');
INSERT INTO `test_power` VALUES ('2', 'user');
