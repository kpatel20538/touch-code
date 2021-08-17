import produce from "immer";
import { Reducer, State, ToggleModeAction } from "../types";

export const toggleMode: Reducer<State, ToggleModeAction> = produce(
  (draft, { mode }) => {
    draft.mode = mode;
  }
);
