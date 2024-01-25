-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 25, 2024 at 02:51 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `esellerate`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers_auto_general`
--

CREATE TABLE `answers_auto_general` (
  `id` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `text` varchar(350) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `answers_auto_general`
--

INSERT INTO `answers_auto_general` (`id`, `type`, `user_id`, `text`) VALUES
(2, 1, 1643952570, 'Gracias por tu compra indícanos por favor, número de fondo, nombre al frente y tamaño');

-- --------------------------------------------------------

--
-- Table structure for table `answers_quick`
--

CREATE TABLE `answers_quick` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `keyword` varchar(20) NOT NULL,
  `answer` varchar(350) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `answers_quick`
--

INSERT INTO `answers_quick` (`id`, `user_id`, `keyword`, `answer`) VALUES
(3, 1643952570, 'saludo', 'Hola buen dia gracias por tu compra');

-- --------------------------------------------------------

--
-- Table structure for table `design`
--

CREATE TABLE `design` (
  `id` int(11) NOT NULL,
  `description` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `design`
--

INSERT INTO `design` (`id`, `description`) VALUES
(1, 'Hueso grande');

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `id` varchar(11) NOT NULL,
  `fk_mlapp` varchar(255) NOT NULL,
  `stock` int(11) NOT NULL,
  `stock_ml` int(11) NOT NULL,
  `stock_ml_restore` int(11) NOT NULL,
  `stock_enable` tinyint(1) NOT NULL,
  `fk_design` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `mercadolibre_app`
--

CREATE TABLE `mercadolibre_app` (
  `client_id` varchar(255) NOT NULL,
  `client_secret` varchar(255) DEFAULT NULL,
  `redirect_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mercadolibre_app`
--

INSERT INTO `mercadolibre_app` (`client_id`, `client_secret`, `redirect_url`) VALUES
('6181695585855937', 'JXDeRI7GOQ1P5np4lGCgoBT8zO3l1ITZ', 'https://localhost:5173/');

-- --------------------------------------------------------

--
-- Table structure for table `mercadolibre_auth`
--

CREATE TABLE `mercadolibre_auth` (
  `id` int(11) NOT NULL,
  `personal_token` varchar(255) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mercadolibre_auth`
--

INSERT INTO `mercadolibre_auth` (`id`, `personal_token`, `refresh_token`) VALUES
(1, 'APP_USR-7741438893697913-112422-3b49d54b77c182031c279882e8defd93-1489297309', 'TG-65616030729356000173d5bd-1489297309'),
(1643952570, 'APP_USR-6181695585855937-012509-d6f8c50190c339ac3c7e30b3e34745c7-1643952570', 'TG-65b2674d7d098e0001323a63-1643952570');

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `fk_product_id` varchar(255) NOT NULL,
  `type` int(11) NOT NULL,
  `text` varchar(350) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `fk_product_id`, `type`, `text`) VALUES
(4, 'MLM1981863279', 1, 'Cristo viene cristo viene aleluya aleluya aleluya cristo viene cristo viene aleluya aleluya aleluya Cristo viene cristo viene aleluya aleluya aleluya cristo viene cristo viene aleluya aleluya aleluya Cristo viene cristo viene aleluya aleluya aleluya cristo viene cristo viene aleluya aleluya aleluya Cristo viene cristo viene aleluya aleluya aleluya '),
(5, 'MLM1981863279', 1, 'DIOS YA VIENE'),
(6, 'MLM1981854347', 1, 'Hola, gracias por tu compra, puedes dejar el texto que debería de llevar este producto?'),
(7, 'MLM1981854347', 1, 'La informacion que usted guste'),
(8, 'MLM1981854347', 1, ':)');

-- --------------------------------------------------------

--
-- Table structure for table `message_relevant`
--

CREATE TABLE `message_relevant` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `text` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `message_relevant`
--

INSERT INTO `message_relevant` (`id`, `user_id`, `order_id`, `text`) VALUES
(0, 1643952570, '2000007453627754', '{\"information\":{\"Forma\":\"mask_heart_big\",\"Fondo\":\"14\",\"Nombre\":\"Holiwis\"},\"image\":\"1643952570_7bfef976-4f92-407c-bba6-12caf483b43e.png\"}');

-- --------------------------------------------------------

--
-- Table structure for table `message_type`
--

