export interface HTMLElement {
  id: string;
  element: string;
  text: string;
  children: HTMLElement[] | null;
  isEditing?: boolean;
}

export type ElementType =
  | "div"
  | "p"
  | "h1"
  | "span"
  | "ul"
  | "ol"
  | "li"
  | "table"
  | "tr"
  | "td";

export interface FileElement {
  id: string;
  type: ElementType;
  cssClass: string;
  content: string;
  children: string[] | null;
  createdAt: Date;
  updatedAt: Date;
  attributes?: {
    // others HTML atributes
    [key: string]: string;
  };
  parentId?: string;
  order: number;
  variants?: {
    current: string;
    available: string[];
  };
  additionalCss: string;
}
