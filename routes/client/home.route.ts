import express, { Router } from "express";
const router: Router = express.Router();

import * as controller from "../../controllers/client/home.controller";

router.get("/", controller.index);

export const homeRoutes: Router = router;
