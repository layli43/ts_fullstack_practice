"use client";

import type { FC } from "react";

import { Button } from "antd";
import clsx from "clsx";
import { memo, useCallback, useEffect, useState } from "react";

import $styles from "./style.module.css";

/**
 * useCallBack(fn, dependencies)
 * Function useCallBack can cache a function definition between re-rendering.
 * dependencies is all the reactive variables referenced inside the function fn.
 * Re-rendering will change the stack address of the referenced function
 */
const Info: FC<{ call: () => void }> = memo(() => {
  console.log("components rendering");
  return null;
});

export const CallbackDemo: FC = () => {
  const [, setCount] = useState<number>(0);
  const changeCount = () => setCount(Math.ceil(Math.random() * 10));
  const getInfo = useCallback(() => {}, []);
  useEffect(() => {
    console.log("getInfo function changed");
  }, [getInfo]);
  return (
    <div className={clsx($styles.container, "tw-w-80")}>
      <h2 className="tw-text-center">useCallBack Demo</h2>
      <div className="tw-flex tw-justify-around">
        <Info call={getInfo} />
        <Button onClick={changeCount} type="dashed">
          count changing
        </Button>
      </div>
    </div>
  );
};
