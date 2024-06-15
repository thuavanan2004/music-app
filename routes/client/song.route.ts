import express, { Router } from "express";
const router: Router = express.Router();

import * as controller from "../../controllers/client/song.controller";

router.get("/favorite", controller.favorite);

router.get("/:slugTopic", controller.index);

router.get("/:detail/:slugSong", controller.detail);

router.patch("/feelings/:status/:idSong", controller.feelings);

router.patch("/favorite/:status/:idSong", controller.favoritePatch);

export const songRoutes: Router = router;
