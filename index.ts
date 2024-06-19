import express, { Express } from "express";
import bodyParser from "body-parser";
import connect from "./config/database";
import env from "dotenv";
env.config();
import clientRoutes from "./routes/client/index.route";
import adminRoutes from "./routes/admin/index.route";
import path from "path";
import { systemConfig } from "./config/system";

const port: number | string = process.env.PORT || 3002;
const app: Express = express();
connect();

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

app.locals.prefixAdmin = systemConfig.prefixAdmin;

clientRoutes(app);
adminRoutes(app);

app.listen(port, () => {
  console.log(`Sever is listening on port ${port}`);
});
