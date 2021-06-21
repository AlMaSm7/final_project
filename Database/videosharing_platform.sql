-- MySQL Script generated by MySQL Workbench
-- Fri May  7 10:28:35 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema videoshare
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `videoshare` ;

-- -----------------------------------------------------
-- Schema videoshare
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `videoshare` DEFAULT CHARACTER SET utf8 ;
USE `videoshare` ;

-- -----------------------------------------------------
-- Table `videoshare`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `videoshare`.`users` ;

CREATE TABLE IF NOT EXISTS `videoshare`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `firstname` VARCHAR(255) NULL,
  `lastname` VARCHAR(255) NULL,
  `email` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `videoshare`.`videos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `videoshare`.`videos` ;

CREATE TABLE IF NOT EXISTS `videoshare`.`videos` (
  `videos_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `length` VARCHAR(255) NOT NULL,
  `path` VARCHAR(255) NOT NULL,
  `time` TIMESTAMP NOT NULL,
  `thumbnail` VARCHAR(255) NOT NULL,
  `likes` INT NULL DEFAULT 0,
  
  `dislikes` INT NOT NULL DEFAULT 0,
  `views` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`videos_id`),
  UNIQUE INDEX `videos_id_UNIQUE` (`videos_id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `videoshare`.`comments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `videoshare`.`comments` ;

CREATE TABLE IF NOT EXISTS `videoshare`.`comments` (
  `comments_id` INT NOT NULL AUTO_INCREMENT,
  `text` TEXT NOT NULL,
  `time` TIMESTAMP NOT NULL,
  `likes` INT NULL DEFAULT 0,
  `videos_id_fs` INT,
  `users_id_fs` INT,
  PRIMARY KEY (`comments_id`),
  UNIQUE INDEX `users_videos_comments_id_UNIQUE` (`comments_id` ASC),
  CONSTRAINT `videos_id_fs`
    FOREIGN KEY (`videos_id_fs`)
    REFERENCES `videoshare`.`videos` (`videos_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `users_id_fs`
    FOREIGN KEY (`users_id_fs`)
    REFERENCES `videoshare`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `videoshare`.`liked_dislike`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `videoshare`.`liked_dislike` ;

CREATE TABLE IF NOT EXISTS `videoshare`.`liked_dislike` (
  `liked_dislike_id` INT NOT NULL AUTO_INCREMENT,
  `liked` BINARY NULL,
  `users_id_fs` INT,
  `videos_id_fs` INT, 
  PRIMARY KEY (`liked_dislike_id`),
  CONSTRAINT `liked_dislike_videos_id_fs`
    FOREIGN KEY (`videos_id_fs`)
    REFERENCES `videoshare`.`videos` (`videos_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `liked_dislike_users_id_fs`
    FOREIGN KEY (`users_id_fs`)
    REFERENCES `videoshare`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
