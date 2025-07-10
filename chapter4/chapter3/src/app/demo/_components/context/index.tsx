"use client";
import type { FC, PropsWithChildren } from "react";

import { Pagination, Select } from "antd";
import { createContext, use, useCallback, useMemo, useState } from "react";

import type { LocaleState, LocaleType } from "./type";

import $styles from "../style.module.css";
import { localeData, locales } from "./constants";

export const LocaleContext = createContext<LocaleState>({
  locale: locales[0],
  setLocale: (_locale: LocaleType) => {},
});

const LocaleProvider: FC<PropsWithChildren<LocaleState>> = ({
  locale,
  setLocale,
  children,
}) => {
  const value = useMemo(() => ({ locale, setLocale }), [locale]);
  return <LocaleContext value={value}>{children}</LocaleContext>;
};

export const LocaleConfig: FC = () => {
  /**
   *  useContext(someContext)/use(someContext)
   *  Parameters:The context that you've previously created with createContext
   *  The context itself can just be read or provided to component tree, because it doesn't hold any infomation inside
   *  Returns: useContext returns the context value for the context you passed, which was searched from the component tree by react.
   *  It is the closest context provider above for that particular context.
   */
  const { locale, setLocale } = use(LocaleContext);
  const changeLocale = (value: string) => {
    const current = locales.find((item) => item.name === value);
    current && setLocale(current);
  };
  return (
    <Select
      defaultValue={locale.name}
      style={{ width: 120 }}
      onChange={changeLocale}
    >
      {locales.map(({ name, label }) => (
        <Select.Option key={name} value={name}>
          {label}
        </Select.Option>
      ))}
    </Select>
  );
};

const ContextDemo: FC = () => {
  const { locale } = use(LocaleContext);
  return (
    <div className={$styles.container}>
      <h2 className="tw-text-center">useContext Demo</h2>
      <p className="tw-py-5 tw-text-center">current language: {locale.label}</p>
      <div className="tw-w-full">
        <h3>antd language switching test</h3>
        <div className="tw-my-4 tw-w-full">
          <LocaleConfig />
        </div>
      </div>
      <Pagination defaultCurrent={0} total={500} />
    </div>
  );
};
export default ContextDemo;

export const Locale: FC<PropsWithChildren> = ({ children }) => {
  const [locale, setLocale] = useState<LocaleType>(locales[0]);
  const changeLocale = useCallback((value: LocaleType) => {
    if (Object.keys(localeData).find((v) => v === value.name)) {
      setLocale(value);
    }
  }, []);
  return (
    <LocaleProvider locale={locale} setLocale={changeLocale}>
      {children}
    </LocaleProvider>
  );
};
