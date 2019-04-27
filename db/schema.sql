DROP DATABASE IF EXISTS chat;
CREATE DATABASE chat;
USE chat;

CREATE TABLE user (
	  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(20) NOT NULL,
    `password` VARCHAR(20) NOT NULL,
    `online` ENUM('N','Y') NOT NULL,
    `socketid` VARCHAR(20) DEFAULT NULL
);

CREATE TABLE message (
	  `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `from_user_id` VARCHAR(50) DEFAULT NULL,
    `to_user_id` VARCHAR(50) DEFAULT NULL,
    `message` TEXT
);