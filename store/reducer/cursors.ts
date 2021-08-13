import produce from "immer";
import { Reducer } from "react";
import {
  Position,
  CursorMoveAction,
  CursorDownAction,
  CursorLeftAction,
  CursorRightAction,
  CursorUpAction,
  State,
  TextBuffer,
} from "../types";

function normalizeCursor(buffer: TextBuffer, [row, col]: Position): Position {
  const rowCount = buffer.length;
  const nextRow = Math.max(0, Math.min(row, rowCount - 1));
  const colCount = buffer[nextRow].text.length;
  const nextCol = Math.max(0, Math.min(col, colCount));

  return [nextRow, nextCol];
}

export const cursorLeft: Reducer<State, CursorLeftAction> = produce((draft) => {
  const [row, col] = draft.cursor;
  draft.cursor = normalizeCursor(draft.buffer, [row, col - 1]);
});

export const cursorRight: Reducer<State, CursorRightAction> = produce(
  (draft) => {
    const [row, col] = draft.cursor;
    draft.cursor = normalizeCursor(draft.buffer, [row, col + 1]);
  }
);

export const cursorUp: Reducer<State, CursorUpAction> = produce((draft) => {
  const [row, col] = draft.cursor;
  draft.cursor = normalizeCursor(draft.buffer, [row - 1, col]);
});

export const cursorDown: Reducer<State, CursorDownAction> = produce((draft) => {
  const [row, col] = draft.cursor;
  draft.cursor = normalizeCursor(draft.buffer, [row + 1, col]);
});

export const cursorMove: Reducer<State, CursorMoveAction> = produce(
  (draft, { position }) => {
    draft.cursor = normalizeCursor(draft.buffer, position);
  }
);
