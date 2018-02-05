/*
Navicat MySQL Data Transfer

Source Server         : hr
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2018-01-24 09:16:08
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for test_department
-- ----------------------------
DROP TABLE IF EXISTS `test_department`;
CREATE TABLE `test_department` (
  `department_id` int(11) NOT NULL AUTO_INCREMENT,
  `department_name` char(255) NOT NULL,
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of test_department
-- ----------------------------
INSERT INTO `test_department` VALUES ('2', '电商组');
INSERT INTO `test_department` VALUES ('3', 'IT组');
