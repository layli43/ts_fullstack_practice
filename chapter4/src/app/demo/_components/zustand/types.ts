import { createContext } from "react";

import type { LayoutComponent, LayoutMode } from "./constants";
import type { createLayoutStore } from "./store";

export enum ThemeMode {
  LIGHT = "light",
  DARK = "dark",
}

export interface LayoutOptions {
  mode: `${LayoutMode}`;
  theme: Partial<LayoutTheme>;
}

export interface LayoutActions {
  changeMode: (value: `${LayoutMode}`) => void;
  changeTheme: (value: Partial<LayoutTheme>) => void;
}

export type LayoutTheme = { [key in `${LayoutComponent}`]: `${ThemeMode}` };

/**
 * 布局全部状态类型
 */
export type LayoutState = LayoutOptions & LayoutActions;

/**
 * 布局状态池类型
 */
export type LayoutStoreType = ReturnType<typeof createLayoutStore>;

/**
 * 状态上下文包装器
 */
export const LayoutContext = createContext<LayoutStoreType | null>(null);
