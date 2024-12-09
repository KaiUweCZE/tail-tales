export interface HTMLElementConfig {
  className: string;
  variants?: Record<string, string>;
  defaultVariants?: string;
}

export interface MetaConfiguration
  extends Pick<
    DefaultConfiguration,
    "name" | "id" | "userId" | "updatedAt" | "createdAt"
  > {}

export interface DefaultConfiguration {
  name: string;
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  //[key in HTMLElementKeys]?: HTMLElementConfig;
  div?: HTMLElementConfig;
  span?: HTMLElementConfig;
  p?: HTMLElementConfig;
  h1?: HTMLElementConfig;
  h2?: HTMLElementConfig;
  h3?: HTMLElementConfig;
  ul?: HTMLElementConfig;
  ol?: HTMLElementConfig;
  li?: HTMLElementConfig;
  table?: HTMLElementConfig;
  tr?: HTMLElementConfig;
  td?: HTMLElementConfig;
  th?: HTMLElementConfig;
  a?: HTMLElementConfig;
  img?: HTMLElementConfig;
  button?: HTMLElementConfig;
  article?: HTMLElementConfig;
  hr?: HTMLElementConfig;
  pre?: HTMLElementConfig;
  code?: HTMLElementConfig;
}

export type HtmlKeys = keyof Omit<
  DefaultConfiguration,
  "id" | "userId" | "createdAt" | "updatedAt" | "name"
>;

export const htmlElements = [
  "h1",
  "h2",
  "h3",
  "p",
  "span",
  "div",
  "ul",
  "li",
  "article",
  "hr",
  "button",
  "a",
  "ol",
  "img",
  "table",
  "tr",
  "th",
  "td",
] as const;

export type HtmlElements = Omit<
  DefaultConfiguration,
  "id" | "userId" | "createdAt" | "updatedAt" | "name"
>;
