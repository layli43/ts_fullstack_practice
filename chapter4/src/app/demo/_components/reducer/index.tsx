"use client";
import type { FC, PropsWithChildren, Reducer } from "react";

import { Calendar, Switch } from "antd";
import { produce } from "immer";
import { isNil } from "lodash";
import { use, useEffect, useMemo, useReducer } from "react";

import type { ThemeAction, ThemeState } from "./types";

import $styles from "../style.module.css";
import { defaultThemeConfig, ThemeContext } from "./constants";

/**
 * immer: 保障数据唯一性
 */

/**
 * Reducer can consolidate state logic.
 * You can put change, add, delete and all the other logic in one place.
 */
const ThemeReducer: Reducer<ThemeState, ThemeAction> = produce(
  (draft, action) => {
    switch (action.type) {
      case "change_mode":
        draft.mode = action.value;
        break;
      case "change_compact":
        draft.compact = action.value;
        break;
      default:
        break;
    }
  },
);

const defaultData: Partial<ThemeState> = {};

export const Theme: FC<PropsWithChildren<{ data?: ThemeState }>> = ({
  data = defaultData,
  children,
}) => {
  /**
   * useReducer(reducer, initialArg, initFunction)
   * reducer: your reducer function (e.g. ThemeReducer)
   * initialArg: the initial value (e.g. data)
   * initFunction: a function that receives initialArg and returns the initial state after opration
   */
  const [state, dispatch] = useReducer(ThemeReducer, data, (initData) => ({
    ...defaultThemeConfig,
    ...initData,
  }));
  useEffect(() => {
    const html = document.getElementsByTagName("html");
    if (html.length) {
      html[0].classList.remove("light");
      html[0].classList.remove("dark");
      html[0].classList.add(state.mode === "dark" ? "dark" : "light");
    }
  }, [state.mode]);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <ThemeContext value={value}>{children}</ThemeContext>;
};

export const ThemeConfig: FC = () => {
  const context = use(ThemeContext);
  if (isNil(context)) return null;
  const { state, dispatch } = context;
  const toggleMode = () =>
    dispatch({
      type: "change_mode",
      value: state.mode === "light" ? "dark" : "light",
    });
  const toggleCompact = () =>
    dispatch({ type: "change_compact", value: !state.compact });
  return (
    <>
      <Switch
        checkedChildren="Dark Mode"
        unCheckedChildren="Light Mode"
        onChange={toggleMode}
        checked={state.mode === "dark"}
        defaultChecked={state.mode === "dark"}
      />
      <Switch
        checkedChildren="紧凑"
        unCheckedChildren="正常"
        onChange={toggleCompact}
        checked={state.compact}
        defaultChecked={state.compact}
      />
    </>
  );
};

const ReducerDemo: FC = () => {
  const context = use(ThemeContext);
  if (isNil(context)) return null;
  const {
    state: { mode, compact },
  } = context;
  return (
    <div className={$styles.container}>
      <h2 className="tw-text-center">useReducer Demo</h2>
      <div className="tw-flex tw-flex-col tw-items-center">
        <p>主题模式: {mode === "dark" ? "暗黑" : "明亮"}</p>
        <p>是否紧凑: {compact ? "是" : "否"}</p>
        <div className="tw-mb-5 tw-flex-auto">
          <ThemeConfig />
        </div>
        <div className="tw-max-w-md">
          <Calendar fullscreen={false} />
        </div>
      </div>
    </div>
  );
};

export default ReducerDemo;
