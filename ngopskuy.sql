-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 15, 2022 at 08:45 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ngopskuy`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Coffee', '2022-03-11 19:49:46', '2022-03-13 22:50:29'),
(2, 'Non Coffee', '2022-03-11 19:49:46', '2022-03-13 22:50:46'),
(3, 'Food', '2022-03-11 20:52:21', '2022-03-13 22:49:38'),
(5, 'Add-on', '2022-03-13 22:50:02', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `delivery_type`
--

CREATE TABLE `delivery_type` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `delivery_type`
--

INSERT INTO `delivery_type` (`id`, `name`, `created_at`, `updated_at`) VALUES
(7, 'Delivery', '2022-03-10 14:08:36', NULL),
(8, 'Take Away', '2022-03-10 14:21:44', NULL),
(9, 'Dine in', '2022-03-14 17:46:46', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `otp`
--

CREATE TABLE `otp` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `id_otp_type` int(11) NOT NULL,
  `code` varchar(6) NOT NULL,
  `is_expired` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `otp`
--

INSERT INTO `otp` (`id`, `email`, `id_otp_type`, `code`, `is_expired`, `created_at`, `updated_at`) VALUES
(4, 'bisefeh455@toudrum.com', 1, '386412', 1, '2022-03-11 13:21:40', '2022-03-11 13:23:42'),
(10, 'bisefeh455@toudrum.com', 2, '172784', 1, '2022-03-11 13:50:15', '2022-03-11 13:53:44');

-- --------------------------------------------------------

--
-- Table structure for table `otp_type`
--

CREATE TABLE `otp_type` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `otp_type`
--

INSERT INTO `otp_type` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'verify user', '2022-03-11 13:03:56', '2022-03-11 06:03:45'),
(2, 'forgot password', '2022-03-11 13:03:56', '2022-03-11 06:03:45');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `id_category` int(11) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `delivery_hour_start` time NOT NULL,
  `delivery_hour_end` time NOT NULL,
  `image` text NOT NULL,
  `is_deleted` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `id_category`, `description`, `price`, `stock`, `delivery_hour_start`, `delivery_hour_end`, `image`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 'Kapal Api', 1, 'This is Kopi, Kapal Api', '15000.00', 5, '10:00:00', '23:00:00', '', 0, '2022-03-11 20:00:31', NULL),
(2, 'Choco Milkshake', 2, '100% non coffee choco shakers', '22000.00', 7, '10:00:00', '23:00:00', 'https://res.cloudinary.com/fazztrackfw5/image/upload/v1647001832/ngopskuy/uploads/product/product-1647001830490.png', 0, '2022-03-11 20:18:22', '2022-03-14 01:36:47'),
(3, 'Choco Milkshakes', 2, '100% non coffee choco shakers', '20000.00', 7, '10:00:00', '23:00:00', '', 1, '2022-03-11 20:19:27', '2022-03-11 20:48:11'),
(4, 'Choco Milkshakess', 2, '100% non coffee choco shakers', '20000.00', 7, '10:00:00', '23:00:00', '', 0, '2022-03-11 20:20:11', NULL),
(5, 'Choco Milkshakesss', 2, '100% non coffee choco shakers', '20000.00', 7, '10:00:00', '23:00:00', 'https://res.cloudinary.com/fazztrackfw5/image/upload/v1647001321/ngopskuy/uploads/product/product-1647001319431.png', 0, '2022-03-11 20:22:09', NULL),
(6, 'Choco Milkshakesss', 2, '100% non coffee choco shakers', '20000.00', 7, '10:00:00', '23:00:00', '', 0, '2022-03-13 14:29:03', NULL),
(7, 'Choco Milkshakesss', 2, '100% non coffee choco shakers', '20000.00', 7, '10:00:00', '23:00:00', '', 0, '2022-03-13 14:34:43', NULL),
(8, 'Choco Milkshakesss', 2, '100% non coffee choco shakers', '20000.00', 7, '10:00:00', '23:00:00', '', 0, '2022-03-13 14:34:53', NULL),
(9, 'Choco Milkshakesss', 2, '100% non coffee choco shakers', '20000.00', 7, '10:00:00', '23:00:00', '', 0, '2022-03-13 14:50:29', NULL),
(10, 'Choco Milkshakesss', 2, '100% non coffee choco shakers', '20000.00', 7, '10:00:00', '23:00:00', 'https://res.cloudinary.com/fazztrackfw5/image/upload/v1647154240/ngopskuy/uploads/product/product-1647154238488.png', 0, '2022-03-13 14:50:41', NULL),
(11, 'Choco Milkshakesss', 2, '100% non coffee choco shakers', '20000.00', 7, '10:00:00', '23:00:00', 'https://res.cloudinary.com/fazztrackfw5/image/upload/v1647154252/ngopskuy/uploads/product/product-1647154250086.png', 0, '2022-03-13 14:51:00', NULL),
(12, 'Choco Shakes', 2, 'Choco shaky, so sweet!', '22000.00', 10, '06:00:00', '19:00:00', 'https://res.cloudinary.com/fazztrackfw5/image/upload/v1647186077/ngopskuy/uploads/product/product-1647186074510.png', 0, '2022-03-13 23:41:24', NULL),
(13, 'French Fries', 3, 'Fried fries! Absolute crisp! Absolute tastiness!', '12000.00', 6, '08:00:00', '19:00:00', '', 0, '2022-03-14 17:28:19', NULL),
(14, 'French Fries Deluxe', 3, 'Fried fries! Absolute crisp! Absolute tastiness! 100% organic potatoes!', '18000.00', 6, '08:00:00', '19:00:00', '', 0, '2022-03-14 17:35:59', NULL),
(15, 'French Fries Deluxe', 3, 'Fried fries! Absolute crisp! Absolute tastiness! 100% organic potatoes!', '18000.00', 6, '08:00:00', '19:00:00', '', 0, '2022-03-14 17:37:10', NULL),
(16, 'French Fries Deluxe', 3, 'Fried fries! Absolute crisp! Absolute tastiness! 100% organic potatoes!', '18000.00', 6, '08:00:00', '19:00:00', '', 0, '2022-03-14 17:38:43', NULL),
(17, 'French Fries Deluxe', 3, 'Fried fries! Absolute crisp! Absolute tastiness! 100% organic potatoes!', '18000.00', 6, '08:00:00', '19:00:00', '', 0, '2022-03-14 17:39:43', NULL),
(18, 'French Fries Deluxe', 3, 'Fried fries! Absolute crisp! Absolute tastiness! 100% organic potatoes!', '18000.00', 6, '08:00:00', '19:00:00', '', 0, '2022-03-14 17:40:27', NULL),
(19, 'Scrambled Egg', 3, 'Fresh egg fried with our special spices!', '12000.00', 4, '06:00:00', '19:00:00', '', 0, '2022-03-14 17:53:58', NULL),
(20, 'Scrambled Egg', 3, 'Fresh egg fried with our special spices!', '12000.00', 4, '06:00:00', '19:00:00', '', 0, '2022-03-14 17:58:47', NULL),
(21, 'Scrambled Egg', 3, 'Fresh egg fried with our special spices!', '12000.00', 4, '06:00:00', '19:00:00', '', 0, '2022-03-14 18:03:23', NULL),
(22, 'Scrambled Egg', 3, 'Fresh egg fried with our special spices!', '12000.00', 4, '06:00:00', '19:00:00', '', 0, '2022-03-14 18:03:58', NULL),
(23, 'Scrambled Egg', 3, 'Fresh egg fried with our special spices!', '12000.00', 4, '06:00:00', '19:00:00', '', 0, '2022-03-14 18:04:14', NULL),
(24, 'Scrambled Egg', 3, 'Fresh egg fried with our special spices!', '12000.00', 4, '06:00:00', '19:00:00', '', 0, '2022-03-14 18:05:09', NULL),
(25, 'Scrambled Egg', 3, 'Fresh egg fried with our special spices!', '12000.00', 4, '06:00:00', '19:00:00', '', 0, '2022-03-14 18:08:04', NULL),
(26, 'Choco Milkshakesss', 2, '100% non coffee choco shakers', '15000.00', 7, '10:00:00', '23:00:00', '', 1, '2022-03-15 11:43:51', '2022-03-15 11:44:33');

-- --------------------------------------------------------

--
-- Table structure for table `product_delivery_type`
--

CREATE TABLE `product_delivery_type` (
  `id` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `id_delivery_type` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_delivery_type`
