import express, { Router } from "express";
const router: Router = express.Router();

import * as controller from "../../controllers/client/topic.controller";

router.get("/", controller.index);

export const topicRoutes: Router = router;
