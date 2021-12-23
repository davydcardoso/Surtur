-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('SENDING', 'ERROR', 'SENDED', 'CANCEL', 'REMOVED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "debtors" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "actived" BOOLEAN NOT NULL DEFAULT true,
    "email" VARCHAR(200) NOT NULL,
    "contact" VARCHAR(20) NOT NULL,
    "external_id" TEXT NOT NULL,
    "plan_id" TEXT NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "debtors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parameters" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(180) NOT NULL,
    "value" VARCHAR(200) NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "parameters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message_layout" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "subject" VARCHAR(255) NOT NULL,
    "body" TEXT NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "message_layout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plans" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "vps_name" VARCHAR(100) NOT NULL,
    "vps_value" REAL NOT NULL,
    "billing_value" REAL NOT NULL,
    "expiration_date" DATE NOT NULL,
    "biling_intermediary_id" TEXT NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "billing_intermediary" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(180) NOT NULL,
    "plan_id" TEXT NOT NULL,
    "costs_id" TEXT NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "billing_intermediary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "costs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ticket" REAL NOT NULL,
    "pix" REAL NOT NULL,
    "billing_intermediary_id" TEXT NOT NULL,
    "credit_card" REAL NOT NULL,
    "debit_card" REAL NOT NULL,

    CONSTRAINT "costs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Charges" (
    "id" TEXT NOT NULL,
    "debtor_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "generated_in" DATE NOT NULL,
    "expires_in" DATE NOT NULL,
    "value" REAL NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "Charges_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "debtors" ADD CONSTRAINT "debtors_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plans" ADD CONSTRAINT "plans_biling_intermediary_id_fkey" FOREIGN KEY ("biling_intermediary_id") REFERENCES "billing_intermediary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billing_intermediary" ADD CONSTRAINT "billing_intermediary_costs_id_fkey" FOREIGN KEY ("costs_id") REFERENCES "costs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charges" ADD CONSTRAINT "Charges_debtor_id_fkey" FOREIGN KEY ("debtor_id") REFERENCES "debtors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
