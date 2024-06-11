import inquirer from "inquirer";
import qr from "qr-image";
import fs from "node:fs";

inquirer
  .prompt([
    {
      name: "qr message",
      message: "Provide a text to generate its QR code",
      type: "input",
    },
  ])
  .then((answers) => {
    var qr_png = qr.image(answers["qr message"]); //type not defined explicitly as default is png
    qr_png.pipe(fs.createWriteStream("qr_code.png"));
    fs.writeFile("qr_text.txt", answers["qr message"], (err) => {
      if (err) throw err;
      console.log("successfully generated the QR code as qr_code.png");
    });
  })
  .catch((error) => {
    console.log("Error in getting input", error);
  });
