import { hash } from "bcryptjs";
import { v4 } from "uuid";
import { prisma } from "./connection";

async function start() {
  await prisma.users.createMany({
    data: [
      {
        id: v4(),
        name: "Davyd Kewen",
        email: "davyd@rocketzapi.com.br",
        password: '$2a$08$5RWbzJOMHu5N9X6fTdNWHOwJZo/kKgZiubU16wY3HRrq71slh.n8W',
        created_at: new Date(),
      },
    ],
  });
}

start();
