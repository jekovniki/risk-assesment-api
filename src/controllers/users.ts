import { Request, Response } from "express";
import { getUserInformation } from "../services/users";
import { SERVER, SUCCESS } from "../utils/constants/http-status";

export async function getUser(request: Request, response: Response): Promise<void> {
    try {
        const result = await getUserInformation(request.body.userId);
        if (result.success === false) {
            response.status(SERVER.ERROR.CODE).send({
                success: false,
                message: SERVER.ERROR.MESSAGE
            });
            return;
        }

        response.status(SUCCESS.OK.CODE).send(result);
    } catch (error) {
        response.status(SERVER.ERROR.CODE).send({
            success: false,
            message: SERVER.ERROR.MESSAGE
        })
    }
}