import produce from "immer";
import {
  HideCommandBoardAction,
  Reducer,
  ShowCommandBoardAction,
  State,
} from "../types";

export const showCommandBoard: Reducer<State, ShowCommandBoardAction> = produce(
  (draft) => {
    draft.isCommandBoardShowing = true;
  }
);

export const hideCommandBoard: Reducer<State, HideCommandBoardAction> = produce(
  (draft) => {
    draft.isCommandBoardShowing = false;
  }
);
