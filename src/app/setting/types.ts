export interface HTMLElementConfig {
  className: string;
  variants?: Record<string, string>;
  defaultVariants?: string;
}

export interface DefaultConfiguration {
  id: string;
  userId: string;
  createAt: Date;
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
