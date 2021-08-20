export type AnyAction = { type: string };
export type Reducer<S, A> = (state: S, action: A) => S;

export type Line = { key: string; text: string };
export type TextBuffer = Line[];

export type Position = [number, number];
export type Mode = "view" | "edit" | "command";
export type Selection = {
  selecting: "alpha" | "beta" | null;
  alpha: Position;
  beta: Position;
};

export type State = {
  buffer: TextBuffer;
  cursor: Position;
  mode: Mode;
  selection: Selection
};

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

export type SelectStartAction = {
  type: "selectStart";

  knob: "alpha" | "beta";
};

export type SelectEndAction = {
  type: "selectEnd";
};

export type SelectMoveAction = {
  type: "selectMove";
  position: Position;
};

export type SelectWordAction = {
  type: "selectWord";
  position: Position;
};

export type SelectionAction =
  | SelectStartAction
  | SelectMoveAction
  | SelectEndAction
  | SelectWordAction;

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
  | ToggleModeAction
  | SelectionAction
