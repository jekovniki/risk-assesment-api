import { Router } from "express";
import authRouter from "./auth";
import usersRouter from "./user";
import searchRouter from "./search";
import organizationRouter from "./organization";

const v1Router = Router();

v1Router.use('/users', usersRouter);
v1Router.use("/auth", authRouter);
v1Router.use("/search", searchRouter);
v1Router.use("/organization", organizationRouter);

export default v1Router;
