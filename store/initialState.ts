import { nanoid } from "nanoid/non-secure";
import { State } from "./types";

export const initialState: State = {
  buffer: [{ key: nanoid(), text: "" }],
  cursor: [0, 0],
  isCommandBoardShowing: false,
};
