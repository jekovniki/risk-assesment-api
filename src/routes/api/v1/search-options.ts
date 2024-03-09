import { Router } from "express";
import { accessControlMiddleware } from "../../../middlewares/access";
import { getEntities, getGenders } from "../../../controllers/options";

const searchOptionsRouter = Router();

/**
 * Using POST for search like a madman, because the GET requests 
 * gets really uggly with the multiple filters
**/ 
searchOptionsRouter.get('/genders', accessControlMiddleware(), getGenders);
searchOptionsRouter.get('/entities', accessControlMiddleware(), getEntities);

export default searchOptionsRouter;