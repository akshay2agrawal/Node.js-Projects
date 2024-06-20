import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import morgan from "morgan";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(customMiddleware);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// POST /login gets urlencoded bodies
app.post("/submit", function (req, res) {
  // console.log(req.body.street + req.body.pet);
  res.send(
    `<h1>Your band name is:<h1><h2>${req.body["street"]}${req.body["pet"]}<h2>`
  );
});

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});

function customMiddleware(req, res, next) {
  console.log("Custom Middleware executed");
  next();
}
