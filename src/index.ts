import express from "express";
import * as dotenv from "dotenv";
import userRoutes from "./userRoutes";

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
const json = express.json();
app.use(json);

app.use("/users", userRoutes);
app.get("/", (req, res) => {
  res.set("Content-Type", "text/html");
  res.status(200).send("<h1>Hello World</h1>");
});

app.listen(port, (error?: Error) => {
  if (!error) {
    console.info(`App successfully started and is listening on port ` + port);
    return;
  }

  console.error(`Error occurred, server can't start`, error);
});
