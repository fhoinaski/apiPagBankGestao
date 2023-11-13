-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "pagSeguroId" INTEGER NOT NULL,
    "taxaNova" TEXT NOT NULL,
    "taxaAntiga" TEXT NOT NULL,
    "primeiraTaxa" TEXT NOT NULL,
    "restauradoTaxas" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Revendedor" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Revendedor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_pagSeguroId_key" ON "User"("pagSeguroId");

-- CreateIndex
CREATE UNIQUE INDEX "Revendedor_email_key" ON "Revendedor"("email");
