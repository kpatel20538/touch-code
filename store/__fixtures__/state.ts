import { State } from "../types";

export const EMPTY: State = {
  buffer: [{ key: "0", text: "" }],
  cursor: [0, 0],
  mode: 'view',
};

export const SINGLE_LINE: State = {
  buffer: [{ key: "0", text: "Alpha Beta" }],
  cursor: [0, 0],
  mode: 'view',
};

export const MULTI_LINE: State = {
  buffer: [
    { key: "0", text: "Alpha Beta" },
    { key: "1", text: "Gamma Delta" },
    { key: "2", text: "Epsilon Zeta" },
    { key: "3", text: "Eta Theta" },
    { key: "4", text: "Iota Kappa" },
  ],
  cursor: [0, 0],
  mode: 'view',
};
