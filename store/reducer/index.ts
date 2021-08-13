import { Action, Reducer, State } from "../types";
import { match } from "../combinators/match";
import { insertWord, insertBuffer } from "./insertWord";
import { backspace } from "./backspace";
import { showCommandBoard, hideCommandBoard } from "./commandBoard";
import {
  cursorMove,
  cursorDown,
  cursorLeft,
  cursorRight,
  cursorUp,
} from "./cursors";

export const reducer: Reducer<State, Action> = match({
  insertWord,
  insertBuffer,
  backspace,
  cursorMove,
  cursorDown,
  cursorLeft,
  cursorRight,
  cursorUp,
  showCommandBoard,
  hideCommandBoard,
});
