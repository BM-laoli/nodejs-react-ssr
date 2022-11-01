# 介绍

> 这是一个非常完全 且完善的SSR 同构方案

# Todo

> 我们需要完成下面的这些事情

❎ simple babel+gulp compile 工程化
❎ base SSR
❎ Vite babel -> es 和 jsx
❎ code splice
❎ ts
❎ 部署
❎ 压测

# 细节描述

## 处理jsx ssr 的server 问题

> 实际上就是一个问题：“如何编译一些不合法的js ，如何使用babel 并且能获取它的HRM能力 ”, 我们先使用

解决上述问题 只需要简单的配置就好了

```shell
./node_modules/.bin/babel ./src -d ./dist -w
nodemon ./dist
npm-run-all --parallel dev:**
```

实际上我们只需要处理两个事情

1. 客户端 es6 jsx 编译到 nodejs 执行
2. client 单独编译 到js 方便 hydrate

```js

```
