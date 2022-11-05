import React, { useEffect } from "react";
import Button from "@/shared/components/Button";

import "./code.css";
import "./page.scss";

export const query = {
  modelName: "User",
  select: ["firstName", "lastName"],
};

export { getDocumentProps };
function getDocumentProps(pageProps: any) {
  return {
    title: pageProps.product.name,
    description: pageProps.product.description,
  };
}

export { Page };

function Page(initialState: any) {
  // const count = usePageContext()
  useEffect(() => {
    console.log("initData", initialState);
  }, []);

  return (
    <>
      <h1>About</h1>
      <p className="my-scss">F</p>
      <p>
        Demo using <code>vite-plugin-ssr</code>.
      </p>
      <Button onChange={() => {}}>点击我</Button>
    </>
  );
}
