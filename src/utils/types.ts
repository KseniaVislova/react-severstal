export enum NotesActions {
  updateNotes = "updateNotes",
  updateCanChange = "updateCanChange",
  updateItem = "updateItem",
  deleteItem = "deleteItem",
  deleteAllItems = "deleteAllItems",
}

export interface Item {
  id: number;
  text: string;
  canChange: boolean;
  date: Date;
}

export interface NotesAction {
  type: NotesActions;
  payload: Array<Item>;
}
