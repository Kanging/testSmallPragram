/*
Navicat MySQL Data Transfer

Source Server         : hr
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2018-01-24 09:15:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for test_activity
-- ----------------------------
DROP TABLE IF EXISTS `test_activity`;
CREATE TABLE `test_activity` (
  `activity_id` int(11) NOT NULL AUTO_INCREMENT,
  `activity_type` int(11) NOT NULL COMMENT 'type判断是请假还是出差。。。1或者2',
  `activity_openid` varchar(255) NOT NULL COMMENT 'userid用户id',
  `activity_st` datetime NOT NULL COMMENT '活动开始时间',
  `activity_et` datetime NOT NULL,
  `activity_createtime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `activity_address` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '出差地点',
  `activity_reson` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '活动事由',
  `activity_fristcheck_openid` varchar(255) NOT NULL COMMENT '审核人的id（用户表）',
  `activity_secondcheck_openid` varchar(255) DEFAULT NULL COMMENT '审核人2 的id',
  `activity_fristcheck_result` int(11) NOT NULL DEFAULT '0' COMMENT '审核人1的审核结果，同意还是拒绝0或1',
  `activity_secondcheck_result` int(11) DEFAULT NULL COMMENT '审核人2的审核结果，同意还是拒绝1或是2',
  `activity_allresult` int(11) NOT NULL DEFAULT '1' COMMENT '活动是否完成，默认1为未完成，2为完成',
  `activity_time` float(11,0) NOT NULL,
  PRIMARY KEY (`activity_id`),
  KEY `activity_uid` (`activity_openid`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of test_activity
-- ----------------------------

