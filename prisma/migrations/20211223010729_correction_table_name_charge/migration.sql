/*
  Warnings:

  - You are about to drop the `Charges` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Charges" DROP CONSTRAINT "Charges_debtor_id_fkey";

-- DropTable
DROP TABLE "Charges";

-- CreateTable
CREATE TABLE "charges" (
    "id" TEXT NOT NULL,
    "debtor_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "generated_in" DATE NOT NULL,
    "expires_in" DATE NOT NULL,
    "value" REAL NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "charges_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "charges" ADD CONSTRAINT "charges_debtor_id_fkey" FOREIGN KEY ("debtor_id") REFERENCES "debtors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
