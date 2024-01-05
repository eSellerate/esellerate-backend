-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 03, 2024 at 07:52 PM
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
('8718501371894373', 'JUHrlLB1MUDqqVzQP9huRMT3XmuZ488u', 'https://localhost:5173/');

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
(1489297309, 'APP_USR-8718501371894373-010314-e6691ea85dc2f0a6ea802ddf5fa64ac3-1489297309', 'TG-6595a954ad0f390001b03272-1489297309'),
(1547330804, 'APP_USR-8718501371894373-010311-46ac34df26ce0766b879ff306ec70703-1547330804', 'TG-65957dfb8541a10001436843-1547330804');

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
('-hudSysGgUT1cWpD4rxIwuXVduyUs7WX', '2024-01-03 21:32:12', '{\"id\":1547330804,\"nickname\":\"TESTUSER1722269484\",\"registration_date\":\"2023-11-12T21:22:31.485-04:00\",\"first_name\":\"Test\",\"last_name\":\"Test\",\"gender\":\"\",\"country_id\":\"MX\",\"email\":\"test_user_1722269484@testuser.com\",\"identification\":{\"number\":\"aaaaaa11111111a111\",\"type\":\"IFE\"},\"address\":{\"address\":\"Test Address 123\",\"city\":\"Ciudad de Mexico\",\"state\":\"MX-DIF\",\"zip_code\":\"2153\"},\"phone\":{\"area_code\":\"01\",\"extension\":\"\",\"number\":\"1111-1111\",\"verified\":false},\"alternative_phone\":{\"area_code\":\"\",\"extension\":\"\",\"number\":\"\"},\"user_type\":\"normal\",\"tags\":[\"test_user\",\"normal\"],\"logo\":null,\"points\":0,\"site_id\":\"MLM\",\"permalink\":\"http://perfil.mercadolibre.com.mx/TESTUSER1722269484\",\"seller_experience\":\"NEWBIE\",\"bill_data\":{\"accept_credit_note\":null},\"seller_reputation\":{\"level_id\":null,\"power_seller_status\":null,\"transactions\":{\"canceled\":0,\"completed\":0,\"period\":\"historic\",\"ratings\":{\"negative\":0,\"neutral\":0,\"positive\":0},\"total\":0},\"metrics\":{\"sales\":{\"period\":null,\"completed\":0},\"claims\":{\"period\":\"60 months\",\"rate\":0,\"value\":0},\"delayed_handling_time\":{\"period\":\"60 months\",\"rate\":0,\"value\":0},\"cancellations\":{\"period\":\"60 months\",\"rate\":0,\"value\":0}}},\"buyer_reputation\":{\"canceled_transactions\":0,\"tags\":null,\"transactions\":{\"canceled\":{\"paid\":null,\"total\":null},\"completed\":null,\"not_yet_rated\":{\"paid\":null,\"total\":null,\"units\":null},\"period\":\"\",\"total\":null,\"unrated\":{\"paid\":null,\"total\":null}}},\"status\":{\"billing\":{\"allow\":true,\"codes\":[]},\"buy\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"confirmed_email\":false,\"shopping_cart\":{\"buy\":\"allowed\",\"sell\":\"allowed\"},\"immediate_payment\":false,\"list\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"mercadoenvios\":\"not_accepted\",\"mercadopago_account_type\":\"personal\",\"mercadopago_tc_accepted\":true,\"required_action\":\"\",\"sell\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"site_status\":\"active\",\"user_type\":null},\"company\":{\"brand_name\":null,\"city_tax_id\":\"\",\"corporate_name\":\"\",\"identification\":\"\",\"state_tax_id\":\"\",\"cust_type_id\":\"CO\",\"soft_descriptor\":null},\"credit\":{\"consumed\":0,\"credit_level_id\":\"MLM5\",\"rank\":\"newbie\"},\"context\":{},\"registration_identifiers\":[]}', '2024-01-03 15:32:12', '2024-01-03 15:32:12'),
('9qDYgJVhvhDXgjrFncD-jt5vbingJJDH', '2024-01-03 01:10:29', '{\"id\":1489297309,\"nickname\":\"TESTUSER1595512342\",\"registration_date\":\"2023-09-25T02:12:41.191-04:00\",\"first_name\":\"Test\",\"last_name\":\"Test\",\"gender\":\"\",\"country_id\":\"MX\",\"email\":\"test_user_1595512342@testuser.com\",\"identification\":{\"number\":\"aaaaaa11111111a111\",\"type\":\"IFE\"},\"address\":{\"address\":\"Calle Ciprés 1648\",\"city\":\"Guadalajara\",\"state\":\"MX-JAL\",\"zip_code\":\"44900\"},\"phone\":{\"area_code\":\"01\",\"extension\":\"\",\"number\":\"1111-1111\",\"verified\":false},\"alternative_phone\":{\"area_code\":\"\",\"extension\":\"\",\"number\":\"\"},\"user_type\":\"normal\",\"tags\":[\"test_user\",\"normal\"],\"logo\":null,\"points\":0,\"site_id\":\"MLM\",\"permalink\":\"http://perfil.mercadolibre.com.mx/TESTUSER1595512342\",\"seller_experience\":\"NEWBIE\",\"bill_data\":{\"accept_credit_note\":null},\"seller_reputation\":{\"level_id\":\"1_red\",\"power_seller_status\":null,\"transactions\":{\"canceled\":4,\"completed\":10,\"period\":\"historic\",\"ratings\":{\"negative\":0,\"neutral\":1,\"positive\":0},\"total\":14},\"metrics\":{\"sales\":{\"period\":\"365 days\",\"completed\":10},\"claims\":{\"period\":\"365 days\",\"rate\":0,\"value\":0},\"delayed_handling_time\":{\"period\":\"365 days\",\"rate\":1,\"value\":8},\"cancellations\":{\"period\":\"365 days\",\"rate\":0,\"value\":0}}},\"buyer_reputation\":{\"canceled_transactions\":0,\"tags\":null,\"transactions\":{\"canceled\":{\"paid\":null,\"total\":null},\"completed\":null,\"not_yet_rated\":{\"paid\":null,\"total\":null,\"units\":null},\"period\":\"\",\"total\":null,\"unrated\":{\"paid\":null,\"total\":null}}},\"status\":{\"billing\":{\"allow\":true,\"codes\":[]},\"buy\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"confirmed_email\":true,\"shopping_cart\":{\"buy\":\"allowed\",\"sell\":\"allowed\"},\"immediate_payment\":false,\"list\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"mercadoenvios\":\"not_accepted\",\"mercadopago_account_type\":\"personal\",\"mercadopago_tc_accepted\":true,\"required_action\":\"\",\"sell\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[\"low_seller_reputation\"],\"required\":true}},\"site_status\":\"active\",\"user_type\":null},\"company\":{\"brand_name\":null,\"city_tax_id\":\"\",\"corporate_name\":\"\",\"identification\":\"\",\"state_tax_id\":\"\",\"cust_type_id\":\"CO\",\"soft_descriptor\":null},\"credit\":{\"consumed\":0,\"credit_level_id\":\"MLM5\",\"rank\":\"payer\"},\"context\":{},\"thumbnail\":{\"picture_id\":\"849459-MLA72972708517_112023\",\"picture_url\":\"https://mla-s2-p.mlstatic.com/849459-MLA72972708517_112023-O.jpg\"},\"registration_identifiers\":[]}', '2024-01-02 19:10:29', '2024-01-02 19:10:29'),
('gGhT_HL2f_o-bEtA56xv_f82iGb8HYtB', '2024-01-03 09:06:00', '{\"id\":1489297309,\"nickname\":\"TESTUSER1595512342\",\"registration_date\":\"2023-09-25T02:12:41.191-04:00\",\"first_name\":\"Test\",\"last_name\":\"Test\",\"gender\":\"\",\"country_id\":\"MX\",\"email\":\"test_user_1595512342@testuser.com\",\"identification\":{\"number\":\"aaaaaa11111111a111\",\"type\":\"IFE\"},\"address\":{\"address\":\"Calle Ciprés 1648\",\"city\":\"Guadalajara\",\"state\":\"MX-JAL\",\"zip_code\":\"44900\"},\"phone\":{\"area_code\":\"01\",\"extension\":\"\",\"number\":\"1111-1111\",\"verified\":false},\"alternative_phone\":{\"area_code\":\"\",\"extension\":\"\",\"number\":\"\"},\"user_type\":\"normal\",\"tags\":[\"test_user\",\"normal\"],\"logo\":null,\"points\":0,\"site_id\":\"MLM\",\"permalink\":\"http://perfil.mercadolibre.com.mx/TESTUSER1595512342\",\"seller_experience\":\"NEWBIE\",\"bill_data\":{\"accept_credit_note\":null},\"seller_reputation\":{\"level_id\":\"1_red\",\"power_seller_status\":null,\"transactions\":{\"canceled\":4,\"completed\":11,\"period\":\"historic\",\"ratings\":{\"negative\":0,\"neutral\":1,\"positive\":0},\"total\":15},\"metrics\":{\"sales\":{\"period\":\"365 days\",\"completed\":11},\"claims\":{\"period\":\"365 days\",\"rate\":0,\"value\":0},\"delayed_handling_time\":{\"period\":\"365 days\",\"rate\":0.8888,\"value\":8},\"cancellations\":{\"period\":\"365 days\",\"rate\":0,\"value\":0}}},\"buyer_reputation\":{\"canceled_transactions\":0,\"tags\":null,\"transactions\":{\"canceled\":{\"paid\":null,\"total\":null},\"completed\":null,\"not_yet_rated\":{\"paid\":null,\"total\":null,\"units\":null},\"period\":\"\",\"total\":null,\"unrated\":{\"paid\":null,\"total\":null}}},\"status\":{\"billing\":{\"allow\":true,\"codes\":[]},\"buy\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"confirmed_email\":true,\"shopping_cart\":{\"buy\":\"allowed\",\"sell\":\"allowed\"},\"immediate_payment\":false,\"list\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"mercadoenvios\":\"not_accepted\",\"mercadopago_account_type\":\"personal\",\"mercadopago_tc_accepted\":true,\"required_action\":\"\",\"sell\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[\"low_seller_reputation\"],\"required\":true}},\"site_status\":\"active\",\"user_type\":null},\"company\":{\"brand_name\":null,\"city_tax_id\":\"\",\"corporate_name\":\"\",\"identification\":\"\",\"state_tax_id\":\"\",\"cust_type_id\":\"CO\",\"soft_descriptor\":null},\"credit\":{\"consumed\":0,\"credit_level_id\":\"MLM5\",\"rank\":\"payer\"},\"context\":{},\"thumbnail\":{\"picture_id\":\"849459-MLA72972708517_112023\",\"picture_url\":\"https://mla-s2-p.mlstatic.com/849459-MLA72972708517_112023-O.jpg\"},\"registration_identifiers\":[]}', '2024-01-03 03:06:00', '2024-01-03 03:06:00'),
('KiOTHS7LnF2TFE7tlv4Mir1-0jzh36Dq', '2024-01-03 23:37:27', '{\"id\":1489297309,\"nickname\":\"TESTUSER1595512342\",\"registration_date\":\"2023-09-25T02:12:41.191-04:00\",\"first_name\":\"Test\",\"last_name\":\"Test\",\"gender\":\"\",\"country_id\":\"MX\",\"email\":\"test_user_1595512342@testuser.com\",\"identification\":{\"number\":\"aaaaaa11111111a111\",\"type\":\"IFE\"},\"address\":{\"address\":\"Calle Ciprés 1648\",\"city\":\"Guadalajara\",\"state\":\"MX-JAL\",\"zip_code\":\"44900\"},\"phone\":{\"area_code\":\"01\",\"extension\":\"\",\"number\":\"1111-1111\",\"verified\":false},\"alternative_phone\":{\"area_code\":\"\",\"extension\":\"\",\"number\":\"\"},\"user_type\":\"normal\",\"tags\":[\"test_user\",\"normal\"],\"logo\":null,\"points\":0,\"site_id\":\"MLM\",\"permalink\":\"http://perfil.mercadolibre.com.mx/TESTUSER1595512342\",\"seller_experience\":\"NEWBIE\",\"bill_data\":{\"accept_credit_note\":null},\"seller_reputation\":{\"level_id\":\"1_red\",\"power_seller_status\":null,\"transactions\":{\"canceled\":5,\"completed\":11,\"period\":\"historic\",\"ratings\":{\"negative\":0,\"neutral\":1,\"positive\":0},\"total\":16},\"metrics\":{\"sales\":{\"period\":\"365 days\",\"completed\":11},\"claims\":{\"period\":\"365 days\",\"rate\":0,\"value\":0},\"delayed_handling_time\":{\"period\":\"365 days\",\"rate\":0.8888,\"value\":8},\"cancellations\":{\"period\":\"365 days\",\"rate\":0,\"value\":0}}},\"buyer_reputation\":{\"canceled_transactions\":0,\"tags\":null,\"transactions\":{\"canceled\":{\"paid\":null,\"total\":null},\"completed\":null,\"not_yet_rated\":{\"paid\":null,\"total\":null,\"units\":null},\"period\":\"\",\"total\":null,\"unrated\":{\"paid\":null,\"total\":null}}},\"status\":{\"billing\":{\"allow\":true,\"codes\":[]},\"buy\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"confirmed_email\":true,\"shopping_cart\":{\"buy\":\"allowed\",\"sell\":\"allowed\"},\"immediate_payment\":false,\"list\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"mercadoenvios\":\"not_accepted\",\"mercadopago_account_type\":\"personal\",\"mercadopago_tc_accepted\":true,\"required_action\":\"\",\"sell\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[\"low_seller_reputation\"],\"required\":true}},\"site_status\":\"active\",\"user_type\":null},\"company\":{\"brand_name\":null,\"city_tax_id\":\"\",\"corporate_name\":\"\",\"identification\":\"\",\"state_tax_id\":\"\",\"cust_type_id\":\"CO\",\"soft_descriptor\":null},\"credit\":{\"consumed\":0,\"credit_level_id\":\"MLM5\",\"rank\":\"payer\"},\"context\":{},\"thumbnail\":{\"picture_id\":\"849459-MLA72972708517_112023\",\"picture_url\":\"https://mla-s2-p.mlstatic.com/849459-MLA72972708517_112023-O.jpg\"},\"registration_identifiers\":[]}', '2024-01-03 17:37:27', '2024-01-03 17:37:27'),
('n8XDr0osOIpaVYSaPX-k5fjfhPFy1kF_', '2024-01-04 00:37:08', '{\"id\":1489297309,\"nickname\":\"TESTUSER1595512342\",\"registration_date\":\"2023-09-25T02:12:41.191-04:00\",\"first_name\":\"Test\",\"last_name\":\"Test\",\"gender\":\"\",\"country_id\":\"MX\",\"email\":\"test_user_1595512342@testuser.com\",\"identification\":{\"number\":\"aaaaaa11111111a111\",\"type\":\"IFE\"},\"address\":{\"address\":\"Calle Ciprés 1648\",\"city\":\"Guadalajara\",\"state\":\"MX-JAL\",\"zip_code\":\"44900\"},\"phone\":{\"area_code\":\"01\",\"extension\":\"\",\"number\":\"1111-1111\",\"verified\":false},\"alternative_phone\":{\"area_code\":\"\",\"extension\":\"\",\"number\":\"\"},\"user_type\":\"normal\",\"tags\":[\"test_user\",\"normal\"],\"logo\":null,\"points\":0,\"site_id\":\"MLM\",\"permalink\":\"http://perfil.mercadolibre.com.mx/TESTUSER1595512342\",\"seller_experience\":\"NEWBIE\",\"bill_data\":{\"accept_credit_note\":null},\"seller_reputation\":{\"level_id\":\"1_red\",\"power_seller_status\":null,\"transactions\":{\"canceled\":5,\"completed\":11,\"period\":\"historic\",\"ratings\":{\"negative\":0,\"neutral\":1,\"positive\":0},\"total\":16},\"metrics\":{\"sales\":{\"period\":\"365 days\",\"completed\":11},\"claims\":{\"period\":\"365 days\",\"rate\":0,\"value\":0},\"delayed_handling_time\":{\"period\":\"365 days\",\"rate\":0.8888,\"value\":8},\"cancellations\":{\"period\":\"365 days\",\"rate\":0,\"value\":0}}},\"buyer_reputation\":{\"canceled_transactions\":0,\"tags\":null,\"transactions\":{\"canceled\":{\"paid\":null,\"total\":null},\"completed\":null,\"not_yet_rated\":{\"paid\":null,\"total\":null,\"units\":null},\"period\":\"\",\"total\":null,\"unrated\":{\"paid\":null,\"total\":null}}},\"status\":{\"billing\":{\"allow\":true,\"codes\":[]},\"buy\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"confirmed_email\":true,\"shopping_cart\":{\"buy\":\"allowed\",\"sell\":\"allowed\"},\"immediate_payment\":false,\"list\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"mercadoenvios\":\"not_accepted\",\"mercadopago_account_type\":\"personal\",\"mercadopago_tc_accepted\":true,\"required_action\":\"\",\"sell\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[\"low_seller_reputation\"],\"required\":true}},\"site_status\":\"active\",\"user_type\":null},\"company\":{\"brand_name\":null,\"city_tax_id\":\"\",\"corporate_name\":\"\",\"identification\":\"\",\"state_tax_id\":\"\",\"cust_type_id\":\"CO\",\"soft_descriptor\":null},\"credit\":{\"consumed\":0,\"credit_level_id\":\"MLM5\",\"rank\":\"payer\"},\"context\":{},\"thumbnail\":{\"picture_id\":\"849459-MLA72972708517_112023\",\"picture_url\":\"https://mla-s2-p.mlstatic.com/849459-MLA72972708517_112023-O.jpg\"},\"registration_identifiers\":[]}', '2024-01-03 18:37:08', '2024-01-03 18:37:08'),
('qhELpzpEOFSyMGXKGZtQKbgQwflwxKGv', '2024-01-03 21:34:44', '{\"id\":1489297309,\"nickname\":\"TESTUSER1595512342\",\"registration_date\":\"2023-09-25T02:12:41.191-04:00\",\"first_name\":\"Test\",\"last_name\":\"Test\",\"gender\":\"\",\"country_id\":\"MX\",\"email\":\"test_user_1595512342@testuser.com\",\"identification\":{\"number\":\"aaaaaa11111111a111\",\"type\":\"IFE\"},\"address\":{\"address\":\"Calle Ciprés 1648\",\"city\":\"Guadalajara\",\"state\":\"MX-JAL\",\"zip_code\":\"44900\"},\"phone\":{\"area_code\":\"01\",\"extension\":\"\",\"number\":\"1111-1111\",\"verified\":false},\"alternative_phone\":{\"area_code\":\"\",\"extension\":\"\",\"number\":\"\"},\"user_type\":\"normal\",\"tags\":[\"test_user\",\"normal\"],\"logo\":null,\"points\":0,\"site_id\":\"MLM\",\"permalink\":\"http://perfil.mercadolibre.com.mx/TESTUSER1595512342\",\"seller_experience\":\"NEWBIE\",\"bill_data\":{\"accept_credit_note\":null},\"seller_reputation\":{\"level_id\":\"1_red\",\"power_seller_status\":null,\"transactions\":{\"canceled\":5,\"completed\":11,\"period\":\"historic\",\"ratings\":{\"negative\":0,\"neutral\":1,\"positive\":0},\"total\":16},\"metrics\":{\"sales\":{\"period\":\"365 days\",\"completed\":11},\"claims\":{\"period\":\"365 days\",\"rate\":0,\"value\":0},\"delayed_handling_time\":{\"period\":\"365 days\",\"rate\":0.8888,\"value\":8},\"cancellations\":{\"period\":\"365 days\",\"rate\":0,\"value\":0}}},\"buyer_reputation\":{\"canceled_transactions\":0,\"tags\":null,\"transactions\":{\"canceled\":{\"paid\":null,\"total\":null},\"completed\":null,\"not_yet_rated\":{\"paid\":null,\"total\":null,\"units\":null},\"period\":\"\",\"total\":null,\"unrated\":{\"paid\":null,\"total\":null}}},\"status\":{\"billing\":{\"allow\":true,\"codes\":[]},\"buy\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"confirmed_email\":true,\"shopping_cart\":{\"buy\":\"allowed\",\"sell\":\"allowed\"},\"immediate_payment\":false,\"list\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"mercadoenvios\":\"not_accepted\",\"mercadopago_account_type\":\"personal\",\"mercadopago_tc_accepted\":true,\"required_action\":\"\",\"sell\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[\"low_seller_reputation\"],\"required\":true}},\"site_status\":\"active\",\"user_type\":null},\"company\":{\"brand_name\":null,\"city_tax_id\":\"\",\"corporate_name\":\"\",\"identification\":\"\",\"state_tax_id\":\"\",\"cust_type_id\":\"CO\",\"soft_descriptor\":null},\"credit\":{\"consumed\":0,\"credit_level_id\":\"MLM5\",\"rank\":\"payer\"},\"context\":{},\"thumbnail\":{\"picture_id\":\"849459-MLA72972708517_112023\",\"picture_url\":\"https://mla-s2-p.mlstatic.com/849459-MLA72972708517_112023-O.jpg\"},\"registration_identifiers\":[]}', '2024-01-03 15:34:44', '2024-01-03 15:34:44'),
('sjxgH1Rhm4f2dFxNWZYTYY8uY5VWKISJ', '2024-01-03 22:06:39', '{\"id\":1489297309,\"nickname\":\"TESTUSER1595512342\",\"registration_date\":\"2023-09-25T02:12:41.191-04:00\",\"first_name\":\"Test\",\"last_name\":\"Test\",\"gender\":\"\",\"country_id\":\"MX\",\"email\":\"test_user_1595512342@testuser.com\",\"identification\":{\"number\":\"aaaaaa11111111a111\",\"type\":\"IFE\"},\"address\":{\"address\":\"Calle Ciprés 1648\",\"city\":\"Guadalajara\",\"state\":\"MX-JAL\",\"zip_code\":\"44900\"},\"phone\":{\"area_code\":\"01\",\"extension\":\"\",\"number\":\"1111-1111\",\"verified\":false},\"alternative_phone\":{\"area_code\":\"\",\"extension\":\"\",\"number\":\"\"},\"user_type\":\"normal\",\"tags\":[\"test_user\",\"normal\"],\"logo\":null,\"points\":0,\"site_id\":\"MLM\",\"permalink\":\"http://perfil.mercadolibre.com.mx/TESTUSER1595512342\",\"seller_experience\":\"NEWBIE\",\"bill_data\":{\"accept_credit_note\":null},\"seller_reputation\":{\"level_id\":\"1_red\",\"power_seller_status\":null,\"transactions\":{\"canceled\":5,\"completed\":11,\"period\":\"historic\",\"ratings\":{\"negative\":0,\"neutral\":1,\"positive\":0},\"total\":16},\"metrics\":{\"sales\":{\"period\":\"365 days\",\"completed\":11},\"claims\":{\"period\":\"365 days\",\"rate\":0,\"value\":0},\"delayed_handling_time\":{\"period\":\"365 days\",\"rate\":0.8888,\"value\":8},\"cancellations\":{\"period\":\"365 days\",\"rate\":0,\"value\":0}}},\"buyer_reputation\":{\"canceled_transactions\":0,\"tags\":null,\"transactions\":{\"canceled\":{\"paid\":null,\"total\":null},\"completed\":null,\"not_yet_rated\":{\"paid\":null,\"total\":null,\"units\":null},\"period\":\"\",\"total\":null,\"unrated\":{\"paid\":null,\"total\":null}}},\"status\":{\"billing\":{\"allow\":true,\"codes\":[]},\"buy\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"confirmed_email\":true,\"shopping_cart\":{\"buy\":\"allowed\",\"sell\":\"allowed\"},\"immediate_payment\":false,\"list\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"mercadoenvios\":\"not_accepted\",\"mercadopago_account_type\":\"personal\",\"mercadopago_tc_accepted\":true,\"required_action\":\"\",\"sell\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[\"low_seller_reputation\"],\"required\":true}},\"site_status\":\"active\",\"user_type\":null},\"company\":{\"brand_name\":null,\"city_tax_id\":\"\",\"corporate_name\":\"\",\"identification\":\"\",\"state_tax_id\":\"\",\"cust_type_id\":\"CO\",\"soft_descriptor\":null},\"credit\":{\"consumed\":0,\"credit_level_id\":\"MLM5\",\"rank\":\"payer\"},\"context\":{},\"thumbnail\":{\"picture_id\":\"849459-MLA72972708517_112023\",\"picture_url\":\"https://mla-s2-p.mlstatic.com/849459-MLA72972708517_112023-O.jpg\"},\"registration_identifiers\":[]}', '2024-01-03 16:06:39', '2024-01-03 16:06:39'),
('wjNmRFazavqD7pqQo1A1guz6HaV71PTF', '2024-01-03 15:51:19', '{\"id\":1489297309,\"nickname\":\"TESTUSER1595512342\",\"registration_date\":\"2023-09-25T02:12:41.191-04:00\",\"first_name\":\"Test\",\"last_name\":\"Test\",\"gender\":\"\",\"country_id\":\"MX\",\"email\":\"test_user_1595512342@testuser.com\",\"identification\":{\"number\":\"aaaaaa11111111a111\",\"type\":\"IFE\"},\"address\":{\"address\":\"Calle Ciprés 1648\",\"city\":\"Guadalajara\",\"state\":\"MX-JAL\",\"zip_code\":\"44900\"},\"phone\":{\"area_code\":\"01\",\"extension\":\"\",\"number\":\"1111-1111\",\"verified\":false},\"alternative_phone\":{\"area_code\":\"\",\"extension\":\"\",\"number\":\"\"},\"user_type\":\"normal\",\"tags\":[\"test_user\",\"normal\"],\"logo\":null,\"points\":0,\"site_id\":\"MLM\",\"permalink\":\"http://perfil.mercadolibre.com.mx/TESTUSER1595512342\",\"seller_experience\":\"NEWBIE\",\"bill_data\":{\"accept_credit_note\":null},\"seller_reputation\":{\"level_id\":\"1_red\",\"power_seller_status\":null,\"transactions\":{\"canceled\":5,\"completed\":10,\"period\":\"historic\",\"ratings\":{\"negative\":0,\"neutral\":1,\"positive\":0},\"total\":15},\"metrics\":{\"sales\":{\"period\":\"365 days\",\"completed\":10},\"claims\":{\"period\":\"365 days\",\"rate\":0,\"value\":0},\"delayed_handling_time\":{\"period\":\"365 days\",\"rate\":1,\"value\":8},\"cancellations\":{\"period\":\"365 days\",\"rate\":0,\"value\":0}}},\"buyer_reputation\":{\"canceled_transactions\":0,\"tags\":null,\"transactions\":{\"canceled\":{\"paid\":null,\"total\":null},\"completed\":null,\"not_yet_rated\":{\"paid\":null,\"total\":null,\"units\":null},\"period\":\"\",\"total\":null,\"unrated\":{\"paid\":null,\"total\":null}}},\"status\":{\"billing\":{\"allow\":true,\"codes\":[]},\"buy\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"confirmed_email\":true,\"shopping_cart\":{\"buy\":\"allowed\",\"sell\":\"allowed\"},\"immediate_payment\":false,\"list\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[],\"required\":false}},\"mercadoenvios\":\"not_accepted\",\"mercadopago_account_type\":\"personal\",\"mercadopago_tc_accepted\":true,\"required_action\":\"\",\"sell\":{\"allow\":true,\"codes\":[],\"immediate_payment\":{\"reasons\":[\"low_seller_reputation\"],\"required\":true}},\"site_status\":\"active\",\"user_type\":null},\"company\":{\"brand_name\":null,\"city_tax_id\":\"\",\"corporate_name\":\"\",\"identification\":\"\",\"state_tax_id\":\"\",\"cust_type_id\":\"CO\",\"soft_descriptor\":null},\"credit\":{\"consumed\":0,\"credit_level_id\":\"MLM5\",\"rank\":\"payer\"},\"context\":{},\"thumbnail\":{\"picture_id\":\"849459-MLA72972708517_112023\",\"picture_url\":\"https://mla-s2-p.mlstatic.com/849459-MLA72972708517_112023-O.jpg\"},\"registration_identifiers\":[]}', '2024-01-03 09:51:19', '2024-01-03 09:51:19');

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
(1489297309, 2, 'TESTUSER1595512342', 'test_user_1595512342@testuser.com'),
(1547330804, 2, 'TESTUSER1722269484', 'test_user_1722269484@testuser.com');

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
-- AUTO_INCREMENT for table `design`
--
ALTER TABLE `design`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `mercadolibre_auth`
--
ALTER TABLE `mercadolibre_auth`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1547330805;

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
-- Constraints for table `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `fk_client_idd` FOREIGN KEY (`fk_mlapp`) REFERENCES `mercadolibre_app` (`client_id`),
  ADD CONSTRAINT `fk_design_id` FOREIGN KEY (`fk_design`) REFERENCES `design` (`id`);

--
-- Constraints for table `mercadolibre_auth`
--
ALTER TABLE `mercadolibre_auth`
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`id`) REFERENCES `user` (`id`);

--
-- Constraints for table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `fk_message_id` FOREIGN KEY (`type`) REFERENCES `message_type` (`id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_user_type_id` FOREIGN KEY (`user_type_id`) REFERENCES `user_type` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
