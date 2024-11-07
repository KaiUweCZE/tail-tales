export interface HTMLElement {
  id: string;
  element: string;
  text: string;
  children: HTMLElement[];
  isEditing?: boolean;
}
