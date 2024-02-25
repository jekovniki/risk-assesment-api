import { Router } from "express";
import { findPoliticalyExposedPerson } from "../../../controllers/search";
import { accessControlMiddleware } from "../../../middlewares/access";
import { validationMiddleware } from "../../../middlewares/validation";
import { ACCESS_LEVEL } from "../../../utils/configuration";
import { searchRequest } from "../../../dtos/search";
import { getLatestSearches } from "../../../controllers/users";

const searchRouter = Router();

/**
 * Using POST for search like a madman, because the GET requests 
 * gets really uggly with the multiple filters
**/ 
searchRouter.post('/', validationMiddleware(searchRequest), accessControlMiddleware(ACCESS_LEVEL.USER), findPoliticalyExposedPerson);
searchRouter.get('/history', accessControlMiddleware(ACCESS_LEVEL.USER), getLatestSearches);

export default searchRouter;