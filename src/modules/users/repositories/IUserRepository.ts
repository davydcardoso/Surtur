import { User } from "../domain/users/users";

export interface IUserRepository {
  findByEmail(email: string): Promise<User>;
}