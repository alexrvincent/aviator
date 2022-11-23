type Dispose = () => void;
type InsertCssItem = () => Dispose;
type GetCSSItem = () => string;
type GetContent = () => string;

interface Style {
  [key: string]: InsertCssItem | GetCSSItem | GetContent | string;
  _insertCss: InsertCssItem;
  _getCss: GetCSSItem;
  _getContent: GetContent;
}

declare module 'isomorphic-style-loader/withStyles' {
  function withStyles(
    ...styles: Styles[]
  ): <P, S, T extends React.ComponentClass<P, S> | React.FunctionComponent<P>>(component: T) => T;

  export = withStyles;
}

declare module 'isomorphic-style-loader/useStyles' {
  const useStyles = (...styles: Styles[]) => any;
  export default useStyles;
}

declare module '*.scss' {
  const value: Styles;
  export = value;
}

declare module '*.css' {
  const value: Styles;

  export = value;
}

declare module 'isomorphic-style-loader/StyleContext' {
  import { Context } from 'react';

  type RemoveGlobalCss = () => void;
  type InsertCSS = (...styles: Styles[]) => RemoveGlobalCss | void;
  interface StyleContextValue {
    insertCss: InsertCSS;
  }

  const StyleContext: Context<StyleContextValue>;

  export { StyleContext as default, InsertCSS };
}

declare module '*.svg' {
  const content: any;
  export default content;
}
