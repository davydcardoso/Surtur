import { fail, forbidden, HttpResponse, ok } from "@core/infra/HttpResponse";
import { Middleware } from "@core/infra/Middleware";
import { decode } from "jsonwebtoken";
import { AccessDeniedError } from "../errors/AccessDeniedError";

type EnsureAuthenticatedMiddlewareRequest = {
  accessToken: string;
};

type DecodedJwt = {
  sub: string;
};

export class EnsureAuthenticatedMiddleware implements Middleware {
  constructor() {}
  async handle(
    request: EnsureAuthenticatedMiddlewareRequest
  ): Promise<HttpResponse> {
    try {
      const { accessToken } = request;

      if (accessToken) {
        const [, token] = accessToken.split(" ");

        try {
          const decoded = decode(token) as DecodedJwt;

          return ok({ userId: decoded.sub });
        } catch (err) {
          return forbidden(new AccessDeniedError());
        }
      }
      return forbidden(new AccessDeniedError());
    } catch (err) {
      return fail(err);
    }
  }
}
