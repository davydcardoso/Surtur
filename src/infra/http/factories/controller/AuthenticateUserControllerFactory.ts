import { Controller } from "@core/infra/Controller";
import { PrismaUserRepository } from "@modules/users/repositories/prisma/PrismaUserRepository";
import { AuthenticateUser } from "@modules/users/useCases/AuthenticateUser/AuthenticateUser";
import { AuthenticateUserController } from "@modules/users/useCases/AuthenticateUser/AuthenticateUserController";

export function makeAuthenticateUserControllerFactory(): Controller {
  const prismaUserRepository = new PrismaUserRepository();

  const authenticateUser = new AuthenticateUser(prismaUserRepository);

  const authenticateUserController = new AuthenticateUserController(
    authenticateUser
  );

  return authenticateUserController;
}
