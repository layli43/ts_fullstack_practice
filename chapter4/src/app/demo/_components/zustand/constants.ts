/**
 * 布局模式
 */
export enum LayoutMode {
  /** 只有顶栏导航 */
  TOP = "top",
  /** 侧边导航，顶栏自定义 */
  SIDE = "side",
  /** 同side,但是LOGO在顶栏目 */
  CONTENT = "content",
}

export enum LayoutComponent {
  HEADER = "header",
  SIDEBAR = "sidebar",
}

export enum LayoutActionType {
  CHANGE_MODE = "change_mode",
  CHANGE_THEME = "change_theme",
}
