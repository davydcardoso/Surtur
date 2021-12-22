import { config } from "dotenv-flow";

config({ silent: true });

import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("tiny"));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(
  cors({
    exposedHeaders: ["x-total-count", "Content-Type", "Content-Length"],
    origin: "*",
  })
);

app.use(
  express.json({
    type: ["application/json", "text/plain"],
  })
);

// app.use("/odin/v1", routes);
// app.use(errors());

export { app };
