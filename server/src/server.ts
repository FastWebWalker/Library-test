import express from "express";
import cors from "cors";
import { registerRoutes } from "./routes/index.js";
import { errorHandler } from "./middlewares/error.js";

const app = express();

app.use(cors());
app.use(express.json());

registerRoutes(app);

app.use(errorHandler);

export default app;
