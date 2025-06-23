/*
  Warnings:

  - You are about to drop the column `customer_id` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "customer_id",
ADD COLUMN     "customer" TEXT NOT NULL DEFAULT 'Unknown Value';
