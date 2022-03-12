-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 12, 2022 at 03:40 AM
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
(1, 'coffee', '2022-03-11 19:49:46', '2022-03-11 12:49:37'),
(2, 'non coffee', '2022-03-11 19:49:46', '2022-03-11 12:49:37'),
(3, 'desert', '2022-03-11 20:52:21', '2022-03-11 20:53:13');

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
(8, 'Take Away', '2022-03-10 14:21:44', NULL);

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
(2, 'Choco Milkshake', 2, '100% non coffee choco shakers', '20000.00', 7, '10:00:00', '23:00:00', 'https://res.cloudinary.com/fazztrackfw5/image/upload/v1647001832/ngopskuy/uploads/product/product-1647001830490.png', 0, '2022-03-11 20:18:22', '2022-03-11 20:30:34'),
(3, 'Choco Milkshakes', 2, '100% non coffee choco shakers', '20000.00', 7, '10:00:00', '23:00:00', '', 1, '2022-03-11 20:19:27', '2022-03-11 20:48:11'),
(4, 'Choco Milkshakess', 2, '100% non coffee choco shakers', '20000.00', 7, '10:00:00', '23:00:00', '', 0, '2022-03-11 20:20:11', NULL),
(5, 'Choco Milkshakesss', 2, '100% non coffee choco shakers', '20000.00', 7, '10:00:00', '23:00:00', 'https://res.cloudinary.com/fazztrackfw5/image/upload/v1647001321/ngopskuy/uploads/product/product-1647001319431.png', 0, '2022-03-11 20:22:09', NULL);

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
(1, 'Beef Break', '80000.00', 'Your super breakfast with smoked beef and tea', 'B3EDON2', '2022-03-11', '2022-03-13', 25, NULL, 0, '2022-03-12 00:17:45', NULL);

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
(2, 1, 2, '2022-03-12 00:20:46', '2022-03-12 00:34:47');

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
(1, 'Regular', 'R', '250gr', '2022-03-11 21:07:59', '2022-03-11 21:14:38'),
(2, 'Large', 'L', '350gr', '2022-03-11 21:13:28', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `id_transaction_status` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `payment_method` enum('card','bank account','cash on delivery') NOT NULL,
  `is_delivered` tinyint(4) NOT NULL,
  `table_number` int(11) DEFAULT NULL,
  `total_price` decimal(12,2) NOT NULL,
  `is_deleted` tinyint(4) DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(18, 'Bise', 'Feh', 'bisefeh455@toudrum.com', '$argon2i$v=19$m=4096,t=3,p=1$/I27JgFWBQQC1Ak4gGtKqA$Frx5wzn4VvF2sKYeak9uGLN3JdlTl+fZoYRh0CsC2oA', NULL, NULL, NULL, NULL, NULL, 1, NULL, 3, 0, '2022-03-11 10:29:46', '2022-03-11 13:53:44');

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
  ADD KEY `id_user` (`id_user`,`id_product`,`id_transaction_status`),
  ADD KEY `id_transaction_status` (`id_transaction_status`),
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `delivery_type`
--
ALTER TABLE `delivery_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `product_delivery_type`
--
ALTER TABLE `product_delivery_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_size`
--
ALTER TABLE `product_size`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `promo`
--
ALTER TABLE `promo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `promo_delivery_type`
--
ALTER TABLE `promo_delivery_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `promo_size`
--
ALTER TABLE `promo_size`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `size`
--
ALTER TABLE `size`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transaction_status`
--
ALTER TABLE `transaction_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

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
  ADD CONSTRAINT `transaction_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `transaction_ibfk_3` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`id_role`) REFERENCES `user_role` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
