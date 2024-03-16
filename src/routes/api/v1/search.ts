import { Router } from "express";
import { search } from "../../../controllers/search";
import { accessControlMiddleware } from "../../../middlewares/access";
import { validationMiddleware } from "../../../middlewares/validation";
import { searchRequest } from "../../../dtos/search";
import { getLatestSearches } from "../../../controllers/users";

const searchRouter = Router();

/**
 * Using POST for search like a madman, because the GET requests 
 * gets really uggly with the multiple filters
**/ 
searchRouter.post('/', validationMiddleware(searchRequest), accessControlMiddleware(), search);
searchRouter.get('/history', accessControlMiddleware(), getLatestSearches);

export default searchRouter;