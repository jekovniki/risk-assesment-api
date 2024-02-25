import { Router } from "express";
import { accessControlMiddleware } from "../../../middlewares/access";
import { ACCESS_LEVEL } from "../../../utils/configuration";
import { getEntities, getGenders } from "../../../controllers/options";

const searchOptionsRouter = Router();

/**
 * Using POST for search like a madman, because the GET requests 
 * gets really uggly with the multiple filters
**/ 
searchOptionsRouter.get('/genders', accessControlMiddleware(ACCESS_LEVEL.USER), getGenders);
searchOptionsRouter.get('/entities', accessControlMiddleware(ACCESS_LEVEL.USER), getEntities);

export default searchOptionsRouter;