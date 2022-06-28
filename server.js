import express from "express";
const server = express();
import nunjucks from "nunjucks";
import multer from "multer";
import path from "path";
import request from "request";
const __dirname = path.resolve();

server.listen(5000);
server.set("view engine", "njk");

nunjucks.configure("views", {
  express: server,
  noCache: false,
});
server.use(express.urlencoded({ extended: true }));
server.use(express.static("static/"));

server.get("/", (req, res) => {
  return res.render("./index");
});
server.get("/about", (req, res) => {
  return res.render("./about");
});
server.get("/result", (req, res) => {
  return res.render("./result");
});
server.get("/image-upload", function (req, res) {
  return res.render("./image-upload");
});
//multer options

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "static/assets/images");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + ".JPG");
  },
});
const upload = multer({
  storage: storage,
}).single("myImage");

server.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log("ERROR", err);
      res.send("ERROR");
    } else {
      if (req.file == undefined) {
        res.send("No data selected");
      } else {
        file: `uploads/${req.file.filename}`;
        request(
          "http://127.0.0.1:3000/flask",
          function (error, response, body) {
            console.error("error:", error); // Print the error
            console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
            console.log("body:", body); // Print the data received
            res.send(body); //Display the response on the website
          }
        );
      }
    }
  });
});
server.get("/home", function (req, res) {
  request("http://127.0.0.1:3000/flask", function (error, response, body) {
    console.error("error:", error); // Print the error
    console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
    console.log("body:", body); // Print the data received
    res.send(body); //Display the response on the website
  });
});
