import { Router } from "express";
// import { validationMiddleware } from "../../../middlewares/validation";
// import { signInCredentials } from "../../../types/auth";
// import { signIn, signInTrustedDevice, signOut } from "../../../controllers/auth";
// import { deviceDataMiddleware } from "../../../middlewares/device";

const usersRouter = Router();

// authRouter.post('/sign-in', validationMiddleware(signInCredentials), deviceDataMiddleware, signIn);
// authRouter.get('/sign-in-device', deviceDataMiddleware, signInTrustedDevice);
// authRouter.post('/sign-out', signOut);

export default usersRouter;