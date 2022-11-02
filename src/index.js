import React from "react";
import axios from "axios";
import express from "express";
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

const injectCssStyle  = () => {
  // 读取 client fs
  return  ''
}

const injectCssLink  = ( links ) => {
  let temp = '';

  links.forEach( (item ) => {
      temp += `<link rel="stylesheet" href="${item}"> </link>
      `
  } )

  return temp
};

const htmlTLP = (reactContentStream, data, links ) => ` 
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    ${links || ''}
    
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

app.get('/', (req, res) => {
  res.redirect('/home')
});

app.get("/p/*", async (req, res) => {
  res.setHeader("Content-Type", "text/html");
  const data = {
    name: "",
    page: req.path,
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
  res.send(htmlTLP(reactContentStream, data, injectCssLink([
    '/style/home/index.css'
  ])));
});


app.get("/home", async (req, res) => {
  res.setHeader("Content-Type", "text/html");
  const data = {
    name: "",
    page: "/home",
    message: "home",
    basename: "home",
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

app.get("/home2", async (req, res) => {
  res.setHeader("Content-Type", "text/html");
  const value = await axios.get("http://localhost:3030/api/users");
  const data = {
    name: "",
    page: "/home2",
    message: "",
    basename: "home",
    list: [],
    // 页面特定的 每个页面都不一样
    data: value.data.data,
  };
  const reactContentStream = render(req.path, data);
  res.send(htmlTLP(reactContentStream, data));
});

app.listen(3030);
