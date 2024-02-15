import { NextFunction, Request, Response } from "express";
import * as Organization from "../services/organizations";
import { SUCCESS } from "../utils/constants/http-status";
import { InvalidInputError } from "../utils/errors/index";

export async function addOrganization(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
        const result = await Organization.addOrganization(request.body);

        response.status(SUCCESS.CREATED.CODE).send(result);
    } catch (error) {
        return next(error);
    }
}

export async function getOrganization(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
        if (!request.params?.id) {
            throw new InvalidInputError("Params needs to be passed");
        }
        const result = await Organization.getOrganization(request.params.id);

        response.status(SUCCESS.OK.CODE).send(result);
    } catch (error) {
        return next(error);
    }
}