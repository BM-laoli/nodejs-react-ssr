export interface InterRouter {
  [key: string]: {
    path: string;
  };
}

enum PageAlisaEum {
  Home = 'home',
  Nas = 'nas',
}

const routers: InterRouter = {
  [PageAlisaEum.Home]: {
    path: '/home',
  },
  [PageAlisaEum.Nas]: {
    path: '/nas',
  },
};

export { routers, PageAlisaEum };
