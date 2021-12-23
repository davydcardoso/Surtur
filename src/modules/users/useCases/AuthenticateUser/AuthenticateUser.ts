import { Either, left, right } from "@core/logic/Either";
import { Email } from "@modules/users/domain/users/email";
import { JWT } from "@modules/users/domain/users/jwt";
import { Password } from "@modules/users/domain/users/password";
import { User } from "@modules/users/domain/users/users";
import { IUserRepository } from "@modules/users/repositories/IUserRepository";
import { InvalidEmailOrPasswordError } from "./errors/InvalidEmailOrPasswordError ";

type AuthResponse = {
  token: string;
  user: User;
};

type AuthenticateUserRequest = {
  email: string;
  password: string;
};

type AuthenticateUserResponse = Either<Error, AuthResponse>;

export class AuthenticateUser {
  constructor(private usersRepository: IUserRepository) {}

  async perform({
    email,
    password,
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const emailOrError = Email.create(email);
    const passwordOrError = Password.create(password);

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
    }

    const user = await this.usersRepository.findByEmail(email);

    const isPasswordInvalid = await user.password.comparePassword(password);

    if (!isPasswordInvalid) {
      return left(new InvalidEmailOrPasswordError());
    }

    const { token } = JWT.signUser(user);

    return right({ token, user });
  }
}
