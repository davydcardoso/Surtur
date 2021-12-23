import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { userRoutes } from "./user.routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/auth", authRoutes);

export { routes };
