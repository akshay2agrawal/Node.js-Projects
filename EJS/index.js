import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const date = new Date();
  let day = date.getDay();

  if (day === 6 || day === 5) {
    res.render(__dirname + "/views/index.ejs", {
      day: "Weekend",
    });
  } else {
    res.render(__dirname + "/views/index.ejs", {
      day: "Weekday",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
