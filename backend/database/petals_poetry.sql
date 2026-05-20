-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 20, 2026 at 04:29 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `petals_poetry`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `role` varchar(191) NOT NULL DEFAULT 'ADMIN',
  `status` varchar(191) NOT NULL DEFAULT 'ACTIVE',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `password`, `role`, `status`, `createdAt`) VALUES
(1, 'jay', 'jay@gmail.com', '$2b$10$Tv4zGbnwf7kwPExKt.Bxfef0m0HfoqQmxtsmDIltk8q.gpiQ9Pk6m', 'ADMIN', 'ACTIVE', '2026-05-19 07:33:45.319');

-- --------------------------------------------------------

--
-- Table structure for table `cartitem`
--

CREATE TABLE `cartitem` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `customerName` varchar(191) NOT NULL,
  `customerPhone` varchar(191) NOT NULL,
  `customerAddress` varchar(191) NOT NULL,
  `note` varchar(191) DEFAULT NULL,
  `total` int(11) NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'PENDING',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `bankName` varchar(191) DEFAULT NULL,
  `paymentMethod` varchar(191) NOT NULL DEFAULT 'COD',
  `paymentProof` varchar(191) DEFAULT NULL,
  `paymentStatus` varchar(191) NOT NULL DEFAULT 'PENDING',
  `city` varchar(191) DEFAULT NULL,
  `shippingCost` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `customerName`, `customerPhone`, `customerAddress`, `note`, `total`, `status`, `createdAt`, `bankName`, `paymentMethod`, `paymentProof`, `paymentStatus`, `city`, `shippingCost`) VALUES
