"use client";
import type { FC } from "react";

import { Button } from "antd";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

import $styles from "./style.module.css";

const RefDemo: FC = () => {
  const [count, setCount] = useState(0);
  /**
   * useRef return a ref object with a single current property
   * it will store the initial value and never get re-rendered
   */
  const inited = useRef(count);

  useEffect(() => {
    if (inited.current !== count) {
      inited.current = count;
      console.log("changes");
    }
  }, [count]);

  return (
    <div className={clsx($styles.container, "tw-ws-80")}>
      <h2 className="tw-text-center">useRef Demo</h2>
      <p className="tw-py-5 tw-text-center">{count}</p>
      <div className="tw-flex tw-justify-around">
        <Button onClick={() => setCount(Math.random() * 10)} type="dashed">
          change
        </Button>
      </div>
    </div>
  );
};
export default RefDemo;
