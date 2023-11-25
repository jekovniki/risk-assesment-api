import { Router } from "express";
import authRouter from "./auth";
import usersRouter from "./user";

const v1Router = Router();

v1Router.use('/users', usersRouter);
// v1Router.use("/news", newsRouter);
// v1Router.use("/events", eventRouter);
v1Router.use("/auth", authRouter);
// v1Router.use("/projects", projectsRouter);
// v1Router.use("/vacations", vacationsRouter);
// v1Router.use("/company", companyRouter);
// v1Router.use("/documents", documentsRouter);

export default v1Router;
