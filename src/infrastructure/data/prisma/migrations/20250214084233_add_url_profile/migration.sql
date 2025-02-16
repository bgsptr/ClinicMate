/*
  Warnings:

  - You are about to alter the column `day` on the `Schedule` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Doctor` ADD COLUMN `url_profile` VARCHAR(191) NULL,
    MODIFY `name` VARCHAR(191) NULL,
    MODIFY `address` VARCHAR(191) NULL,
    MODIFY `phone_number` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Patient` ADD COLUMN `url_profile` VARCHAR(191) NULL,
    MODIFY `name` VARCHAR(191) NULL,
    MODIFY `birth_date` DATETIME(3) NULL,
    MODIFY `gender` ENUM('MALE', 'FEMALE') NULL,
    MODIFY `address` VARCHAR(191) NULL,
    MODIFY `phone_number` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Schedule` MODIFY `day` INTEGER NOT NULL;
