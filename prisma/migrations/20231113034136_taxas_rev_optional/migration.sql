-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_revendedorId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "revendedorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_revendedorId_fkey" FOREIGN KEY ("revendedorId") REFERENCES "Revendedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
