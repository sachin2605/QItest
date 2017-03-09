SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `qitest` ;
CREATE SCHEMA IF NOT EXISTS `qitest` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci ;
USE `qitest` ;

-- -----------------------------------------------------
-- Table `qitest`.`Users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `qitest`.`Users` ;

CREATE TABLE IF NOT EXISTS `qitest`.`Users` (
  `Id` INT(11) NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(128) NOT NULL,
  `Email` VARCHAR(255) NOT NULL,
  `Password` CHAR(60) NOT NULL,
  `SendMail` TINYINT(1) NOT NULL DEFAULT 1,
  `CreateDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdateDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Id_UNIQUE` (`Id` ASC),
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `qitest`.`Roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `qitest`.`Roles` ;

CREATE TABLE IF NOT EXISTS `qitest`.`Roles` (
  `Id` INT(11) NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `Active` TINYINT(1) NOT NULL DEFAULT 1,
  `CreateDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdateDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Id_UNIQUE` (`Id` ASC),
  UNIQUE INDEX `Name_UNIQUE` (`Name` ASC))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `qitest`.`Roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `qitest`.`Instrument` ;

CREATE TABLE IF NOT EXISTS `qitest`.`Instrument` (
  `Id` INT(11) NOT NULL AUTO_INCREMENT,
  `Instrument_Id` INT(10) NOT NULL,
  `Count` INT(10) NOT NULL DEFAULT 0,
  `CreateDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdateDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Id_UNIQUE` (`Id` ASC),
  UNIQUE INDEX `Instrument_Id_UNIQUE` (`Instrument_Id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `qitest`.`Users_has_Roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `qitest`.`Users_has_Roles` ;

CREATE TABLE IF NOT EXISTS `qitest`.`Users_has_Roles` (
  `Users_Id` INT(11) NOT NULL,
  `Roles_Id` INT(11) NOT NULL,
  `CreateDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdateDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Users_Id`, `Roles_Id`),
  INDEX `fk_Users_has_Roles_Roles1_idx` (`Roles_Id` ASC),
  INDEX `fk_Users_has_Roles_Users1_idx` (`Users_Id` ASC),
  CONSTRAINT `fk_Users_has_Roles_Users1`
    FOREIGN KEY (`Users_Id`)
    REFERENCES `qitest`.`Users` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Users_has_Roles_Roles1`
    FOREIGN KEY (`Roles_Id`)
    REFERENCES `qitest`.`Roles` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `qitest`.`Roles`
-- -----------------------------------------------------
START TRANSACTION;
USE `qitest`;
INSERT INTO `qitest`.`Roles` (`Id`, `Name`) VALUES (1, 'Admin');
INSERT INTO `qitest`.`Roles` (`Id`, `Name`) VALUES (2, 'View');
INSERT INTO `qitest`.`Users` (`Id`, `Name`, `Email`, `Password`) VALUES (1, 'Admin', 'admin@admin.new','$2a$10$D1GqqBSu6Yb4z7OHGdd2T.r0aYPF/TCKakte8PHlEjMdnnm2HOPJe');
INSERT INTO `qitest`.`Users_has_Roles` (`Users_Id`, `Roles_Id`) VALUES (1,1);

COMMIT;

