import produce from "immer";
import { BackSpaceAction, Reducer, State } from "../types";

export const backspace: Reducer<State, BackSpaceAction> = produce((draft) => {
  const [row, col] = draft.cursor;
  if (col > 0) {
    const nextCol = col - 1;

    const line = draft.buffer[row];
    line.text = line.text.slice(0, nextCol) + line.text.slice(col);

    draft.cursor = [row, nextCol];
  } else if (row > 0) {
    const nextRow = row - 1;
    const prevLine = draft.buffer[nextRow];
    const line = draft.buffer[row];

    const nextCol = prevLine.text.length;

    prevLine.text = prevLine.text + line.text;
    draft.buffer.splice(row, 1);

    draft.cursor = [nextRow, nextCol];
  }
});
