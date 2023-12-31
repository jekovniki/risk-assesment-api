import { Router } from "express";
import { getUser } from "../../../controllers/users";
import { accessControlMiddleware } from "../../../middlewares/access";
import { ACCESS_LEVEL } from "../../../utils/configuration";

const usersRouter = Router();

usersRouter.get('/me', accessControlMiddleware(ACCESS_LEVEL.USER), getUser);

export default usersRouter;