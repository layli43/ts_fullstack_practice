import type { DeepPartial } from "utility-types";

import { isNil } from "lodash";
import { createStore } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { deepMerge } from "@/libs/util";

import type { LayoutActions, LayoutOptions } from "./types";
import type { ThemeMode } from "./types";

/**
 * 状态池创建函数 state is the whole object of {mode, theme, changeMode, changeTheme}
 */
export const createLayoutStore = (options: DeepPartial<LayoutOptions> = {}) =>
  createStore<LayoutOptions & LayoutActions>()(
    /**
     * 'subscribeWithSelector can log the changed state
     */
    subscribeWithSelector(
      immer(
        /**
         * 'devtools' can store state in redux(need to install redux extension)
         */
        devtools(
          /**
           * 'persist' is to store data in localstorage
           */
          persist(
            (set) => ({
              ...deepMerge<LayoutOptions, DeepPartial<LayoutOptions>>(
                {
                  mode: "side",
                  theme: {
                    header: "light",
                    sidebar: "dark",
                  },
                },
                options,
                "replace",
              ),
              changeMode: (value) => set(() => ({ mode: value })),
              changeTheme: (value) =>
                set((state) => {
                  let { sidebar } = state.theme;
                  if (!isNil(value.sidebar)) sidebar = value.sidebar;
                  else if (!isNil(value.header))
                    sidebar = value.header === "light" ? "dark" : "light";
                  // 使header和sidebar样式相反
                  const header: `${ThemeMode}` =
                    sidebar === "light" ? "dark" : "light";
                  return { theme: { sidebar, header } };
                }),
            }),
            {
              name: "zustand-demo",
            },
          ),
          {
            name: "zustandDemo",
          },
        ),
      ),
    ),
  );

// const useLayoutStore = createLayoutStore();

// useLayoutStore.subscribe(
//   (state) => state.mode,
//   (value) => console.log(value),
//   {
//     equalityFn: shallow,
//     fireImmediately: true,
//   },
// );

// export { useLayoutStore };
