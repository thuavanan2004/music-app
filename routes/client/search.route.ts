import express, { Router } from "express";
const router: Router = express.Router();

import * as controller from "../../controllers/client/search.controller";

router.get("/result", controller.result);

export const searchRoutes: Router = router;