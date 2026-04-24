import express from "express";
import routes from "./routes";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", routes);

app.use(errorMiddleware);

export default app;