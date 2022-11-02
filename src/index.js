import axios from "axios";
import { kMaxLength } from "buffer";
import express from "express";
import React from "react";
const ejs = require("ejs");
const { join } = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");
import { render } from "./server";

const app = express();
app.use(express.static("public"));

app.use(
  "/api",
  createProxyMiddleware({
    target: "https://reqres.in/",
    changeOrigin: true,
    secure: false,
  })
);

const htmlTLP = (reactContentStream, data) => ` 
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title></title>
</head>
<body>
  <div id="root"> ${reactContentStream} </div>
  <!-- 注水 -->
  <script>
  window.__INIT_STATE__ = ${JSON.stringify(data)};
  </script>

  <!-- 绑定事件 -->
  <script src="/js/app.js"></script>
</body>
</html>
`;

app.get("/pro/*", async (req, res) => {
  res.setHeader("Content-Type", "text/html");
  const data = {
    name: "",
    page: "",
    message: "pro",
    basename: "pro",
    list: [],
    // 页面特定的 每个页面都不一样
    data: [
      {
        email: "861795660@qq.com",
        id: 1,
      },
    ],
  };

  const reactContentStream = render(req.path, data);

  res.send(htmlTLP(reactContentStream, data));
});

app.get("/home/*", async (req, res) => {
  res.setHeader("Content-Type", "text/html");
  const value = await axios.get("http://localhost:3030/api/users");
  const data = {
    name: "",
    page: "home",
    message: "",
    basename: "home",
    list: [],
    // 页面特定的 每个页面都不一样
    data: value.data.data,
  };
  const reactContentStream = render(req.path, data);
  console.log("reactContentStream", reactContentStream);
  res.send(htmlTLP(reactContentStream, data));
});

app.listen(3030);