(26, 'Jule', '62112232434', 'Jl. Raya', '', 230000, 'PENDING', '2026-05-15 06:56:53.459', 'Mandiri', 'TRANSFER', '/uploads/payment-proofs/1778828213449.jpg', 'WAITING_CONFIRMATION', NULL, 0),
(27, 'Zee', '09812334', 'Jl. Parung', '', 230000, 'PENDING', '2026-05-15 07:06:03.157', 'BCA', 'TRANSFER', '/uploads/payment-proofs/1778828763152.jpg', 'WAITING_CONFIRMATION', NULL, 0),
(28, 'Jule', '19271261', 'Jl. Jalan', '', 83000, 'completed', '2026-05-15 07:09:25.495', 'BCA', 'TRANSFER', '/uploads/payment-proofs/1778828965491.jpg', 'WAITING_CONFIRMATION', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `orderitem`
--

CREATE TABLE `orderitem` (
  `id` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orderitem`
--

INSERT INTO `orderitem` (`id`, `orderId`, `productId`, `quantity`, `price`) VALUES
(1, 26, 10, 1, 200000),
(2, 27, 10, 1, 200000),
(3, 28, 9, 1, 55000);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `price` int(11) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(191) NOT NULL,
  `category` varchar(191) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `occasion` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `slug`, `price`, `description`, `image`, `category`, `stock`, `isActive`, `createdAt`, `updatedAt`, `occasion`) VALUES
(3, 'Seasonal Bouquet', 'seasonal-bouquet', 100000, 'Seasonal Bouquet', 'http://localhost:5000/uploads/1779243489557-bouquet_seasonal.webp', 'Seasonal', 2, 1, '2026-05-11 06:07:59.286', '2026-05-20 02:18:09.571', 'Wedding'),
(4, 'Peonies Bouquet', 'peonies-bouquet', 50000, 'Peonies Bouquet', 'http://localhost:5000/uploads/1779243331970-bouquet_peonies.webp', 'Peonies', 1, 1, '2026-05-11 13:03:26.430', '2026-05-20 02:15:31.979', 'Anniversary'),
(5, 'Birthday Bouquet', 'birthday-bouquet', 100000, 'Birthday Bouquet', 'http://localhost:5000/uploads/1779243218384-bouquet_birthday.webp', 'Roses', 13, 1, '2026-05-12 16:26:12.672', '2026-05-20 02:13:38.396', 'Birthday'),
(6, 'Sunflowers', 'sunflowers', 150000, 'Sunflowers', 'http://localhost:5000/uploads/1779243055520-bouquet_sunflower.webp', 'Sunflowers', 20, 1, '2026-05-12 16:27:21.340', '2026-05-20 02:10:55.543', 'Wedding'),
(7, 'Lily pink', 'lily-pink', 120000, 'Lily pink', 'http://localhost:5000/uploads/1779242949973-bouquet_lily.webp', 'Lilies', 11, 1, '2026-05-12 16:28:40.722', '2026-05-20 02:09:09.983', 'Wedding'),
(8, 'Tulip pink', 'tulip-pink', 85000, 'Tulip pink', 'http://localhost:5000/uploads/1779242865496-bouquet_tulip.webp', 'Tulips', 20, 1, '2026-05-12 16:29:35.803', '2026-05-20 02:07:45.528', 'Sympathy'),
(9, 'Rose pink', 'rose-pink', 55000, 'Rose pink', 'http://localhost:5000/uploads/1779242770720-bouquet_rose_pink.webp', 'Roses', 10, 1, '2026-05-12 16:30:40.762', '2026-05-20 02:06:10.728', 'Wedding'),
(10, 'Rose Red', 'rose-red', 85000, 'Rose Red', 'http://localhost:5000/uploads/1779242594695-bouquet_2.webp', 'Roses', 5, 1, '2026-05-13 01:18:47.866', '2026-05-20 02:03:14.743', 'Congratulations');

-- --------------------------------------------------------

--
-- Table structure for table `storesetting`
--

CREATE TABLE `storesetting` (
  `id` int(11) NOT NULL,
  `storeName` varchar(191) NOT NULL,
  `contactEmail` varchar(191) NOT NULL,
  `currency` varchar(191) NOT NULL DEFAULT 'IDR',
  `timezone` varchar(191) NOT NULL DEFAULT 'Asia/Jakarta',
  `description` varchar(191) DEFAULT NULL,
  `logo` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `storesetting`
--

INSERT INTO `storesetting` (`id`, `storeName`, `contactEmail`, `currency`, `timezone`, `description`, `logo`, `createdAt`, `updatedAt`) VALUES
(1, 'Bouquet Ipi', 'admin@petals.com', 'IDR', 'Asia/Jakarta', 'Shop exquisite, handcrafted flower arrangements at Bouquet Ipi. From romantic roses to seasonal wildflowers, we offer fast delivery and premium quality for every occasion. Order your fresh bo', 'http://localhost:5000/uploads/1778813645587-Instagram_logo_2016.svg.webp', '2026-05-15 02:50:27.275', '2026-05-15 03:38:28.483');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `role` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `role`, `createdAt`) VALUES
(1, 'Admin', 'admin@gmail.com', '$2b$10$z25gjUKmBXRDZPTyjwKNFuOC5BnDhDPPnE2.31tBL4yqIQE1/D/sC', 'admin', '2026-05-11 15:26:26.581'),
(2, 'Zayyan Dzulfalah', 'zayyanlah@gmail.com', '$2b$10$bcamBanmDAQPLbX4bchEu.4VsSLfGZuEBV6AcOzL/zl1mooVDLa/W', 'customer', '2026-05-13 03:27:12.935'),
(3, 'Sakura', 'sakura@gmail.com', '$2b$10$xZEc2cNZWfYOU/43mW4UtONbMZTKFlTPgyg/.O/E9KayONnRQYLs.', 'customer', '2026-05-19 07:47:02.372');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('57766b92-1b1e-4d78-9666-5463ac685e10', '406a085ccb7207648e82e33fb4dbb63be435d0e4652f385c27d0ed8091376aa1', '2026-05-11 04:26:46.341', '20260511042646_update', NULL, NULL, '2026-05-11 04:26:46.057', 1),
('5c07827e-2181-48bb-99c8-75ca29c4968e', 'bc786ca649aee740569c165c7adaaf7ae192be730d1f96d2896f68b6cdec2787', '2026-05-13 01:31:32.939', '20260513013132_add_cart', NULL, NULL, '2026-05-13 01:31:32.829', 1),
('b31f128c-d9eb-4921-8e0b-12c441a50b6d', 'a947b472b5fe2a2b1c6b6d24d655c8f5fdbc5f985ea1e0809a047387aba14a7c', '2026-05-12 16:51:46.740', '20260512165146_add_product_occasion', NULL, NULL, '2026-05-12 16:51:46.717', 1),
('dad3d847-ec20-4f5a-8af5-1967b6d94fd9', 'b2d420cb74853ea3b73ff4a47f4b81c8ddafe774a2040ce473fa77e6aaae1d3e', '2026-05-15 02:12:55.111', '20260515021255_add_store_setting', NULL, NULL, '2026-05-15 02:12:55.085', 1),
('dc819748-2137-4429-b510-71b82d411480', 'ccb1de0d6cef3286704504fe14b20eb513c1fdc8f99c5dcb9a9f16ef21c5a4e0', '2026-05-11 15:08:53.023', '20260511150852_add_user', NULL, NULL, '2026-05-11 15:08:52.973', 1),
('edf163b9-009e-448a-a141-83ae6f09962c', '9c60933236b30cf986499d44fc62fe8d02e9eb04b2e867b1cdf58dfedc4c620a', '2026-05-13 01:11:20.748', '20260513011120_add_product_occasion', NULL, NULL, '2026-05-13 01:11:20.724', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Admin_email_key` (`email`);

--
-- Indexes for table `cartitem`
--
ALTER TABLE `cartitem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `CartItem_productId_fkey` (`productId`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `OrderItem_productId_fkey` (`productId`),
  ADD KEY `OrderItem_orderId_fkey` (`orderId`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Product_slug_key` (`slug`);

--
-- Indexes for table `storesetting`
--
ALTER TABLE `storesetting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cartitem`
--
ALTER TABLE `cartitem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `orderitem`
--
ALTER TABLE `orderitem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `storesetting`
--
ALTER TABLE `storesetting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cartitem`
--
ALTER TABLE `cartitem`
  ADD CONSTRAINT `CartItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `OrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
