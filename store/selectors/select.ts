import { State, Position } from "../types";


function isBefore(left: Position, right: Position) {
  return left[0] < right[0] || (left[0] <= right[0] && left[1] < right[1]);
}

function isEqual(left: Position, right: Position) {
  return left[0] === right[0] && left[1] === right[1];
}

export function getOrderedSelection(state: State): [Position, Position] {
  const { alpha, beta } = state.selection;
  return isBefore(alpha, beta)
    ? [alpha, beta]
    : [beta, alpha,];
}

export function isSelectingNothing(state: State): boolean {
  const { alpha, beta } = state.selection;
  return isEqual(alpha, beta);
}

export function getSelectionRange(state: State) {
  const { cursor } = state;
  const [start, end] = getOrderedSelection(state);
  const selectionDirection: "forward" | "backward" | "none" = isEqual(cursor, end) ? "forward" : "backward";
  const selectionStart = cursor[0] === start[0] ? start[1] : 0;
  const selectionEnd = cursor[0] === end[0] ? end[1] : state.buffer[cursor[0]].text.length;
  return { selectionStart, selectionEnd, selectionDirection }
}
