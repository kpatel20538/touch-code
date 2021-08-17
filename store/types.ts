export type AnyAction = { type: string };
export type Reducer<S, A> = (state: S, action: A) => S;

export type Line = { key: string; text: string };
export type TextBuffer = Line[];

export type Position = [number, number];
export type Mode = "view" | "edit" | "command";

export type CursorLeftAction = {
  type: "cursorLeft";
};

export type CursorRightAction = {
  type: "cursorRight";
};

export type CursorUpAction = {
  type: "cursorUp";
};

export type CursorDownAction = {
  type: "cursorDown";
};

export type CursorMoveAction = {
  type: "cursorMove";
  position: Position;
};

export type InsertWordAction = {
  type: "insertWord";
  word: string;
};

export type InsertBufferAction = {
  type: "insertBuffer";
  buffer: TextBuffer;
};

export type UpdateLineAction = {
  type: "updateLine";
  text: string;
  col: number;
};

export type BackSpaceAction = {
  type: "backspace";
};

export type ToggleModeAction = {
  type: "toggleMode";
  mode: Mode;
};

export type Action =
  | CursorUpAction
  | CursorDownAction
  | CursorLeftAction
  | CursorRightAction
  | CursorMoveAction
  | InsertWordAction
  | InsertBufferAction
  | UpdateLineAction
  | BackSpaceAction
  | ToggleModeAction;

export type State = {
  buffer: TextBuffer;
  cursor: Position;
  mode: Mode;
};
