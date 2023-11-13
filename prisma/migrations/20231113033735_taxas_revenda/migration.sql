/*
  Warnings:

  - Added the required column `revendedorId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "revendedorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_revendedorId_fkey" FOREIGN KEY ("revendedorId") REFERENCES "Revendedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
