"use client";
import { Button } from "antd";
import { type FC, useEffect, useState } from "react";

import $styles from "./style.module.css";

const EffectDemo: FC = () => {
  const [ghost, setGhost] = useState<boolean>(false);
  const [width, setWidth] = useState(0);
  const toggleGhostBtn = () => setGhost(!ghost);
  const resizeHandle = () => setWidth(window.innerWidth);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
      console.log("浏览器宽度改变");
      window.addEventListener("resize", resizeHandle);
    }
  });
  useEffect(() => {
    console.log("切换幽灵按钮");
  });
  return (
    <div className={$styles.container}>
      <h2 className="tw-text-center">useEffect Demo</h2>
      <p className="tw-py-5 tw-text-center">
        {ghost ? "ghost" : "normal "}button
      </p>
      <div className="tw-flex tw-flex-col tw-justify-center">
        <Button type="primary" onClick={toggleGhostBtn} ghost={ghost}>
          switch button style
        </Button>
        <p className="tw-pt-5 tw-text-center">width: {width}</p>
      </div>
    </div>
  );
};
export default EffectDemo;
