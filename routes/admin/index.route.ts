import { dashboardRoutes } from "./dashboard.route";
import { topicRoutes } from "./topic.route";
import { systemConfig } from "../../config/system";

const adminRoutes = (app) => {
  const path = `/${systemConfig.prefixAdmin}`;

  app.use(`${path}/dashboard`, dashboardRoutes);

  app.use(`${path}/topics`, topicRoutes);
};

export default adminRoutes;
