import { Middleware } from "@core/infra/Middleware";
import { EnsureAuthenticatedMiddleware } from "@shared/http/middleware/EnsureAuthenticatedMiddleware";

export function makeEnsureAuthenticatedMiddleware(): Middleware {
  const ensureAuthenticatedMiddleware = new EnsureAuthenticatedMiddleware();

  return ensureAuthenticatedMiddleware;
}
