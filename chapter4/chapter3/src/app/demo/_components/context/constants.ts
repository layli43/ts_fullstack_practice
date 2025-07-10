import type { Locale } from "antd/es/locale";

import enUS from "antd/es/locale/en_US";
import zhCN from "antd/es/locale/zh_CN";

import type { LocaleType } from "./type";

/**
 * antd语言包
 */
export const localeData: Record<string, Locale> = {
  en_US: enUS,
  zh_CN: zhCN,
};

/**
 * 可选语言列表
 */
export const locales: LocaleType[] = [
  {
    name: "zh_CN",
    label: "cn 简体中文",
  },
  {
    name: "en_US",
    label: "en English",
  },
];
