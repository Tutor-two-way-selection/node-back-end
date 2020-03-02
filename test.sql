CREATE DATABASE  IF NOT EXISTS `test` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `test`;
-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: test
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `adminNum` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `adminPass` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `adminGrade` json DEFAULT NULL,
  PRIMARY KEY (`adminNum`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('123456','123456','[2017]');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `graduatechoice`
--

DROP TABLE IF EXISTS `graduatechoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `graduatechoice` (
  `stuNum` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `idFirst` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `statusFirst` varchar(255) DEFAULT NULL,
  `idSecond` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `statusSecond` varchar(255) DEFAULT NULL,
  `adjust` tinyint(4) DEFAULT NULL,
  `tableBody` json DEFAULT NULL,
  PRIMARY KEY (`stuNum`) USING BTREE,
  KEY `teacher_key` (`idFirst`,`idSecond`) USING BTREE,
  CONSTRAINT `stuNum_key` FOREIGN KEY (`stuNum`) REFERENCES `student` (`stuNum`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `graduatechoice`
--

LOCK TABLES `graduatechoice` WRITE;
/*!40000 ALTER TABLE `graduatechoice` DISABLE KEYS */;
INSERT INTO `graduatechoice` VALUES ('201701010101',NULL,NULL,NULL,NULL,NULL,NULL),('201701010102',NULL,NULL,NULL,NULL,NULL,NULL),('201701010103',NULL,NULL,NULL,NULL,NULL,NULL),('201706062629',NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `graduatechoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regularchoice`
--

DROP TABLE IF EXISTS `regularchoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regularchoice` (
  `stuNum` varchar(255) NOT NULL,
  `idFirst` varchar(255) DEFAULT NULL,
  `statusFirst` varchar(255) DEFAULT NULL,
  `idSecond` varchar(255) DEFAULT NULL,
  `statusSecond` varchar(255) DEFAULT NULL,
  `adjust` tinyint(4) DEFAULT NULL,
  `tableBody` json DEFAULT NULL,
  PRIMARY KEY (`stuNum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regularchoice`
--

LOCK TABLES `regularchoice` WRITE;
/*!40000 ALTER TABLE `regularchoice` DISABLE KEYS */;
INSERT INTO `regularchoice` VALUES ('201701010101',NULL,NULL,NULL,NULL,NULL,NULL),('201701010102',NULL,NULL,NULL,NULL,NULL,NULL),('201701010103',NULL,NULL,NULL,NULL,NULL,NULL),('201706062629','1001','accept','1003','accept',0,'{\"choiceTable\": {\"flag\": true, \"fileList\": [{\"url\": \"abcabcabcabcabcabcabcabc\", \"name\": \"caster.jpg\", \"status\": \"success\"}]}, \"profileTable\": {\"flag\": true, \"fileList\": [{\"url\": \"abcabcabcabcabcabcabcabc\", \"name\": \"caster.jpg\", \"status\": \"success\"}, {\"url\": \"http://localhost:8080/downloadFile?filename=saidgihkdglha&oldname=va11halla.png\", \"name\": \"caster.jpg\", \"size\": 1447144, \"status\": \"success\"}]}}');
/*!40000 ALTER TABLE `regularchoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `result`
--

DROP TABLE IF EXISTS `result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `result` (
  `stuNum` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `graduateid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `regularid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`stuNum`) USING BTREE,
  KEY `id5` (`graduateid`) USING BTREE,
  CONSTRAINT `id5` FOREIGN KEY (`graduateid`) REFERENCES `teacher` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `stuNum5` FOREIGN KEY (`stuNum`) REFERENCES `student` (`stuNum`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `result`
--

LOCK TABLES `result` WRITE;
/*!40000 ALTER TABLE `result` DISABLE KEYS */;
INSERT INTO `result` VALUES ('201701010101',NULL,NULL),('201701010102',NULL,NULL),('201701010103',NULL,NULL),('201706062629',NULL,NULL);
/*!40000 ALTER TABLE `result` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stuaccount`
--

DROP TABLE IF EXISTS `stuaccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stuaccount` (
  `stuNum` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `initPass` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `stuPass` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `passChanged` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  KEY `stunum1` (`stuNum`) USING BTREE,
  CONSTRAINT `stunum1` FOREIGN KEY (`stuNum`) REFERENCES `student` (`stuNum`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stuaccount`
--

LOCK TABLES `stuaccount` WRITE;
/*!40000 ALTER TABLE `stuaccount` DISABLE KEYS */;
INSERT INTO `stuaccount` VALUES ('201706062629','291021','1234','1'),('201701010101','090617','090617','0'),('201701010102','090617','090617','0'),('201701010103','090617','090617','0');
/*!40000 ALTER TABLE `stuaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `stuNum` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `stuName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `stuClass` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `stuTelephone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `stuGrade` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`stuNum`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES ('201701010101','张三','class1','123456789','2016'),('201701010102','李四','class2','123456789','2016'),('201701010103','王五','class1','123456789','2016'),('201706062629','张三','数字媒体技术1班','123456789','2017');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teaaccount`
--

DROP TABLE IF EXISTS `teaaccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teaaccount` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pass` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  KEY `id1` (`id`) USING BTREE,
  CONSTRAINT `id1` FOREIGN KEY (`id`) REFERENCES `teacher` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teaaccount`
--

LOCK TABLES `teaaccount` WRITE;
/*!40000 ALTER TABLE `teaaccount` DISABLE KEYS */;
INSERT INTO `teaaccount` VALUES ('1001','12345678');
/*!40000 ALTER TABLE `teaaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `department` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `search` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `contact` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `isgraduate` tinyint(4) DEFAULT '1',
  `isregular` tinyint(4) DEFAULT '1',
  `graduatenum` int(11) DEFAULT '0',
  `regularnum` int(11) DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` VALUES ('1001','刘梅','智慧城市研究所','计算机图形学','123456789',0,1,0,0),('1002','张浩','计算机视觉研究所','图像处理','123456789',1,0,0,0),('1003','李波','软件研究所','操作系统','123456789',1,1,0,0);
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-02 12:11:58
