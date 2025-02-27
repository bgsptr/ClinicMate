-- AlterTable
ALTER TABLE `RawatJalan` ADD COLUMN `verifikasi_status` ENUM('ACCEPTED', 'REJECTED', 'PENDING') NULL;

-- AlterTable
ALTER TABLE `RawatJalanQueue` ADD COLUMN `queue_end_time` VARCHAR(191) NULL,
    ADD COLUMN `queue_start_time` VARCHAR(191) NULL;
