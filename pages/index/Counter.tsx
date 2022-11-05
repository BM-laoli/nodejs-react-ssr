import { appStore } from "@/shared/store";
import { observer, useLocalObservable } from "mobx-react";
import React, { useEffect, useState } from "react";

export { Counter };

const Counter = observer(() => {
  const [count, setCount] = useState(0);
  const { fetchName } = useLocalObservable(() => appStore.home);

  useEffect(() => {
    console.log("count", count);
    fetchName((count || 0).toString());
  }, [count]);

  return (
    <>
      <div>👌</div>
      <br />
      <button type="button" onClick={() => setCount((count) => count + 1)}>
        Counter {count}
      </button>
    </>
  );
});
