"use client";
import { Button } from "antd";
import { type FC, useEffect, useState } from "react";

import $styles from "./style.module.css";

/**
 * useEffect(setup, dependencies?)
 * react will compare each dependency with its previous value
 * After every re-render with changed dependencies, react will run cleanup function first(if it is provided) with the old values,
 * then run the setup function with the new values
 */
const EffectDemo: FC = () => {
  const [ghost, setGhost] = useState<boolean>(false);
  const [width, setWidth] = useState(0);
  const [danger, setDanger] = useState<boolean>(false);
  const toggleGhostBtn = () => setGhost(!ghost);
  const resizeHandle = () => setWidth(window.innerWidth);
  useEffect(
    () => {
      // setup
      if (typeof window !== "undefined") {
        console.log("浏览器宽度改变");
        window.addEventListener("resize", resizeHandle);
      }
      return () => {
        window.removeEventListener("resize", resizeHandle);
      };
    },
    // dependencies
    [width],
  );
  useEffect(() => {
    console.log("切换幽灵按钮");
  }, [ghost]);
  /**
   * async, promise and Asynchronous programming in js
   * Until ghost changed for 1s, the danger state will be set to true
   */
  useEffect(() => {
    (async () => {
      await new Promise((resolve) => {
        const timeOutId = setTimeout(() => resolve(true), 1000);
        return () => clearTimeout(timeOutId);
      });
      setDanger(ghost);
    })();
  }, [ghost]);
  return (
    <div className={$styles.container}>
      <h2 className="tw-text-center">useEffect Demo</h2>
      <p className="tw-py-5 tw-text-center">
        {ghost ? "ghost " : "normal "}button
      </p>
      <div className="tw-flex tw-flex-col tw-justify-center">
        <Button
          type="primary"
          onClick={toggleGhostBtn}
          ghost={ghost}
          danger={danger}
        >
          switch button style
        </Button>
        <p className="tw-pt-5 tw-text-center">width: {width}</p>
      </div>
    </div>
  );
};
export default EffectDemo;
