-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: qlcv
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `label`
--

DROP TABLE IF EXISTS `label`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `label` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `label`
--

LOCK TABLES `label` WRITE;
/*!40000 ALTER TABLE `label` DISABLE KEYS */;
INSERT INTO `label` VALUES (1,'xxx');
/*!40000 ALTER TABLE `label` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `progress`
--

DROP TABLE IF EXISTS `progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `progress` (
  `id` int NOT NULL AUTO_INCREMENT,
  `task_id` int DEFAULT NULL,
  `percentage_completed` int DEFAULT NULL,
  `time_elapsed` int DEFAULT NULL,
  `time_remaining` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `progress`
--

LOCK TABLES `progress` WRITE;
/*!40000 ALTER TABLE `progress` DISABLE KEYS */;
/*!40000 ALTER TABLE `progress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_label`
--

DROP TABLE IF EXISTS `task_label`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_label` (
  `task_label_id` int NOT NULL,
  `task_id` int DEFAULT NULL,
  `label_id` int DEFAULT NULL,
  PRIMARY KEY (`task_label_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_label`
--

LOCK TABLES `task_label` WRITE;
/*!40000 ALTER TABLE `task_label` DISABLE KEYS */;
/*!40000 ALTER TABLE `task_label` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `priority` varchar(10) DEFAULT NULL,
  `progress` int DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `assigned_to` int DEFAULT NULL,
  `createDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `updateDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1,'Frontend','Tìm Hiểu Frontend','2023-08-09','high',0,'Ready',2,'2023-08-04 10:45:09','2023-08-04 13:43:45'),(2,'Backend','Tìm Hiểu Backend','2023-08-09','medium',0,'Ready',1,'2023-08-04 10:46:52','2023-08-04 10:46:52'),(3,'Vuejs','Tìm Hiểu Vuejs','2023-08-17','medium',18,'Progress',3,'2023-08-04 10:51:31','2023-08-04 13:44:01'),(4,'Nodejs','Tìm Hiểu về Nodejs','2023-08-15','high',22,'Progress',1,'2023-08-04 10:52:24','2023-08-04 13:44:08'),(5,'Frontend_user','Thiết Kế Frontend_user','2023-08-09','medium',94,'Review',4,'2023-08-04 10:53:05','2023-08-04 13:44:36'),(6,'Frontend_Cash','Thiết Kế Frontend_Cash','2023-08-15','medium',92,'Review',5,'2023-08-04 10:53:37','2023-08-04 13:44:44'),(7,'Database','Thiết kế Database','2023-08-15','medium',100,'Done',5,'2023-08-04 10:55:39','2023-08-04 13:44:52'),(8,'API','Phát triển các API ','2023-08-16','high',100,'Done',1,'2023-08-04 10:58:02','2023-08-04 13:45:00'),(9,'CRUD user','Làm chức năng CRUD user','2023-08-16','medium',100,'Done',3,'2023-08-04 10:58:37','2023-08-04 13:45:10'),(10,'CRUD task','Làm chức năng CRUD task','2023-08-13','medium',0,'Ready',2,'2023-08-04 10:59:03','2023-08-04 10:59:03'),(11,'CRUD label','Làm chức năng CRUD label','2023-08-16','high',0,'Ready',2,'2023-08-04 10:59:33','2023-08-04 10:59:33'),(12,'Assigned To','Gán người thực hiện','2023-08-08','medium',0,'Ready',4,'2023-08-04 11:01:21','2023-08-04 11:01:21');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,NULL,NULL,'Tân Lương','0961464102','sv.lmt.102@gmail.com','36 ngõ , ngõ 48','nam','15','2023-08-17'),(2,NULL,NULL,'Huy Hoàng','0333781804','hoahung9889@gmail.com','Số 5, ngõ 147 đường Vũ Xuân Thiều','nam','20','2001-12-03'),(3,NULL,NULL,'Vũ Quân','0333781804','hoahung9889@gmail.com','Số 5, ngõ 147 đường Vũ Xuân Thiều','nam','1','2002-02-03'),(4,NULL,NULL,'Đình Thanh','0333781804','hoahung9889@gmail.com','Số 5, ngõ 147 đường Vũ Xuân Thiều','nam','12','2001-08-05'),(5,NULL,NULL,'Văn Khoa','0961464102','sv.lmt.102@gmail.com','36 ngõ , ngõ 48','nam','20','2001-06-03'),(6,NULL,NULL,'Tân Lương','0333781804','hoahung9889@gmail.com','Số 5, ngõ 147 đường Vũ Xuân Thiều','nam','21','2022-12-03');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_login`
--

DROP TABLE IF EXISTS `users_login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_login` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_login`
--

LOCK TABLES `users_login` WRITE;
/*!40000 ALTER TABLE `users_login` DISABLE KEYS */;
INSERT INTO `users_login` VALUES (1,'test','12345'),(2,'test1','12345'),(3,'test2','12345');
/*!40000 ALTER TABLE `users_login` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-04 16:00:54
