/*
  Warnings:

  - You are about to alter the column `xAcceleration` on the `physicalmovement` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `yAcceleration` on the `physicalmovement` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `zAcceleration` on the `physicalmovement` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.

*/
-- AlterTable
ALTER TABLE `physicalmovement` MODIFY `xAcceleration` DOUBLE NOT NULL,
    MODIFY `yAcceleration` DOUBLE NOT NULL,
    MODIFY `zAcceleration` DOUBLE NOT NULL;
