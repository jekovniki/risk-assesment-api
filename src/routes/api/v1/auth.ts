import { Router } from "express";
import { validationMiddleware } from "../../../middlewares/validation";
import { signIn, signUp } from "../../../controllers/auth";
import { signInCredentials, signUpData } from "../../../types/auth";

const authRouter = Router();

authRouter.post('/sign-up', validationMiddleware(signUpData), signUp);
authRouter.post('/sign-in', validationMiddleware(signInCredentials), signIn);
// authRouter.post('/sign-in', validationMiddleware(signInCredentials), deviceDataMiddleware, signIn);
// authRouter.get('/sign-in-device', deviceDataMiddleware, signInTrustedDevice);
// authRouter.post('/sign-out', signOut);

export default authRouter;