-- CreateTable
CREATE TABLE `Patient` (
    `id_patient` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `birth_date` DATETIME(3) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Patient_username_key`(`username`),
    PRIMARY KEY (`id_patient`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Doctor` (
    `id_doctor` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Doctor_username_key`(`username`),
    PRIMARY KEY (`id_doctor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Schedule` (
    `id_schedule` VARCHAR(191) NOT NULL,
    `id_doctor` VARCHAR(191) NOT NULL,
    `day` VARCHAR(191) NOT NULL,
    `start_time` DATETIME(3) NOT NULL,
    `end_time` DATETIME(3) NOT NULL,
    `slot` INTEGER NOT NULL,

    PRIMARY KEY (`id_schedule`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RawatJalan` (
    `id_rawat_jalan` VARCHAR(191) NOT NULL,
    `id_patient` VARCHAR(191) NOT NULL,
    `id_doctor` VARCHAR(191) NOT NULL,
    `visit_date` DATETIME(3) NOT NULL,
    `status_rawat_jalan` ENUM('FINISHED', 'UNFINISHED') NOT NULL,

    PRIMARY KEY (`id_rawat_jalan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MedicalRecord` (
    `id_medical_record` VARCHAR(191) NOT NULL,
    `id_rawat_jalan` VARCHAR(191) NOT NULL,
    `diagnose` VARCHAR(191) NOT NULL,
    `medical_action` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_medical_record`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RawatJalanQueue` (
    `id_queue` INTEGER NOT NULL AUTO_INCREMENT,
    `id_rawat_jalan` VARCHAR(191) NOT NULL,
    `queue_no` INTEGER NOT NULL,
    `queue_status` ENUM('WAITING', 'PROCESSED', 'FINISHED') NOT NULL,
    `rawat_jalan_date` DATETIME(3) NOT NULL,

    UNIQUE INDEX `RawatJalanQueue_id_rawat_jalan_key`(`id_rawat_jalan`),
    PRIMARY KEY (`id_queue`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'DOCTOR', 'PATIENT') NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Patient` ADD CONSTRAINT `Patient_username_fkey` FOREIGN KEY (`username`) REFERENCES `User`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Doctor` ADD CONSTRAINT `Doctor_username_fkey` FOREIGN KEY (`username`) REFERENCES `User`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_id_doctor_fkey` FOREIGN KEY (`id_doctor`) REFERENCES `Doctor`(`id_doctor`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RawatJalan` ADD CONSTRAINT `RawatJalan_id_patient_fkey` FOREIGN KEY (`id_patient`) REFERENCES `Patient`(`id_patient`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RawatJalan` ADD CONSTRAINT `RawatJalan_id_doctor_fkey` FOREIGN KEY (`id_doctor`) REFERENCES `Doctor`(`id_doctor`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MedicalRecord` ADD CONSTRAINT `MedicalRecord_id_rawat_jalan_fkey` FOREIGN KEY (`id_rawat_jalan`) REFERENCES `RawatJalan`(`id_rawat_jalan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RawatJalanQueue` ADD CONSTRAINT `RawatJalanQueue_id_rawat_jalan_fkey` FOREIGN KEY (`id_rawat_jalan`) REFERENCES `RawatJalan`(`id_rawat_jalan`) ON DELETE RESTRICT ON UPDATE CASCADE;
