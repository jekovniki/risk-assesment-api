import { Router } from "express";
import { validationMiddleware } from "../../../middlewares/validation";
import { signIn, signUp } from "../../../controllers/auth";
import { signInCredentials, signUpData } from "../../../dtos/auth";

const authRouter = Router();

authRouter.post('/sign-up', validationMiddleware(signUpData), signUp);
authRouter.post('/sign-in', validationMiddleware(signInCredentials), signIn);

export default authRouter;