import { Router } from "express";
import { pepSearch } from "../../../controllers/search";
import { accessControlMiddleware } from "../../../middlewares/access";
import { ACCESS_LEVEL } from "../../../utils/configuration";

const searchRouter = Router();

searchRouter.get('/', accessControlMiddleware(ACCESS_LEVEL.USER), pepSearch);

export default searchRouter;