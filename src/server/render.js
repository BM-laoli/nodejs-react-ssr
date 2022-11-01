import { renderToString } from "react-dom/server";

const render = (component) => {
  // 做些什么
  return renderToString(component);
};

export { render };
