import { Express } from "express";
import { topicRoutes } from "./topic.route";
import { homeRoutes } from "./home.route";
import { songRoutes } from "./song.route";

const routeClient = (app: Express) => {
  app.use("/", homeRoutes);

  app.use("/topics", topicRoutes);

  app.use("/songs", songRoutes);
};

export default routeClient;
