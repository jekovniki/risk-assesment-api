import { Request, Response, Router } from "express";
import apiRouter from "./api";
import { SUCCESS } from "../utils/constants/http-status";
import { loggingMiddleware } from "../middlewares/logging";

const router = Router();

router.use('/api', loggingMiddleware, apiRouter);
router.get('/', loggingMiddleware, (_request: Request, response: Response) => {
    response.status(SUCCESS.OK.CODE).send({
        message: 'Welcome to Risk Assesment backend'
    })
})

export default router;