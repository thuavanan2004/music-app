import { dashboardRoutes } from "./dashboard.route";
import { systemConfig } from "../../config/system";

const adminRoutes = (app) => {
  const path = `/${systemConfig.prefixAdmin}`;

  app.use(`${path}/dashboard`, dashboardRoutes);
};

export default adminRoutes;