CREATE TABLE `message_type` (
  `id` int(11) NOT NULL,
  `description` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `message_type`
--

INSERT INTO `message_type` (`id`, `description`) VALUES
(1, 'Mensaje inicial');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20231025181736-create-user.cjs'),
('20231025200308-create-user-type.cjs'),
('20231025200744-create-mercadolibre-app.cjs'),
('20231029223553-create-mercadolibre-auth.cjs'),
('z1-create-message.cjs'),
('z2-create-design.cjs'),
('z3-create-item.cjs'),
('z4create-message_type.cjs');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`sid`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
('9BTQgs-nwKuQLq0_G_Az1Xy2PEGMA_6G', '2024-01-10 13:57:02', '{\"id\":1489297309,\"nickname\":\"TESTUSER1595512342\",\"registration_date\":\"2023-09-25T02:12:41.191-04:00\",\"first_name\":\"Test\",\"last_name\":\"Test\",\"gender\":\"\",\"country_id\":\"MX\",\"email\":\"test_user_1595512342@testuser.com\",\"identification\":{\"number\":\"aaaaaa11111111a111\",\"type\":\"IFE\"},\"address\":{\"address\":\"Calle Ciprés 1648\",\"city\":\"Guadalajara\",\"state\":\"MX-JAL\",\"zip_code\":\"44900\"},\"phone\":{\"area_code\":\"01\",\"extension\":\"\",\"number\":\"1111-1111\",\"verified\":false},\"alternative_phone\":{\"area_code\":\"\",\"extension\":\"\",\"number\":\"\"},\"user_type\":\"normal\",\"tags\":[\"test_user\",\"normal\"],\"logo\":null,\"points\":0,\"site_id\":\"MLM\",\"permalink\":\"http://perfil.mercadolibre.com.mx/TESTUSER1595512342\",\"seller_experience\":\"NEWBIE\",\"bill_data\":{\"accept_credit_note\":null},\"seller_reputation\":{\"level_id\":\"1_red\",\"power_seller_status\":null,\"transactions\":{\"canceled\":5,\"completed\":11,\"period\":\"historic\",\"ratings\":{\"negative\":0,\"neutral\":1,\"positive\":0},\"total\":16},\"metrics\":{\"sales\":{\"period\":\"365 days\",\"completed\":11},\"claims\":{\"period\":\"365 days\",\"rate\":0,\"value\":0},\"delayed_handling_time\":{\"period\":\"365 days\",\"rate\":1,\"value\":9},\"cancellations\":{\"period\":\"365 days\",\"rate\":0,\"value\":0}}},\"buyer_reputation\":{\"canceled_transactions\":0,\"tags\":null,\"transactions\":{\"canceled\":{\"paid\":null,\"total\":null},\"completed\":null,\"not_yet_rated\":{\"paid\":null,\"total\":null,\"units\":null},\"period\":\"\",\"total\":null,\"unrated\":{\"paid\":null,\"total\":null}}},\"status\":{\"billing\":{\"allow\":true,\"codes\":[]},\"buy\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"confirmed_email\":true,\"shopping_cart\":{\"buy\":\"allowed\",\"sell\":\"allowed\"},\"immediate_payment\":false,\"list\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"mercadoenvios\":\"not_accepted\",\"mercadopago_account_type\":\"personal\",\"mercadopago_tc_accepted\":true,\"required_action\":\"\",\"sell\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[\"low_seller_reputation\"],\"required\":true}},\"site_status\":\"active\",\"user_type\":null},\"company\":{\"brand_name\":null,\"city_tax_id\":\"\",\"corporate_name\":\"\",\"identification\":\"\",\"state_tax_id\":\"\",\"cust_type_id\":\"CO\",\"soft_descriptor\":null},\"credit\":{\"consumed\":0,\"credit_level_id\":\"MLM5\",\"rank\":\"payer\"},\"context\":{},\"thumbnail\":{\"picture_id\":\"849459-MLA72972708517_112023\",\"picture_url\":\"https://mla-s2-p.mlstatic.com/849459-MLA72972708517_112023-O.jpg\"},\"registration_identifiers\":[]}', '2024-01-10 07:57:02', '2024-01-10 07:57:02'),
('EYhT-Vhroqc66lIWozNMM3Etk1wORgvu', '2024-01-10 07:50:56', '{\"id\":1489297309,\"nickname\":\"TESTUSER1595512342\",\"registration_date\":\"2023-09-25T02:12:41.191-04:00\",\"first_name\":\"Test\",\"last_name\":\"Test\",\"gender\":\"\",\"country_id\":\"MX\",\"email\":\"test_user_1595512342@testuser.com\",\"identification\":{\"number\":\"aaaaaa11111111a111\",\"type\":\"IFE\"},\"address\":{\"address\":\"Calle Ciprés 1648\",\"city\":\"Guadalajara\",\"state\":\"MX-JAL\",\"zip_code\":\"44900\"},\"phone\":{\"area_code\":\"01\",\"extension\":\"\",\"number\":\"1111-1111\",\"verified\":false},\"alternative_phone\":{\"area_code\":\"\",\"extension\":\"\",\"number\":\"\"},\"user_type\":\"normal\",\"tags\":[\"test_user\",\"normal\"],\"logo\":null,\"points\":0,\"site_id\":\"MLM\",\"permalink\":\"http://perfil.mercadolibre.com.mx/TESTUSER1595512342\",\"seller_experience\":\"NEWBIE\",\"bill_data\":{\"accept_credit_note\":null},\"seller_reputation\":{\"level_id\":\"1_red\",\"power_seller_status\":null,\"transactions\":{\"canceled\":5,\"completed\":11,\"period\":\"historic\",\"ratings\":{\"negative\":0,\"neutral\":1,\"positive\":0},\"total\":16},\"metrics\":{\"sales\":{\"period\":\"365 days\",\"completed\":11},\"claims\":{\"period\":\"365 days\",\"rate\":0,\"value\":0},\"delayed_handling_time\":{\"period\":\"365 days\",\"rate\":1,\"value\":9},\"cancellations\":{\"period\":\"365 days\",\"rate\":0,\"value\":0}}},\"buyer_reputation\":{\"canceled_transactions\":0,\"tags\":null,\"transactions\":{\"canceled\":{\"paid\":null,\"total\":null},\"completed\":null,\"not_yet_rated\":{\"paid\":null,\"total\":null,\"units\":null},\"period\":\"\",\"total\":null,\"unrated\":{\"paid\":null,\"total\":null}}},\"status\":{\"billing\":{\"allow\":true,\"codes\":[]},\"buy\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"confirmed_email\":true,\"shopping_cart\":{\"buy\":\"allowed\",\"sell\":\"allowed\"},\"immediate_payment\":false,\"list\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"mercadoenvios\":\"not_accepted\",\"mercadopago_account_type\":\"personal\",\"mercadopago_tc_accepted\":true,\"required_action\":\"\",\"sell\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[\"low_seller_reputation\"],\"required\":true}},\"site_status\":\"active\",\"user_type\":null},\"company\":{\"brand_name\":null,\"city_tax_id\":\"\",\"corporate_name\":\"\",\"identification\":\"\",\"state_tax_id\":\"\",\"cust_type_id\":\"CO\",\"soft_descriptor\":null},\"credit\":{\"consumed\":0,\"credit_level_id\":\"MLM5\",\"rank\":\"payer\"},\"context\":{},\"thumbnail\":{\"picture_id\":\"849459-MLA72972708517_112023\",\"picture_url\":\"https://mla-s2-p.mlstatic.com/849459-MLA72972708517_112023-O.jpg\"},\"registration_identifiers\":[]}', '2024-01-10 01:50:56', '2024-01-10 01:50:56'),
('hoAvLRUu8oVBZw7qTPqSSQxhkYLINA-j', '2024-01-25 00:18:38', '{\"id\":1643952570,\"nickname\":\"TESTUSER1318589997\",\"registration_date\":\"2024-01-17T18:38:11.481-04:00\",\"first_name\":\"Test\",\"last_name\":\"Test\",\"gender\":\"\",\"country_id\":\"MX\",\"email\":\"test_user_1318589997@testuser.com\",\"identification\":{\"number\":\"aaaaaa11111111a111\",\"type\":\"IFE\"},\"address\":{\"address\":\"Calle San Guillermo SN\",\"city\":\"Guadalajara\",\"state\":\"MX-JAL\",\"zip_code\":\"44510\"},\"phone\":{\"area_code\":\"01\",\"extension\":\"\",\"number\":\"1111-1111\",\"verified\":false},\"alternative_phone\":{\"area_code\":\"\",\"extension\":\"\",\"number\":\"\"},\"user_type\":\"normal\",\"tags\":[\"test_user\",\"normal\"],\"logo\":null,\"points\":0,\"site_id\":\"MLM\",\"permalink\":\"http://perfil.mercadolibre.com.mx/TESTUSER1318589997\",\"seller_experience\":\"NEWBIE\",\"bill_data\":{\"accept_credit_note\":null},\"seller_reputation\":{\"level_id\":null,\"power_seller_status\":null,\"transactions\":{\"canceled\":0,\"completed\":0,\"period\":\"historic\",\"ratings\":{\"negative\":0,\"neutral\":0,\"positive\":0},\"total\":0},\"metrics\":{\"sales\":{\"period\":null,\"completed\":0},\"claims\":{\"period\":\"60 months\",\"rate\":0,\"value\":0},\"delayed_handling_time\":{\"period\":\"60 months\",\"rate\":0,\"value\":0},\"cancellations\":{\"period\":\"60 months\",\"rate\":0,\"value\":0}}},\"buyer_reputation\":{\"canceled_transactions\":0,\"tags\":null,\"transactions\":{\"canceled\":{\"paid\":null,\"total\":null},\"completed\":null,\"not_yet_rated\":{\"paid\":null,\"total\":null,\"units\":null},\"period\":\"\",\"total\":null,\"unrated\":{\"paid\":null,\"total\":null}}},\"status\":{\"billing\":{\"allow\":true,\"codes\":[]},\"buy\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"confirmed_email\":false,\"shopping_cart\":{\"buy\":\"allowed\",\"sell\":\"allowed\"},\"immediate_payment\":false,\"list\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"mercadoenvios\":\"not_accepted\",\"mercadopago_account_type\":\"personal\",\"mercadopago_tc_accepted\":true,\"required_action\":\"\",\"sell\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"site_status\":\"active\",\"user_type\":null},\"company\":{\"brand_name\":null,\"city_tax_id\":\"\",\"corporate_name\":\"\",\"identification\":\"\",\"state_tax_id\":\"\",\"cust_type_id\":\"CO\",\"soft_descriptor\":null},\"credit\":{\"consumed\":0,\"credit_level_id\":\"MLM5\",\"rank\":\"newbie\"},\"context\":{},\"thumbnail\":{\"picture_id\":\"683224-MLA74064295113_012024\",\"picture_url\":\"https://mla-s1-p.mlstatic.com/683224-MLA74064295113_012024-O.jpg\"},\"registration_identifiers\":[]}', '2024-01-24 18:18:38', '2024-01-24 18:18:38'),
('KUwTuq4TbYu_4Kd4rq2SuDomJ4HZLgPY', '2024-01-25 15:19:56', '{\"id\":1643952570,\"nickname\":\"TESTUSER1318589997\",\"registration_date\":\"2024-01-17T18:38:11.481-04:00\",\"first_name\":\"Test\",\"last_name\":\"Test\",\"gender\":\"\",\"country_id\":\"MX\",\"email\":\"test_user_1318589997@testuser.com\",\"identification\":{\"number\":\"aaaaaa11111111a111\",\"type\":\"IFE\"},\"address\":{\"address\":\"Calle San Guillermo SN\",\"city\":\"Guadalajara\",\"state\":\"MX-JAL\",\"zip_code\":\"44510\"},\"phone\":{\"area_code\":\"01\",\"extension\":\"\",\"number\":\"1111-1111\",\"verified\":false},\"alternative_phone\":{\"area_code\":\"\",\"extension\":\"\",\"number\":\"\"},\"user_type\":\"normal\",\"tags\":[\"test_user\",\"normal\"],\"logo\":null,\"points\":0,\"site_id\":\"MLM\",\"permalink\":\"http://perfil.mercadolibre.com.mx/TESTUSER1318589997\",\"seller_experience\":\"NEWBIE\",\"bill_data\":{\"accept_credit_note\":null},\"seller_reputation\":{\"level_id\":null,\"power_seller_status\":null,\"transactions\":{\"canceled\":0,\"completed\":1,\"period\":\"historic\",\"ratings\":{\"negative\":0,\"neutral\":1,\"positive\":0},\"total\":1},\"metrics\":{\"sales\":{\"period\":\"365 days\",\"completed\":1},\"claims\":{\"period\":\"365 days\",\"rate\":0,\"value\":0},\"delayed_handling_time\":{\"period\":\"365 days\",\"rate\":0,\"value\":0},\"cancellations\":{\"period\":\"365 days\",\"rate\":0,\"value\":0}}},\"buyer_reputation\":{\"canceled_transactions\":0,\"tags\":null,\"transactions\":{\"canceled\":{\"paid\":null,\"total\":null},\"completed\":null,\"not_yet_rated\":{\"paid\":null,\"total\":null,\"units\":null},\"period\":\"\",\"total\":null,\"unrated\":{\"paid\":null,\"total\":null}}},\"status\":{\"billing\":{\"allow\":true,\"codes\":[]},\"buy\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"confirmed_email\":false,\"shopping_cart\":{\"buy\":\"allowed\",\"sell\":\"allowed\"},\"immediate_payment\":false,\"list\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"mercadoenvios\":\"not_accepted\",\"mercadopago_account_type\":\"personal\",\"mercadopago_tc_accepted\":true,\"required_action\":\"\",\"sell\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"site_status\":\"active\",\"user_type\":null},\"company\":{\"brand_name\":null,\"city_tax_id\":\"\",\"corporate_name\":\"\",\"identification\":\"\",\"state_tax_id\":\"\",\"cust_type_id\":\"CO\",\"soft_descriptor\":null},\"credit\":{\"consumed\":0,\"credit_level_id\":\"MLM5\",\"rank\":\"payer\"},\"context\":{},\"thumbnail\":{\"picture_id\":\"683224-MLA74064295113_012024\",\"picture_url\":\"https://mla-s1-p.mlstatic.com/683224-MLA74064295113_012024-O.jpg\"},\"registration_identifiers\":[]}', '2024-01-25 09:19:56', '2024-01-25 09:19:56'),
('KYUkMke0odBTIMYo-ChHcIbgi-m8fM-s', '2024-01-25 06:11:08', '{\"id\":1643952570,\"nickname\":\"TESTUSER1318589997\",\"registration_date\":\"2024-01-17T18:38:11.481-04:00\",\"first_name\":\"Test\",\"last_name\":\"Test\",\"gender\":\"\",\"country_id\":\"MX\",\"email\":\"test_user_1318589997@testuser.com\",\"identification\":{\"number\":\"aaaaaa11111111a111\",\"type\":\"IFE\"},\"address\":{\"address\":\"Calle San Guillermo SN\",\"city\":\"Guadalajara\",\"state\":\"MX-JAL\",\"zip_code\":\"44510\"},\"phone\":{\"area_code\":\"01\",\"extension\":\"\",\"number\":\"1111-1111\",\"verified\":false},\"alternative_phone\":{\"area_code\":\"\",\"extension\":\"\",\"number\":\"\"},\"user_type\":\"normal\",\"tags\":[\"test_user\",\"normal\"],\"logo\":null,\"points\":0,\"site_id\":\"MLM\",\"permalink\":\"http://perfil.mercadolibre.com.mx/TESTUSER1318589997\",\"seller_experience\":\"NEWBIE\",\"bill_data\":{\"accept_credit_note\":null},\"seller_reputation\":{\"level_id\":null,\"power_seller_status\":null,\"transactions\":{\"canceled\":0,\"completed\":1,\"period\":\"historic\",\"ratings\":{\"negative\":0,\"neutral\":1,\"positive\":0},\"total\":1},\"metrics\":{\"sales\":{\"period\":\"365 days\",\"completed\":1},\"claims\":{\"period\":\"365 days\",\"rate\":0,\"value\":0},\"delayed_handling_time\":{\"period\":\"365 days\",\"rate\":0,\"value\":0},\"cancellations\":{\"period\":\"365 days\",\"rate\":0,\"value\":0}}},\"buyer_reputation\":{\"canceled_transactions\":0,\"tags\":null,\"transactions\":{\"canceled\":{\"paid\":null,\"total\":null},\"completed\":null,\"not_yet_rated\":{\"paid\":null,\"total\":null,\"units\":null},\"period\":\"\",\"total\":null,\"unrated\":{\"paid\":null,\"total\":null}}},\"status\":{\"billing\":{\"allow\":true,\"codes\":[]},\"buy\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"confirmed_email\":false,\"shopping_cart\":{\"buy\":\"allowed\",\"sell\":\"allowed\"},\"immediate_payment\":false,\"list\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"mercadoenvios\":\"not_accepted\",\"mercadopago_account_type\":\"personal\",\"mercadopago_tc_accepted\":true,\"required_action\":\"\",\"sell\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"site_status\":\"active\",\"user_type\":null},\"company\":{\"brand_name\":null,\"city_tax_id\":\"\",\"corporate_name\":\"\",\"identification\":\"\",\"state_tax_id\":\"\",\"cust_type_id\":\"CO\",\"soft_descriptor\":null},\"credit\":{\"consumed\":0,\"credit_level_id\":\"MLM5\",\"rank\":\"payer\"},\"context\":{},\"thumbnail\":{\"picture_id\":\"683224-MLA74064295113_012024\",\"picture_url\":\"https://mla-s1-p.mlstatic.com/683224-MLA74064295113_012024-O.jpg\"},\"registration_identifiers\":[]}', '2024-01-25 00:11:08', '2024-01-25 00:11:08'),
('qwfgSpEM5WTx_42PylVoUzwdKtMbyQpB', '2024-01-25 03:47:13', '{\"id\":1643952570,\"nickname\":\"TESTUSER1318589997\",\"registration_date\":\"2024-01-17T18:38:11.481-04:00\",\"first_name\":\"Test\",\"last_name\":\"Test\",\"gender\":\"\",\"country_id\":\"MX\",\"email\":\"test_user_1318589997@testuser.com\",\"identification\":{\"number\":\"aaaaaa11111111a111\",\"type\":\"IFE\"},\"address\":{\"address\":\"Calle San Guillermo SN\",\"city\":\"Guadalajara\",\"state\":\"MX-JAL\",\"zip_code\":\"44510\"},\"phone\":{\"area_code\":\"01\",\"extension\":\"\",\"number\":\"1111-1111\",\"verified\":false},\"alternative_phone\":{\"area_code\":\"\",\"extension\":\"\",\"number\":\"\"},\"user_type\":\"normal\",\"tags\":[\"test_user\",\"normal\"],\"logo\":null,\"points\":0,\"site_id\":\"MLM\",\"permalink\":\"http://perfil.mercadolibre.com.mx/TESTUSER1318589997\",\"seller_experience\":\"NEWBIE\",\"bill_data\":{\"accept_credit_note\":null},\"seller_reputation\":{\"level_id\":null,\"power_seller_status\":null,\"transactions\":{\"canceled\":0,\"completed\":1,\"period\":\"historic\",\"ratings\":{\"negative\":0,\"neutral\":1,\"positive\":0},\"total\":1},\"metrics\":{\"sales\":{\"period\":\"365 days\",\"completed\":1},\"claims\":{\"period\":\"365 days\",\"rate\":0,\"value\":0},\"delayed_handling_time\":{\"period\":\"365 days\",\"rate\":0,\"value\":0},\"cancellations\":{\"period\":\"365 days\",\"rate\":0,\"value\":0}}},\"buyer_reputation\":{\"canceled_transactions\":0,\"tags\":null,\"transactions\":{\"canceled\":{\"paid\":null,\"total\":null},\"completed\":null,\"not_yet_rated\":{\"paid\":null,\"total\":null,\"units\":null},\"period\":\"\",\"total\":null,\"unrated\":{\"paid\":null,\"total\":null}}},\"status\":{\"billing\":{\"allow\":true,\"codes\":[]},\"buy\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"confirmed_email\":false,\"shopping_cart\":{\"buy\":\"allowed\",\"sell\":\"allowed\"},\"immediate_payment\":false,\"list\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"mercadoenvios\":\"not_accepted\",\"mercadopago_account_type\":\"personal\",\"mercadopago_tc_accepted\":true,\"required_action\":\"\",\"sell\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"site_status\":\"active\",\"user_type\":null},\"company\":{\"brand_name\":null,\"city_tax_id\":\"\",\"corporate_name\":\"\",\"identification\":\"\",\"state_tax_id\":\"\",\"cust_type_id\":\"CO\",\"soft_descriptor\":null},\"credit\":{\"consumed\":0,\"credit_level_id\":\"MLM5\",\"rank\":\"payer\"},\"context\":{},\"thumbnail\":{\"picture_id\":\"683224-MLA74064295113_012024\",\"picture_url\":\"https://mla-s1-p.mlstatic.com/683224-MLA74064295113_012024-O.jpg\"},\"registration_identifiers\":[]}', '2024-01-24 21:47:13', '2024-01-24 21:47:13'),
('SuORNMOCGeLuRVXgiKH7oHAfpM2YNsQN', '2024-01-25 10:04:10', '{\"id\":1643952570,\"nickname\":\"TESTUSER1318589997\",\"registration_date\":\"2024-01-17T18:38:11.481-04:00\",\"first_name\":\"Test\",\"last_name\":\"Test\",\"gender\":\"\",\"country_id\":\"MX\",\"email\":\"test_user_1318589997@testuser.com\",\"identification\":{\"number\":\"aaaaaa11111111a111\",\"type\":\"IFE\"},\"address\":{\"address\":\"Calle San Guillermo SN\",\"city\":\"Guadalajara\",\"state\":\"MX-JAL\",\"zip_code\":\"44510\"},\"phone\":{\"area_code\":\"01\",\"extension\":\"\",\"number\":\"1111-1111\",\"verified\":false},\"alternative_phone\":{\"area_code\":\"\",\"extension\":\"\",\"number\":\"\"},\"user_type\":\"normal\",\"tags\":[\"test_user\",\"normal\"],\"logo\":null,\"points\":0,\"site_id\":\"MLM\",\"permalink\":\"http://perfil.mercadolibre.com.mx/TESTUSER1318589997\",\"seller_experience\":\"NEWBIE\",\"bill_data\":{\"accept_credit_note\":null},\"seller_reputation\":{\"level_id\":null,\"power_seller_status\":null,\"transactions\":{\"canceled\":0,\"completed\":1,\"period\":\"historic\",\"ratings\":{\"negative\":0,\"neutral\":1,\"positive\":0},\"total\":1},\"metrics\":{\"sales\":{\"period\":\"365 days\",\"completed\":1},\"claims\":{\"period\":\"365 days\",\"rate\":0,\"value\":0},\"delayed_handling_time\":{\"period\":\"365 days\",\"rate\":0,\"value\":0},\"cancellations\":{\"period\":\"365 days\",\"rate\":0,\"value\":0}}},\"buyer_reputation\":{\"canceled_transactions\":0,\"tags\":null,\"transactions\":{\"canceled\":{\"paid\":null,\"total\":null},\"completed\":null,\"not_yet_rated\":{\"paid\":null,\"total\":null,\"units\":null},\"period\":\"\",\"total\":null,\"unrated\":{\"paid\":null,\"total\":null}}},\"status\":{\"billing\":{\"allow\":true,\"codes\":[]},\"buy\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"confirmed_email\":false,\"shopping_cart\":{\"buy\":\"allowed\",\"sell\":\"allowed\"},\"immediate_payment\":false,\"list\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"mercadoenvios\":\"not_accepted\",\"mercadopago_account_type\":\"personal\",\"mercadopago_tc_accepted\":true,\"required_action\":\"\",\"sell\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"site_status\":\"active\",\"user_type\":null},\"company\":{\"brand_name\":null,\"city_tax_id\":\"\",\"corporate_name\":\"\",\"identification\":\"\",\"state_tax_id\":\"\",\"cust_type_id\":\"CO\",\"soft_descriptor\":null},\"credit\":{\"consumed\":0,\"credit_level_id\":\"MLM5\",\"rank\":\"payer\"},\"context\":{},\"thumbnail\":{\"picture_id\":\"683224-MLA74064295113_012024\",\"picture_url\":\"https://mla-s1-p.mlstatic.com/683224-MLA74064295113_012024-O.jpg\"},\"registration_identifiers\":[]}', '2024-01-25 04:04:10', '2024-01-25 04:04:10'),
('VHIO92beCnoYtVLGg10vLDjyRFw-dMPH', '2024-01-08 08:56:48', '{\"id\":1489297309,\"nickname\":\"TESTUSER1595512342\",\"registration_date\":\"2023-09-25T02:12:41.191-04:00\",\"first_name\":\"Test\",\"last_name\":\"Test\",\"gender\":\"\",\"country_id\":\"MX\",\"email\":\"test_user_1595512342@testuser.com\",\"identification\":{\"number\":\"aaaaaa11111111a111\",\"type\":\"IFE\"},\"address\":{\"address\":\"Calle Ciprés 1648\",\"city\":\"Guadalajara\",\"state\":\"MX-JAL\",\"zip_code\":\"44900\"},\"phone\":{\"area_code\":\"01\",\"extension\":\"\",\"number\":\"1111-1111\",\"verified\":false},\"alternative_phone\":{\"area_code\":\"\",\"extension\":\"\",\"number\":\"\"},\"user_type\":\"normal\",\"tags\":[\"test_user\",\"normal\"],\"logo\":null,\"points\":0,\"site_id\":\"MLM\",\"permalink\":\"http://perfil.mercadolibre.com.mx/TESTUSER1595512342\",\"seller_experience\":\"NEWBIE\",\"bill_data\":{\"accept_credit_note\":null},\"seller_reputation\":{\"level_id\":\"1_red\",\"power_seller_status\":null,\"transactions\":{\"canceled\":5,\"completed\":11,\"period\":\"historic\",\"ratings\":{\"negative\":0,\"neutral\":1,\"positive\":0},\"total\":16},\"metrics\":{\"sales\":{\"period\":\"365 days\",\"completed\":11},\"claims\":{\"period\":\"365 days\",\"rate\":0,\"value\":0},\"delayed_handling_time\":{\"period\":\"365 days\",\"rate\":1,\"value\":9},\"cancellations\":{\"period\":\"365 days\",\"rate\":0,\"value\":0}}},\"buyer_reputation\":{\"canceled_transactions\":0,\"tags\":null,\"transactions\":{\"canceled\":{\"paid\":null,\"total\":null},\"completed\":null,\"not_yet_rated\":{\"paid\":null,\"total\":null,\"units\":null},\"period\":\"\",\"total\":null,\"unrated\":{\"paid\":null,\"total\":null}}},\"status\":{\"billing\":{\"allow\":true,\"codes\":[]},\"buy\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"confirmed_email\":true,\"shopping_cart\":{\"buy\":\"allowed\",\"sell\":\"allowed\"},\"immediate_payment\":false,\"list\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"mercadoenvios\":\"not_accepted\",\"mercadopago_account_type\":\"personal\",\"mercadopago_tc_accepted\":true,\"required_action\":\"\",\"sell\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[\"low_seller_reputation\"],\"required\":true}},\"site_status\":\"active\",\"user_type\":null},\"company\":{\"brand_name\":null,\"city_tax_id\":\"\",\"corporate_name\":\"\",\"identification\":\"\",\"state_tax_id\":\"\",\"cust_type_id\":\"CO\",\"soft_descriptor\":null},\"credit\":{\"consumed\":0,\"credit_level_id\":\"MLM5\",\"rank\":\"payer\"},\"context\":{},\"thumbnail\":{\"picture_id\":\"849459-MLA72972708517_112023\",\"picture_url\":\"https://mla-s2-p.mlstatic.com/849459-MLA72972708517_112023-O.jpg\"},\"registration_identifiers\":[]}', '2024-01-08 02:56:48', '2024-01-08 02:56:48'),
('zmg00qpFGfeciKX8lopLojfl40q8QXAa', '2024-01-05 08:31:36', '{\"id\":1489297309,\"nickname\":\"TESTUSER1595512342\",\"registration_date\":\"2023-09-25T02:12:41.191-04:00\",\"first_name\":\"Test\",\"last_name\":\"Test\",\"gender\":\"\",\"country_id\":\"MX\",\"email\":\"test_user_1595512342@testuser.com\",\"identification\":{\"number\":\"aaaaaa11111111a111\",\"type\":\"IFE\"},\"address\":{\"address\":\"Calle Ciprés 1648\",\"city\":\"Guadalajara\",\"state\":\"MX-JAL\",\"zip_code\":\"44900\"},\"phone\":{\"area_code\":\"01\",\"extension\":\"\",\"number\":\"1111-1111\",\"verified\":false},\"alternative_phone\":{\"area_code\":\"\",\"extension\":\"\",\"number\":\"\"},\"user_type\":\"normal\",\"tags\":[\"test_user\",\"normal\"],\"logo\":null,\"points\":0,\"site_id\":\"MLM\",\"permalink\":\"http://perfil.mercadolibre.com.mx/TESTUSER1595512342\",\"seller_experience\":\"NEWBIE\",\"bill_data\":{\"accept_credit_note\":null},\"seller_reputation\":{\"level_id\":\"1_red\",\"power_seller_status\":null,\"transactions\":{\"canceled\":5,\"completed\":11,\"period\":\"historic\",\"ratings\":{\"negative\":0,\"neutral\":1,\"positive\":0},\"total\":16},\"metrics\":{\"sales\":{\"period\":\"365 days\",\"completed\":11},\"claims\":{\"period\":\"365 days\",\"rate\":0,\"value\":0},\"delayed_handling_time\":{\"period\":\"365 days\",\"rate\":0.8888,\"value\":8},\"cancellations\":{\"period\":\"365 days\",\"rate\":0,\"value\":0}}},\"buyer_reputation\":{\"canceled_transactions\":0,\"tags\":null,\"transactions\":{\"canceled\":{\"paid\":null,\"total\":null},\"completed\":null,\"not_yet_rated\":{\"paid\":null,\"total\":null,\"units\":null},\"period\":\"\",\"total\":null,\"unrated\":{\"paid\":null,\"total\":null}}},\"status\":{\"billing\":{\"allow\":true,\"codes\":[]},\"buy\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"confirmed_email\":true,\"shopping_cart\":{\"buy\":\"allowed\",\"sell\":\"allowed\"},\"immediate_payment\":false,\"list\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"mercadoenvios\":\"not_accepted\",\"mercadopago_account_type\":\"personal\",\"mercadopago_tc_accepted\":true,\"required_action\":\"\",\"sell\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[\"low_seller_reputation\"],\"required\":true}},\"site_status\":\"active\",\"user_type\":null},\"company\":{\"brand_name\":null,\"city_tax_id\":\"\",\"corporate_name\":\"\",\"identification\":\"\",\"state_tax_id\":\"\",\"cust_type_id\":\"CO\",\"soft_descriptor\":null},\"credit\":{\"consumed\":0,\"credit_level_id\":\"MLM5\",\"rank\":\"payer\"},\"context\":{},\"thumbnail\":{\"picture_id\":\"849459-MLA72972708517_112023\",\"picture_url\":\"https://mla-s2-p.mlstatic.com/849459-MLA72972708517_112023-O.jpg\"},\"registration_identifiers\":[]}', '2024-01-05 02:31:36', '2024-01-05 02:31:36');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `user_type_id` int(11) NOT NULL,
  `nickname` varchar(20) DEFAULT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `user_type_id`, `nickname`, `email`) VALUES
