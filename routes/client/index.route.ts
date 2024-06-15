import { Express } from "express";
import { topicRoutes } from "./topic.route";
import { homeRoutes } from "./home.route";
import { songRoutes } from "./song.route";
import { searchRoutes } from "./search.route";

const routeClient = (app: Express) => {
  app.use("/", homeRoutes);

  app.use("/topics", topicRoutes);

  app.use("/songs", songRoutes);

  app.use("/search", searchRoutes);
};

export default routeClient;
