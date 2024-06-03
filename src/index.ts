import express from "express";
import * as dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
const json = express.json();
app.use(json);

const userController = require("./usercontroller");

app.get("/users", userController.getAllUsers);
app.post("/users", userController.createUser);
app.get("/users/:id", userController.getUserById);
app.put("/users/:id", userController.updateUser);
app.delete("/users/:id", userController.deleteUser);

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
