/*
  Warnings:

  - Added the required column `translationKey` to the `Dish` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dish` ADD COLUMN `translationKey` VARCHAR(191) NOT NULL;
