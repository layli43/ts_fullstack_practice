/**
 * 状态选择器
 * @param selector
 */

import { use } from "react";
import { useStore } from "zustand";
import { useShallow } from "zustand/shallow";

import type { LayoutState } from "./types";

import { LayoutContext } from "./types";

export function useLayoutContext<T>(selector: (state: LayoutState) => T): T {
  const store = use(LayoutContext);
  if (!store) throw new Error("Missing LayoutContext.Provider in the tree");
  return useStore(store, useShallow(selector));
}
