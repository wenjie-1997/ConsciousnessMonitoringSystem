-- CreateTable
CREATE TABLE `User` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `birthdate` DATETIME(3) NOT NULL,
    `emergencyContactName` VARCHAR(191) NOT NULL,
    `emergencyContactNumber` VARCHAR(191) NOT NULL,
    `geolocation` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PhysicalMovement` (
    `physicalMovementId` INTEGER NOT NULL AUTO_INCREMENT,
    `xAcceleration` DECIMAL(65, 30) NOT NULL,
    `yAcceleration` DECIMAL(65, 30) NOT NULL,
    `zAcceleration` DECIMAL(65, 30) NOT NULL,
    `physicalMovementTimestamp` DATETIME(3) NOT NULL,

    PRIMARY KEY (`physicalMovementId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DataAnalytic` (
    `dataAnalyticId` INTEGER NOT NULL AUTO_INCREMENT,
    `heartRateId` INTEGER NULL,
    `oxygenLevelId` INTEGER NULL,
    `glucoseLevelId` INTEGER NULL,
    `physicalMovementId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `DataAnalytic_physicalMovementId_key`(`physicalMovementId`),
    PRIMARY KEY (`dataAnalyticId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmergencyNotification` (
    `emergencyNotificationId` INTEGER NOT NULL AUTO_INCREMENT,
    `notificationTitle` VARCHAR(191) NOT NULL,
    `notificationDescription` VARCHAR(191) NOT NULL,
    `idRead` BOOLEAN NOT NULL,
    `dataAnalyticId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`emergencyNotificationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DataAnalytic` ADD CONSTRAINT `DataAnalytic_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DataAnalytic` ADD CONSTRAINT `DataAnalytic_physicalMovementId_fkey` FOREIGN KEY (`physicalMovementId`) REFERENCES `PhysicalMovement`(`physicalMovementId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmergencyNotification` ADD CONSTRAINT `EmergencyNotification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
