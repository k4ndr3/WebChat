CREATE DATABASE  IF NOT EXISTS `web_chat` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `web_chat`;
-- MariaDB dump 10.17  Distrib 10.4.8-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: web_chat
-- ------------------------------------------------------
-- Server version	10.4.8-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `chatname` varchar(45) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
INSERT INTO `chat` VALUES (1,'TestChat1','2021-02-11 07:20:11','2021-02-11 07:20:11'),(2,'TestChat2','2021-02-11 07:24:04','2021-02-11 07:24:04'),(3,'TestChat3','2021-02-11 07:24:08','2021-02-11 07:24:08'),(4,'TestChat4','2021-02-11 07:24:11','2021-02-11 07:24:11'),(5,'TestChat5','2021-02-11 07:24:14','2021-02-11 07:24:14'),(6,'TestChat6','2021-02-11 07:24:17','2021-02-11 07:24:17');
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chatmembers`
--

DROP TABLE IF EXISTS `chatmembers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chatmembers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ChatId` int(10) unsigned DEFAULT NULL,
  `UserId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ChatMembers_UserId_ChatId_unique` (`ChatId`,`UserId`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `chatmembers_ibfk_131` FOREIGN KEY (`ChatId`) REFERENCES `chat` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chatmembers_ibfk_132` FOREIGN KEY (`UserId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chatmembers`
--

LOCK TABLES `chatmembers` WRITE;
/*!40000 ALTER TABLE `chatmembers` DISABLE KEYS */;
INSERT INTO `chatmembers` VALUES (1,'2021-02-11 07:20:11','2021-02-11 07:20:11',1,1),(2,'2021-02-11 07:24:04','2021-02-11 07:24:04',2,1),(3,'2021-02-11 07:24:08','2021-02-11 07:24:08',3,1),(4,'2021-02-11 07:24:11','2021-02-11 07:24:11',4,1),(5,'2021-02-11 07:24:14','2021-02-11 07:24:14',5,1),(6,'2021-02-11 07:24:17','2021-02-11 07:24:17',6,1),(7,'2021-02-11 07:50:21','2021-02-11 07:50:21',1,3),(8,'2021-02-11 07:52:59','2021-02-11 07:52:59',1,4),(11,'2021-02-11 07:54:07','2021-02-11 07:54:07',4,3);
/*!40000 ALTER TABLE `chatmembers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `message` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `message` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(10) unsigned DEFAULT NULL,
  `ChatId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  KEY `ChatId` (`ChatId`),
  CONSTRAINT `message_ibfk_131` FOREIGN KEY (`UserId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `message_ibfk_132` FOREIGN KEY (`ChatId`) REFERENCES `chat` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,'\"fdsafdsa\"','0000-00-00 00:00:00','0000-00-00 00:00:00',1,1);
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'test123','Pw123','2021-02-05 10:00:00','2021-02-08 18:00:00'),(3,'jonny','beschte','2021-02-06 14:14:00','2021-02-08 16:31:00'),(4,'max','muster','2021-02-06 18:35:00','2021-02-08 17:54:00'),(5,'TestUser_Updated','string','2021-02-09 13:50:42','2021-02-09 13:53:25');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-08 23:51:51
