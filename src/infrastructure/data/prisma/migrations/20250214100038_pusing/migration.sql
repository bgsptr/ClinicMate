/*
  Warnings:

  - Made the column `name` on table `Doctor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `Doctor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone_number` on table `Doctor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Patient` required. This step will fail if there are existing NULL values in that column.
  - Made the column `birth_date` on table `Patient` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gender` on table `Patient` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `Patient` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone_number` on table `Patient` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Doctor` MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `address` VARCHAR(191) NOT NULL,
    MODIFY `phone_number` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Patient` MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `birth_date` DATETIME(3) NOT NULL,
    MODIFY `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    MODIFY `address` VARCHAR(191) NOT NULL,
    MODIFY `phone_number` VARCHAR(191) NOT NULL;
