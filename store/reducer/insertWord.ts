import produce from "immer";
import { InsertBufferAction, InsertWordAction, Reducer, State } from "../types";

export const insertWord: Reducer<State, InsertWordAction> = produce(
  (draft, { word }) => {
    const [row, col] = draft.cursor;
    const line = draft.buffer[row];
    const leading = line.text.substring(0, col);
    const trailing = line.text.substring(col);

    line.text = leading + word + trailing;
    draft.cursor = [row, col + word.length];
  }
);

export const insertBuffer: Reducer<State, InsertBufferAction> = produce(
  (draft, { buffer }) => {
    const [row, col] = draft.cursor;

    const currentLine = draft.buffer[row];
    const leadingInsert = buffer[0];
    const leadingText = currentLine.text.substring(0, col);
    const leadingLine = {
      key: currentLine.key,
      text: leadingText + leadingInsert.text,
    };

    const innerLines = buffer.slice(1, buffer.length - 1);

    const trailingText = currentLine.text.substring(col);
    const trailingInsert = buffer[buffer.length - 1];
    const trailingLine = {
      key: trailingInsert.key,
      text: trailingInsert.text + trailingText,
    }
    
    draft.buffer.splice(
      row,
      1,
      leadingLine,
      ...innerLines,
      trailingLine
    );

    const lastRow = row + buffer.length - 1;
    const lastCol = trailingInsert.text.length;
    draft.cursor = [lastRow, lastCol];
  }
);
