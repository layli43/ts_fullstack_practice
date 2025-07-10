"use client";
import type { ChangeEventHandler, FC } from "react";

import { Button } from "antd";
import clsx from "clsx";
import { isNaN, isNil } from "lodash";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import $styles from "./style.module.css";
interface RefFunc {
  focus: () => void;
  memo: () => number;
}
const MyInput = forwardRef<
  RefFunc, // 👈 Type of the ref (what it points to)
  { value: number; changeValue: (v: number) => void } // 👈 Props passed to the component
>(({ value, changeValue }, ref) => {
  const [local, setLocal] = useState<number | string>(value);
  const inputRef = useRef<HTMLInputElement | null>(null);
  /**
   * useImperativeHandle(ref, createHandle, dependencies)
   * Passing function to parent component
   * ref:dom node refered by a variable in parent component
   * createHandle: return the value and methods that can be used in parent component
   * dependencies: when dependencies change,the createHandle will be recalled
   */
  useImperativeHandle(
    ref,
    () => ({
      focus: () => inputRef.current && inputRef.current.focus,
      memo: () => value,
    }),
    [value],
  );
  useEffect(() => {
    changeValue(isNaN(Number(local)) ? 0 : Number(local));
  }, [changeValue, local]);
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setLocal(e.target.value);
    },
    [],
  );
  return (
    <input
      value={value}
      ref={inputRef}
      placeholder="please enter value"
      onChange={handleChange}
    ></input>
  );
});

const ForwardRefDemo: FC = () => {
  const [count, setCount] = useState(0);
  const ref = useRef<RefFunc | null>(null);
  const inited = useRef(count);
  useEffect(() => {
    ref.current && ref.current.focus();
  }, []);
  useEffect(() => {
    if (inited.current !== count) {
      inited.current = count;
      console.log("changed");
    }
  }, [count]);
  return (
    <div className={clsx($styles.container, "tw-w-80")}>
      <h2 className="tw-text-center">forwardRef Demo</h2>
      <p className="tw-py-5 tw-text-center">{count}</p>
      <div className="tw-flex tw-justify-around">
        <Button
          onClick={() => setCount(Math.ceil(Math.random() * 10))}
          type="dashed"
        >
          变化
        </Button>
      </div>
      <div className="tw-flex tw-flex-col">
        {!isNil(ref.current) && (
          <p className="tw-my-3">前一个值: {ref.current.memo()}</p>
        )}
        <p>
          ref property can build a reference to the dom node with a variable,and
          operate that dom node with the variable
        </p>
        <MyInput ref={ref} value={count} changeValue={setCount} />
      </div>
    </div>
  );
};
export default ForwardRefDemo;
