# 介绍

## 文件夹结构
## 规范

.
├── core
│   ├── commonService
│   │   ├── bootstrap.ts
│   │   ├── index.ts
│   │   ├── ssr
│   │   │   ├── hooks
│   │   │   │   └── useInitState.tsx
│   │   │   ├── render
│   │   │   │   ├── render.decorator.ts
│   │   │   │   ├── render.interceptor.ts
│   │   │   │   └── server.tsx
│   │   │   └── utils
│   │   │       └── index.ts
│   │   └── types
│   │       └── index.ts
│   ├── commonUI
│   │   ├── components
│   │   │   ├── Button.tsx
│   │   │   └── Link.tsx
│   │   └── index.ts
│   └── index.ts
├── main.ts
└── modules
    ├── Home
    │   ├── controller
    │   │   └── home.controller.ts
    │   ├── home.client.tsx
    │   ├── home.module.ts
    │   ├── home.view.tsx
    │   └── service
    │       └── home.service.ts
    └── Nas
        ├── controller
        │   └── nas.controller.ts
        ├── nas.client.tsx
        ├── nas.module.ts
        └── nas.view.tsx
