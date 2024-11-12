export interface HTMLElementConfig {
  className: string;
  variants?: Record<string, string>;
  defaultVariants?: string;
}

export interface DefaultConfiguration {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
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
}

export type HtmlKeys = keyof Omit<
  DefaultConfiguration,
  "id" | "userId" | "createdAt" | "updatedAt"
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
  "ul",
  "li",
  "img",
  "table",
  "tr",
  "th",
  "td",
] as const;

export type HtmlElements = keyof Omit<
  DefaultConfiguration,
  "id" | "userId" | "createdAt" | "updatedAt"
>;
