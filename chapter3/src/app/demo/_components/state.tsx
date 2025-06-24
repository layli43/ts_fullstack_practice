"use client";
import type { FC } from "react";

import { Button } from "antd";
import { clsx } from "clsx";
import { useState } from "react";

import $styles from "./style.module.css";

const StateDemo: FC = () => {
  // change these stated variables will trigger a re-render
  const [count, setCount] = useState(1);
  const [isShow, toggleShow] = useState<boolean>(true);

  return (
    <div className={clsx($styles.container, "tw-w-80")}>
      <h2 className="tw-text-center">useState Demo</h2>
      {isShow && <p className="tw-py-5 tw-text-center">{count}</p>}
      <div className="tw-flex tw-justify-around">
        <Button onClick={() => setCount(count + 1)} type="dashed">
          增加
        </Button>
        <Button onClick={() => setCount(count - 1)} type="dashed">
          减少
        </Button>
        <Button onClick={() => toggleShow(!isShow)} type="dashed">
          {isShow ? "隐藏" : "显示"}
        </Button>
      </div>
    </div>
  );
};
export default StateDemo;