--

INSERT INTO `product_delivery_type` (`id`, `id_product`, `id_delivery_type`, `created_at`, `updated_at`) VALUES
(1, 25, 7, '2022-03-14 18:08:04', NULL),
(2, 25, 9, '2022-03-14 18:08:04', NULL),
(3, 25, 8, '2022-03-14 18:08:04', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_size`
--

CREATE TABLE `product_size` (
  `id` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `id_size` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_size`
--

INSERT INTO `product_size` (`id`, `id_product`, `id_size`, `created_at`, `updated_at`) VALUES
(1, 18, 2, '2022-03-14 17:40:27', NULL),
(2, 18, 1, '2022-03-14 17:40:27', NULL),
(3, 19, 1, '2022-03-14 17:53:58', NULL),
(4, 20, 1, '2022-03-14 17:58:47', NULL),
(5, 21, 1, '2022-03-14 18:03:23', NULL),
(6, 22, 1, '2022-03-14 18:03:58', NULL),
(7, 23, 1, '2022-03-14 18:04:14', NULL),
(8, 24, 1, '2022-03-14 18:05:09', NULL),
(9, 25, 1, '2022-03-14 18:08:04', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `promo`
--

CREATE TABLE `promo` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `normal_price` decimal(12,2) NOT NULL,
  `description` text NOT NULL,
  `promo_code` varchar(8) NOT NULL,
  `date_start` date NOT NULL,
  `date_end` date NOT NULL,
  `discount_value` int(11) NOT NULL,
  `image` text DEFAULT NULL,
  `is_deleted` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `promo`
--

INSERT INTO `promo` (`id`, `name`, `normal_price`, `description`, `promo_code`, `date_start`, `date_end`, `discount_value`, `image`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 'Beef Break', '80000.00', 'Your super breakfast with smoked beef and tea', 'B3EDON2', '2022-03-11', '2022-03-13', 25, 'https://res.cloudinary.com/fazztrackfw5/image/upload/v1647270675/ngopskuy/uploads/promo/promo-1647270671971.png', 0, '2022-03-12 00:17:45', '2022-03-14 23:11:23'),
(2, 'Smokey Steak', '60000.00', 'Steak and some juicy lemonade for your super lunch', 'SL21SLJL', '2022-03-09', '2022-03-11', 15, 'https://res.cloudinary.com/fazztrackfw5/image/upload/v1647158764/ngopskuy/uploads/promo/promo-1647158762863.png', 0, '2022-03-13 15:49:18', '2022-03-13 16:06:06');

-- --------------------------------------------------------

--
-- Table structure for table `promo_delivery_type`
--

CREATE TABLE `promo_delivery_type` (
  `id` int(11) NOT NULL,
  `id_promo` int(11) NOT NULL,
  `id_delivery_type` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `promo_delivery_type`
--

INSERT INTO `promo_delivery_type` (`id`, `id_promo`, `id_delivery_type`, `created_at`, `updated_at`) VALUES
(1, 1, 9, '2022-03-14 23:28:21', '2022-03-14 23:34:55'),
(2, 1, 7, '2022-03-14 23:53:52', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `promo_size`
--

CREATE TABLE `promo_size` (
  `id` int(11) NOT NULL,
  `id_promo` int(11) NOT NULL,
  `id_size` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `promo_size`
--

INSERT INTO `promo_size` (`id`, `id_promo`, `id_size`, `created_at`, `updated_at`) VALUES
(2, 1, 2, '2022-03-12 00:20:46', '2022-03-12 00:34:47'),
(3, 1, 1, '2022-03-14 23:53:52', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `size`
--

CREATE TABLE `size` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `label` varchar(5) NOT NULL,
  `description` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `size`
--

INSERT INTO `size` (`id`, `name`, `label`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Regular', 'R', '250 gr', '2022-03-11 21:07:59', '2022-03-14 14:48:42'),
(2, 'Large', 'L', '350 gr', '2022-03-11 21:13:28', '2022-03-14 14:48:45'),
(4, 'Extra Large', 'XL', '500 gr', '2022-03-14 14:50:08', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_transaction_status` int(11) NOT NULL,
  `payment_method` enum('card','bank account','cash on delivery') DEFAULT NULL,
  `is_delivered` tinyint(4) NOT NULL,
  `table_number` int(11) DEFAULT NULL,
  `total_price` decimal(12,2) NOT NULL,
  `is_deleted` tinyint(4) DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `id_user`, `id_transaction_status`, `payment_method`, `is_delivered`, `table_number`, `total_price`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 18, 1, 'card', 0, 2, '15000.00', 0, '2022-03-12 13:34:07', NULL),
(2, 18, 1, 'card', 0, 2, '30000.00', 0, '2022-03-12 13:34:49', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `transaction_product`
--

CREATE TABLE `transaction_product` (
  `id` int(11) NOT NULL,
  `id_transaction` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaction_product`
--

INSERT INTO `transaction_product` (`id`, `id_transaction`, `id_product`, `quantity`, `created_at`, `updated_at`) VALUES
(2, 1, 1, 2, '2022-03-12 14:53:31', '2022-03-12 15:12:29'),
(4, 1, 2, 3, '2022-03-12 16:41:50', NULL),
(5, 2, 2, 1, '2022-03-12 17:11:47', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `transaction_status`
--

CREATE TABLE `transaction_status` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaction_status`
--

INSERT INTO `transaction_status` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'In cart', '2022-03-12 13:28:01', '2022-03-12 13:58:34'),
(2, 'Checked out', '2022-03-12 13:28:08', '2022-03-12 13:59:07'),
(3, 'Paid', '2022-03-12 13:28:12', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(120) NOT NULL,
  `display_name` varchar(100) DEFAULT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `address` text DEFAULT NULL,
  `phone_number` varchar(14) DEFAULT NULL,
  `is_verified` tinyint(4) NOT NULL DEFAULT 0,
  `image` text DEFAULT NULL,
  `id_role` int(11) NOT NULL DEFAULT 3,
  `is_deleted` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `update_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `first_name`, `last_name`, `email`, `password`, `display_name`, `gender`, `birth_date`, `address`, `phone_number`, `is_verified`, `image`, `id_role`, `is_deleted`, `created_at`, `update_at`) VALUES
(1, 'first', 'user', 'firstuser@mail.com', '$argon2i$v=19$m=4096,t=3,p=1$SX62ePbe4NzzpumkyEwi3Q$f0ibNogfFrWsKFAec2L++ynolQyjcx+PY1fagvRRBW0', NULL, NULL, NULL, NULL, NULL, 0, 'https://res.cloudinary.com/fazztrackfw5/image/upload/v1646936708/ngopskuy/uploads/user/user-1646936705683.png', 2, 0, '2022-03-10 01:14:16', '2022-03-11 02:25:07'),
(17, 'Random', 'User', 'randomuser@mail.com', '$argon2i$v=19$m=4096,t=3,p=1$8k5pJS4CO8duWWZ8txEAYw$L7rmGrTcAHE+148CEmAxh3ZB2doRVZeSzevf5u+6fPU', NULL, NULL, NULL, NULL, NULL, 0, 'https://res.cloudinary.com/fazztrackfw5/image/upload/v1646931860/ngopskuy/uploads/user/user-1646931858181.png', 3, 0, '2022-03-11 01:04:19', NULL),
(18, 'Bise', 'Feh', 'bisefeh455@toudrum.com', '$argon2i$v=19$m=4096,t=3,p=1$DLwFNJrsK6KVxQ8kUFjMSg$4e+c1S0A0umP9MDflN+5mlNk+Dj0YMlOvI6mDHfGshs', 'BiseF', 'male', '1998-08-21', 'Somewhere in the world st', '0897449841', 1, '', 3, 0, '2022-03-11 10:29:46', '2022-03-14 20:31:08'),
(19, 'kelvin', 'wong', 'lucky7kelvin@yahoo.com', '$argon2i$v=19$m=4096,t=3,p=1$vSMoB88ZPMC8iZ3yElOJ0g$Pgn78DYcAA+8keWvAHXG+TqvZIHp/8darVcqJOmjmug', NULL, NULL, NULL, NULL, NULL, 0, NULL, 3, 0, '2022-03-13 21:16:58', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'superadmin', '2022-03-09 20:06:39', '2022-03-09 13:06:27'),
(2, 'admin', '2022-03-09 20:06:39', '2022-03-09 13:06:27'),
(3, 'user', '2022-03-09 20:06:46', '2022-03-09 13:06:43');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `delivery_type`
--
ALTER TABLE `delivery_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `otp`
--
ALTER TABLE `otp`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_otp_type` (`id_otp_type`);

--
-- Indexes for table `otp_type`
--
ALTER TABLE `otp_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_category` (`id_category`);

--
-- Indexes for table `product_delivery_type`
--
ALTER TABLE `product_delivery_type`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_product` (`id_product`,`id_delivery_type`),
  ADD KEY `id_delivery_type` (`id_delivery_type`);

--
-- Indexes for table `product_size`
--
ALTER TABLE `product_size`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_product` (`id_product`,`id_size`),
  ADD KEY `id_size` (`id_size`);

--
-- Indexes for table `promo`
--
ALTER TABLE `promo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `promo_delivery_type`
--
ALTER TABLE `promo_delivery_type`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_promo` (`id_promo`,`id_delivery_type`),
  ADD KEY `id_delivery_type` (`id_delivery_type`);

--
-- Indexes for table `promo_size`
--
ALTER TABLE `promo_size`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_promo` (`id_promo`,`id_size`),
  ADD KEY `id_size` (`id_size`);

--
-- Indexes for table `size`
--
ALTER TABLE `size`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`,`id_transaction_status`),
  ADD KEY `id_transaction_status` (`id_transaction_status`);

--
-- Indexes for table `transaction_product`
--
ALTER TABLE `transaction_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_transaction` (`id_transaction`,`id_product`),
  ADD KEY `id_product` (`id_product`);

--
-- Indexes for table `transaction_status`
--
ALTER TABLE `transaction_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `id_role` (`id_role`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `delivery_type`
--
ALTER TABLE `delivery_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `otp`
--
ALTER TABLE `otp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `otp_type`
--
ALTER TABLE `otp_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `product_delivery_type`
--
ALTER TABLE `product_delivery_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product_size`
--
ALTER TABLE `product_size`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `promo`
--
ALTER TABLE `promo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `promo_delivery_type`
--
ALTER TABLE `promo_delivery_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `promo_size`
--
ALTER TABLE `promo_size`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `size`
--
ALTER TABLE `size`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `transaction_product`
--
ALTER TABLE `transaction_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `transaction_status`
--
ALTER TABLE `transaction_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `otp`
--
ALTER TABLE `otp`
  ADD CONSTRAINT `otp_ibfk_1` FOREIGN KEY (`id_otp_type`) REFERENCES `otp_type` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `product_delivery_type`
--
ALTER TABLE `product_delivery_type`
  ADD CONSTRAINT `product_delivery_type_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `product_delivery_type_ibfk_2` FOREIGN KEY (`id_delivery_type`) REFERENCES `delivery_type` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `product_size`
--
ALTER TABLE `product_size`
  ADD CONSTRAINT `product_size_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `product_size_ibfk_2` FOREIGN KEY (`id_size`) REFERENCES `size` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `promo_delivery_type`
--
ALTER TABLE `promo_delivery_type`
  ADD CONSTRAINT `promo_delivery_type_ibfk_1` FOREIGN KEY (`id_promo`) REFERENCES `promo` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `promo_delivery_type_ibfk_2` FOREIGN KEY (`id_delivery_type`) REFERENCES `delivery_type` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `promo_size`
--
ALTER TABLE `promo_size`
  ADD CONSTRAINT `promo_size_ibfk_1` FOREIGN KEY (`id_promo`) REFERENCES `promo` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `promo_size_ibfk_2` FOREIGN KEY (`id_size`) REFERENCES `size` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`id_transaction_status`) REFERENCES `transaction_status` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `transaction_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `transaction_product`
--
ALTER TABLE `transaction_product`
  ADD CONSTRAINT `transaction_product_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `transaction_product_ibfk_2` FOREIGN KEY (`id_transaction`) REFERENCES `transaction` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`id_role`) REFERENCES `user_role` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
