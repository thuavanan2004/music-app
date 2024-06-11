import { Express } from "express";
import { topicRoutes } from "./topic.route";
import { homeRoutes } from "./home.route";

const routeClient = (app: Express) => {
  app.use("/", homeRoutes);

  app.use("/topics", topicRoutes);
};

export default routeClient;
