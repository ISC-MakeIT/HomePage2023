const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
} as const;

type Breakpoints = typeof breakpoints; // breakpoints変数から型を作成
type Breakpointkeys = keyof Breakpoints; // オブジェクト型のkeyからユニオン型を作成("sm" | "md" | "lg" | "xl")

type ArgumentBreakpoint = Breakpointkeys | number; //引数の型

const isBreakpointkeys = (value: any): value is Breakpointkeys => {
  return value in breakpoints; //breakpointsに対象のプロパティがあるかチェック
};

export const minScreen = (breakpoint: ArgumentBreakpoint) => {
  const mediaQuery = isBreakpointkeys(breakpoint)
    ? `@media (min-width: ${breakpoints[breakpoint]})`
    : `@media (min-width: ${breakpoint}px)`;
  return mediaQuery;
};

export const notMinScreen = (breakpoint: ArgumentBreakpoint) => {
  const mediaQuery = isBreakpointkeys(breakpoint)
    ? `@media not all and (min-width: ${breakpoints[breakpoint]})`
    : `@media not all and (min-width: ${breakpoint}px)`;
  return mediaQuery;
};

export const minScreenHeight = (breakpoint: ArgumentBreakpoint) => {
  const mediaQuery = isBreakpointkeys(breakpoint)
    ? `@media (min-height: ${breakpoints[breakpoint]})`
    : `@media (min-height: ${breakpoint}px)`;
  return mediaQuery;
};

export const maxScreen = (breakpoint: ArgumentBreakpoint) => {
  const mediaQuery = isBreakpointkeys(breakpoint)
    ? `@media (max-width: ${breakpoints[breakpoint]})`
    : `@media (max-width: ${breakpoint}px)`;
  return mediaQuery;
};

export const notMaxScreen = (breakpoint: ArgumentBreakpoint) => {
  const mediaQuery = isBreakpointkeys(breakpoint)
    ? `@media not all and (max-width: ${breakpoints[breakpoint]})`
    : `@media not all and (max-width: ${breakpoint}px)`;
  return mediaQuery;
};

export const maxScreenHeight = (breakpoint: ArgumentBreakpoint) => {
  const mediaQuery = isBreakpointkeys(breakpoint)
    ? `@media (max-height: ${breakpoints[breakpoint]})`
    : `@media (max-height: ${breakpoint}px)`;
  return mediaQuery;
};

export const landscape = () => {
  const mediaQuery = `@media screen and (orientation: landscape)`;
  return mediaQuery;
};

export const portrait = () => {
  const mediaQuery = `@media screen and (orientation: portrait)`;
  return mediaQuery;
};
