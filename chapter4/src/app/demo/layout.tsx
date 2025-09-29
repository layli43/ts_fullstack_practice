"use client";
import { px2remTransformer, StyleProvider } from "@ant-design/cssinjs";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App as AntdApp, ConfigProvider } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { type FC, type PropsWithChildren, use, useMemo } from "react";

import Theme from "../_components/theme";
import { useAntdAlgorithm } from "../_components/theme/hooks";
import { Locale } from "./_components/context";
import { LocaleContext } from "./_components/context";
import { localeData } from "./_components/context/constants";
import { LayoutStore } from "./_components/zustand";
import $styles from "./layout.module.css";

const px2rem = px2remTransformer();

const DemoAntd: FC<PropsWithChildren> = ({ children }) => {
  const { locale } = use(LocaleContext);
  const antdLocaleData = useMemo(() => {
    if (!Object.keys(localeData).find((v) => v === locale.name)) {
      return localeData[0];
    }
    return localeData[locale.name];
  }, [locale.name]);

  // const { state: themeState } = use(ThemeContext) || {
  //   state: defaultThemeConfig,
  // };
  // const algorithm = useMemo(() => {
  //   const result = [
  //     themeState.compact ? theme.compactAlgorithm : theme.defaultAlgorithm,
  //   ];
  //   if (themeState.mode === "dark") result.push(theme.darkAlgorithm);
  //   return result;
  // }, [themeState]);
  const algorithm = useAntdAlgorithm();

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
  <LayoutStore>
    <AntdRegistry>
      <Locale>
        <Theme>
          <DemoAntd>{children}</DemoAntd>
        </Theme>
      </Locale>
    </AntdRegistry>
  </LayoutStore>
);
export default DemoLayout;
