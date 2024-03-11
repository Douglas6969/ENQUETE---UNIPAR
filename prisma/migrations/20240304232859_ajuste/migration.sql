/*
  Warnings:

  - You are about to drop the column `alteradoEm` on the `Enquete` table. All the data in the column will be lost.
  - You are about to drop the column `criadoEm` on the `Enquete` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Enquete" DROP COLUMN "alteradoEm",
DROP COLUMN "criadoEm",
ADD COLUMN     "dataAlteracao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "OpcaoEnquete" (
    "codigoEnquete" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "enqueteCodigo" TEXT NOT NULL,

    CONSTRAINT "OpcaoEnquete_pkey" PRIMARY KEY ("codigoEnquete")
);

-- AddForeignKey
ALTER TABLE "OpcaoEnquete" ADD CONSTRAINT "OpcaoEnquete_enqueteCodigo_fkey" FOREIGN KEY ("enqueteCodigo") REFERENCES "Enquete"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;
