/*
Navicat MySQL Data Transfer

Source Server         : hr
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2018-01-24 09:16:27
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for test_position
-- ----------------------------
DROP TABLE IF EXISTS `test_position`;
CREATE TABLE `test_position` (
  `position_id` int(11) NOT NULL AUTO_INCREMENT,
  `position_name` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`position_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of test_position
-- ----------------------------
INSERT INTO `test_position` VALUES ('1', '办事员');
INSERT INTO `test_position` VALUES ('2', '专员');
INSERT INTO `test_position` VALUES ('3', '中专');
INSERT INTO `test_position` VALUES ('4', '副理');
INSERT INTO `test_position` VALUES ('5', '经理');
INSERT INTO `test_position` VALUES ('6', '协理');
