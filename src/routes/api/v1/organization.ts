import { Router } from "express";
import { addOrganization, getOrganization } from "../../../controllers/organization";
import { accessControlMiddleware } from "../../../middlewares/access";
import { ACCESS_LEVEL } from "../../../utils/configuration";

const organizationRouter = Router();

organizationRouter.post('/', accessControlMiddleware(ACCESS_LEVEL.USER), addOrganization);
organizationRouter.get('/:id', accessControlMiddleware(ACCESS_LEVEL.USER), getOrganization);


export default organizationRouter;