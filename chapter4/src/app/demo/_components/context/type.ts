export interface LocaleType {
  /**
   * 语言名称
   */
  name: string;
  /**
   * 语言标签
   */
  label: string;
}

export interface LocaleState {
  locale: LocaleType;
  setLocale: (locale: LocaleType) => void;
}
