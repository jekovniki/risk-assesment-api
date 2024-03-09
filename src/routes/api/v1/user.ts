import { Router } from "express";
import { getUser } from "../../../controllers/users";
import { accessControlMiddleware } from "../../../middlewares/access";

const usersRouter = Router();

usersRouter.get('/me', accessControlMiddleware(), getUser);

export default usersRouter;