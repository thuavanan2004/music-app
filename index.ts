import express, { Express } from "express";
import bodyParser from "body-parser";
import connect from "./config/database";
import env from "dotenv";
env.config();
import routeClient from "./routes/client/index.route";

const port: number | string = process.env.PORT || 3002;
const app: Express = express();
connect();

app.set("views", "./views");
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));

routeClient(app);

app.listen(port, () => {
  console.log(`Sever is listening port ${port} `);
});
