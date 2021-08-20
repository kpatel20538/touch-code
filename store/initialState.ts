import { nanoid } from "nanoid/non-secure";
import { State } from "./types";

export const initialState: State = {
  buffer: [{ key: nanoid(), text: "" }],
  cursor: [0, 0],
  mode: "view",
  selection: {
    selecting: null,
    alpha: [0, 0],
    beta: [0, 0],
  },
};
