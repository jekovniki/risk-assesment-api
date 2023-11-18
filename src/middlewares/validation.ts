import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodOptional } from "zod";
import { ERRORS } from "../utils/constants/http-status";
import { handleErrors } from "../utils/errors";

export const validationMiddleware = (schema: AnyZodObject | ZodOptional<AnyZodObject>, isQuery: boolean = false) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      if (isQuery) {
        await schema.parseAsync(request.query);
      } else {
        await schema.parseAsync(request.body);
      }
      next();
    } catch (error) {
      handleErrors(error);
      response.status(ERRORS.BAD_REQUEST.CODE).send({
        success: false,
        message: ERRORS.BAD_REQUEST.MESSAGE,
      });
    }
  };
