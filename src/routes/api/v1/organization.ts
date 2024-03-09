import { Router } from "express";
import { addOrganization, getOrganization } from "../../../controllers/organization";
import { accessControlMiddleware } from "../../../middlewares/access";

const organizationRouter = Router();

organizationRouter.post('/', accessControlMiddleware(), addOrganization);
organizationRouter.get('/:id', accessControlMiddleware(), getOrganization);


export default organizationRouter;