// @ts-nocheck
import express, { type Express } from "express";
import cors from "cors";
import router from "../artifacts/api-server/src/routes";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;