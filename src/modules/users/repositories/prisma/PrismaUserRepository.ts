import { prisma } from "@infra/prisma/connection";
import { User } from "@modules/users/domain/users/users";
import { UserMapper } from "@modules/users/mappers/UserMapper";
import { IUserRepository } from "../IUserRepository";

export class PrismaUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User> {
    const user = await prisma.users.findUnique({ where: { email } });

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }
}
