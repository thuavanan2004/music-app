import express, { Router } from "express";
import * as controller from "../../controllers/admin/topic.controller";
import multer from "multer";
import { uploadSingle } from "../../middlewares/admin/uploadCloud.middleware";
const router: Router = express.Router();

const upload = multer();

router.get("/", controller.index);

router.patch("/change-multi", controller.changeMulti);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("avatar"),
  uploadSingle,
  controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch(
  "/edit/:id",
  upload.single("avatar"),
  uploadSingle,
  controller.editPatch
);

router.get("/detail/:id", controller.detail);

router.patch("/delete/:id", controller.deletePatch);

export const topicRoutes: Router = router;
