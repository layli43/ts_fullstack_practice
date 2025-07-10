"use client";
import { px2remTransformer, StyleProvider } from "@ant-design/cssinjs";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App as AntdApp, ConfigProvider, theme } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { type FC, type PropsWithChildren, use, useMemo } from "react";

import { Locale } from "./_components/context";
import { LocaleContext } from "./_components/context";
import { localeData } from "./_components/context/constants";
import {
  defaultThemeConfig,
  ThemeContext,
} from "./_components/reducer/constants";
import $styles from "./layout.module.css";
import { Theme } from "./_components/reducer";

const px2rem = px2remTransformer();

const DemoAntd: FC<PropsWithChildren> = ({ children }) => {
  const { locale } = use(LocaleContext);
  const antdLocaleData = useMemo(() => {
    if (!Object.keys(localeData).find((v) => v === locale.name)) {
      return localeData[0];
    }
    return localeData[locale.name];
  }, [locale.name]);

  const { state: themeState } = use(ThemeContext) || {
    state: defaultThemeConfig,
  };
  const algorithm = useMemo(() => {
    const result = [
      themeState.compact ? theme.compactAlgorithm : theme.defaultAlgorithm,
    ];
    if (themeState.mode === "dark") result.push(theme.darkAlgorithm);
    return result;
  }, [themeState]);
  
  return (
    <ConfigProvider
      locale={antdLocaleData}
      theme={{
        algorithm,
        // 启用css变量
        cssVar: true,
        hashed: false,
        token: {},
      }}
    >
      <AntdApp>
        <StyleProvider transformers={[px2rem]}>
          <div className={$styles.layout}>{children}</div>
        </StyleProvider>
      </AntdApp>
    </ConfigProvider>
  );
};
const DemoLayout: FC<PropsWithChildren> = ({ children }) => (
  <AntdRegistry>
    <Locale>
      <Theme>
        <DemoAntd>{children}</DemoAntd>
      </Theme>
    </Locale>
  </AntdRegistry>
);
export default DemoLayout;
