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

export type BackSpaceAction = {
  type: "backspace";
};

export type ShowCommandBoardAction = {
  type: "showCommandBoard";
};

export type HideCommandBoardAction = {
  type: "hideCommandBoard";
};

export type Action =
  | CursorUpAction
  | CursorDownAction
  | CursorLeftAction
  | CursorRightAction
  | CursorMoveAction
  | InsertWordAction
  | InsertBufferAction
  | BackSpaceAction
  | ShowCommandBoardAction
  | HideCommandBoardAction;

export type Line = { key: string; text: string };
export type TextBuffer = Line[];

export type Position = [number, number];

export type State = {
  buffer: TextBuffer;
  cursor: Position;
  isCommandBoardShowing: boolean;
};

export type AnyAction = { type: string };
export type Reducer<S, A> = (state: S, action: A) => S;
