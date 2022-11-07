import React, { useContext, useEffect } from "react";
import { Counter } from "./Counter";
import { observer, useLocalObservable } from "mobx-react";
import { appStore } from "@/shared/store";

export { Page };
export const getDescription = (pageProps: any) =>
  `User: ${pageProps.firstName} ${pageProps.lastName}`;
export const fn = (pageProps: any) => {
  return "2";
};

export const query = { modelName: "Product", select: ["name", "price"] };

const Page = observer(() => {
  const { name, fetchName } = useLocalObservable(() => appStore.home);
  useEffect(() => {
    console.log("home name", name);
  }, []);

  return (
    <>
      <h1>Welcome</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Interactive. <Counter />
        </li>
      </ul>
      <br />
      <p>{name}</p>
    </>
  );
});
