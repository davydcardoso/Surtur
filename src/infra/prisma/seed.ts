import { hash } from "bcryptjs";
import { v4 } from "uuid";
import { prisma } from "./connection";

async function start() {
  await prisma.users.createMany({
    data: [
      {
        id: v4(),
        name: "Davyd Kewen",
        email: "useremail@teste.com.br",
        password: await hash("passwordtest@123456", 8),
        created_at: new Date(),
      },
    ],
  });
}

start();
