/*
  Warnings:

  - You are about to drop the column `ocassion` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `ocassion`,
    ADD COLUMN `occasion` VARCHAR(191) NULL;
