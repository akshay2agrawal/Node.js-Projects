import express from "express";

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

app.get("/contact", (req, res) => {
  res.send("<h1> LinkedIn: www.linkedin.com/in/akshay2agrawal </h1>");
});

app.get("/About-me", (req, res) => {
  res.send("<p>Hey! My name is Akshay. </p>");
});
