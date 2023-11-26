import { Router } from "express";
import { pepSearch } from "../../../controllers/search";

const searchRouter = Router();

searchRouter.get('/', pepSearch);

export default searchRouter;