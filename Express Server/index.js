import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import morgan from "morgan";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use(morgan("combined"));
app.use(customMiddleware);

// POST /login gets urlencoded bodies
app.post("/submit", urlencodedParser, function (req, res) {
  console.log(req.body);
});

// POST /api/users gets JSON bodies
app.post("/api/users", jsonParser, function (req, res) {
  // create user in req.body
  console.log("user route");
  res.send("user route" + req.body);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});

function customMiddleware(req, res, next) {
  console.log("Custom Middleware executed");
  next();
}