(1, 1, 'root', 'root@root.com'),
(1643952570, 2, 'TESTUSER1318589997', 'test_user_1318589997@testuser.com');

-- --------------------------------------------------------

--
-- Table structure for table `user_type`
--

CREATE TABLE `user_type` (
  `id` int(11) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_type`
--

INSERT INTO `user_type` (`id`, `role`, `name`, `description`) VALUES
(1, 'admin', 'Administrador', 'Este rol es el de mayor jerarquia, tienes que tener cuidado con los permisos que le das a este rol'),
(2, 'seller', 'Vendedor', 'El usuario con este rol puede crear productos, editarlos y eliminarlos.'),
(3, 'designer', 'Diseñador', 'El usuario con este rol puede crear diseños, editarlos y eliminarlos.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers_auto_general`
--
ALTER TABLE `answers_auto_general`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_answers_auto_type` (`type`),
  ADD KEY `fk_answers_auto_user` (`user_id`);

--
-- Indexes for table `answers_quick`
--
ALTER TABLE `answers_quick`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_answers_user_id` (`user_id`);

--
-- Indexes for table `design`
--
ALTER TABLE `design`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_client_idd` (`fk_mlapp`),
  ADD KEY `fk_design_id` (`fk_design`);

--
-- Indexes for table `mercadolibre_app`
--
ALTER TABLE `mercadolibre_app`
  ADD PRIMARY KEY (`client_id`);

--
-- Indexes for table `mercadolibre_auth`
--
ALTER TABLE `mercadolibre_auth`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_product_id` (`fk_product_id`),
  ADD KEY `fk_message_id` (`type`);

--
-- Indexes for table `message_relevant`
--
ALTER TABLE `message_relevant`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_message_relevant_user_id` (`user_id`);

--
-- Indexes for table `message_type`
--
ALTER TABLE `message_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_type_id` (`user_type_id`);

--
-- Indexes for table `user_type`
--
ALTER TABLE `user_type`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answers_auto_general`
--
ALTER TABLE `answers_auto_general`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `answers_quick`
--
ALTER TABLE `answers_quick`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `design`
--
ALTER TABLE `design`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `mercadolibre_auth`
--
ALTER TABLE `mercadolibre_auth`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1643952571;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `message_type`
--
ALTER TABLE `message_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_type`
--
ALTER TABLE `user_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answers_auto_general`
--
ALTER TABLE `answers_auto_general`
  ADD CONSTRAINT `fk_answers_auto_type` FOREIGN KEY (`type`) REFERENCES `message_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_answers_auto_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `answers_quick`
--
ALTER TABLE `answers_quick`
  ADD CONSTRAINT `fk_answers_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `fk_client_idd` FOREIGN KEY (`fk_mlapp`) REFERENCES `mercadolibre_app` (`client_id`),
  ADD CONSTRAINT `fk_design_id` FOREIGN KEY (`fk_design`) REFERENCES `design` (`id`);

--
-- Constraints for table `mercadolibre_auth`
--
ALTER TABLE `mercadolibre_auth`
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `fk_message_id` FOREIGN KEY (`type`) REFERENCES `message_type` (`id`);

--
-- Constraints for table `message_relevant`
--
ALTER TABLE `message_relevant`
  ADD CONSTRAINT `fk_message_relevant_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_user_type_id` FOREIGN KEY (`user_type_id`) REFERENCES `user_type` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
