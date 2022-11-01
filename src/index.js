import express from "express";
import React from "react";
const ejs = require("ejs");
const { join } = require("path");

import { render } from "./server";

const app = express();
app.use(express.static("public"));

app.get("*", function (req, res) {
  res.setHeader("Content-Type", "text/html");

  ejs
    .renderFile(join(__dirname, 'index.ejs' ), {
      title: "home",
      html: render(req.path),
      data: {
        name:"1",
        page:"2",
        message:'3',
        list: '4',
        // 页面特定的 每个页面都不一样
        data: '5'
      }
    })
    .then((data) => {
      res.send(data);
    });
});


app.listen(3030);
