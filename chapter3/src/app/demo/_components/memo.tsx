"use client";
import type { FC } from "react";

import { Button } from "antd";
import clsx from "clsx";
import { memo, useMemo, useState } from "react";

import $styles from "./style.module.css";

/**
 * When the parent component re-renders, the child components will also re-render
 * Using memo will fix the repeated rendering issue
 * useMemo/memo() make rendering happen only when dependencies change
 * useMemo will cache the return value of the function
 */

const ChildCom1: FC<{ value: number }> = memo(({ value }) => {
  console.log("ChildCom1 render");
  return null;
});

const ChildCom2: FC<{ value: number }> = memo(({ value }) => {
  console.log("ChildCom2 render");
  return null;
});

const MemoDemo: FC = () => {
  const [count1, setCount1] = useState(1);
  const [count2, setCount2] = useState(2);
  const MemoChildCom1 = useMemo(() => <ChildCom1 value={count1} />, [count1]);
  const MemoChildCom2 = useMemo(() => <ChildCom2 value={count2} />, [count2]);
  return (
    <div className={clsx($styles.container, "tw-w-80")}>
      <h2 className="tw-text-center">useMemo demo</h2>
      <div className="tw-flex tw-justify-around">
        <Button
          onClick={() => setCount1(Math.ceil(Math.random() * 10))}
          type="dashed"
        >
          变化count1
        </Button>
        <Button
          onClick={() => setCount2(Math.ceil(Math.random() * 10))}
          type="dashed"
        >
          变化count2
        </Button>
      </div>
      <div className="tw-flex tw-justify-around">
        {MemoChildCom1}
        {MemoChildCom2}
      </div>
    </div>
  );
};
export default MemoDemo;
