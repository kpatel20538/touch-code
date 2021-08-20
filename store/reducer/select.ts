import produce from "immer";
import { Reducer } from "react";
import { isSelectingNothing } from "../selectors/select";
import {
  State,
  SelectWordAction,
  SelectStartAction,
  SelectEndAction,
  SelectMoveAction,
} from "../types";
import { normalizeCursor, updateCursor } from "./cursors";

export const selectStart: Reducer<State, SelectStartAction> = produce(
  (draft, { knob }) => {
    draft.selection.selecting = knob;
  }
);

export const selectEnd: Reducer<State, SelectEndAction> = produce((draft) => {
  draft.selection.selecting = null;
});


export const selectMove: Reducer<State, SelectMoveAction> = produce(
  (draft, { position }) => {
    const knob = draft.selection.selecting;
    if (knob) {
      if (isSelectingNothing(draft)) {
        updateCursor(draft, position);
      } else {
        const norm = normalizeCursor(draft.buffer, position);
        draft.selection[knob] = norm;
        draft.cursor = norm;
      }
    }
  }
);

export const selectWord: Reducer<State, SelectWordAction> = produce(
  (draft, { position }) => {
    const [row, col] = normalizeCursor(draft.buffer, position);
    const leading = draft.buffer[row].text.slice(0, col);
    const trialing = draft.buffer[row].text.slice(col);

    const start = leading.match(/\b\w+$/)?.[0]?.length ?? 0;
    const end = trialing.match(/^\w+\b/)?.[0]?.length ?? 0;

    draft.cursor = [row, col + end];
    draft.selection.alpha = [row, col - start];
    draft.selection.beta = [row, col + end];
  }
);
