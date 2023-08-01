/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 80030
 Source Host           : localhost:3306
 Source Schema         : qlcv

 Target Server Type    : MySQL
 Target Server Version : 80030
 File Encoding         : 65001

 Date: 05/07/2023 09:52:29
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user_login
-- ----------------------------
DROP TABLE IF EXISTS `user_login`;
CREATE TABLE `user_login`  (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `password` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `user_session_id` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `user_name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

drop database qlcv;

create database qlcv;
use qlcv;
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255),
    password VARCHAR(255),
    name VARCHAR(255),
    phone VARCHAR(255),
    email VARCHAR(255),
    address VARCHAR(255),
    gender varchar(255),
    status varchar(255),
    birthday DATE
);
CREATE TABLE users_login (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255),
    password VARCHAR(255)
);


CREATE TABLE tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    description VARCHAR(255),
    deadline DATE,
    priority INT,
    status int,
    assigned_to INT,
    createDate datetime default now(),
    updateDate datetime default now()
);



CREATE TABLE progress (
    id INT PRIMARY KEY AUTO_INCREMENT,
    task_id INT,
    percentage_completed INT,
    time_elapsed INT,
    time_remaining INT
);
CREATE TABLE label (
    id INT PRIMARY KEY auto_increment,
    name VARCHAR(255)
);
CREATE TABLE task_label (
    task_label_id INT PRIMARY KEY  AUTO_INCREMENT,
    task_id INT,
    label_id INT
);

-- ----------------------------
-- Records of user_login
-- ----------------------------
INSERT INTO `user_login` VALUES (1, 'test@gmail.com', '123456', '', 'test');
INSERT INTO `user_login` VALUES (2, 'test1@gmail.com', '123456', '', 'test1');

SET FOREIGN_KEY_CHECKS = 1;
