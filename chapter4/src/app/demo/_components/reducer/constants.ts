import { createContext } from "react";

import type { ThemeState } from "./types";
import type { ThemeContextType } from "./types";

export const defaultThemeConfig: ThemeState = {
  mode: "light",
  compact: false,
};

export const ThemeContext = createContext<ThemeContextType | null>(null);
