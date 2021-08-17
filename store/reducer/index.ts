import { Action, Reducer, State } from "../types";
import { match } from "../combinators/match";
import { insertWord, insertBuffer, updateLine } from "./insertWord";
import { backspace } from "./backspace";
import { toggleMode } from "./toggleMode";
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
  updateLine,
  backspace,
  cursorMove,
  cursorDown,
  cursorLeft,
  cursorRight,
  cursorUp,
  toggleMode,
});
