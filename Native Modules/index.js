const fs = require("node:fs");

fs.writeFile("message.txt", "Hello from Akshay!", (err) => {
  if (err) throw err;
  console.log("successfully created message.txt");
});

fs.readFile("message.txt", "utf-8", (err, data) => {
  console.log(data);
});
