import express from "express";
import React from "react";
import PageHome from "./client/modules/Home";
const ejs = require("ejs");
import { render } from "./server";

const app = express();
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.setHeader("Content-Type", "text/html");
  const html = render(<PageHome></PageHome>);
  ejs
    .renderFile("../public/index.ejs", {
      title: "home",
      html: html,
    })
    .then((data) => {
      res.send(data);
    });
});

app.listen(3000);
