import { adaptRoute } from "@core/infra/adpters/ExpressRouteAdapter";
import { Router } from "express";
import { makeAuthenticateUserControllerFactory } from "../factories/controller/AuthenticateUserControllerFactory";

const authRoutes = Router();

authRoutes.post("/signin", adaptRoute(makeAuthenticateUserControllerFactory()));

export { authRoutes };
