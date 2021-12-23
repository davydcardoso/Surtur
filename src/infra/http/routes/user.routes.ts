import { adaptMiddleware } from "@core/infra/adpters/ExpressMiddlewareAdapter";
import { Router } from "express";
import { makeEnsureAuthenticatedMiddleware } from "../factories/middleware/EnsureAuthenticatedMiddleware";

const userRoutes = Router();

userRoutes.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()));

export { userRoutes };
