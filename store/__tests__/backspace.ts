import { expect, it, describe } from "@jest/globals";
import { reducer, Action, State } from "..";
import { MULTI_LINE } from "../__fixtures__/state";

describe("backspace action", () => {
  it("should not remove text or move cursor if at begin of document", () => {
    const state: State = { ...MULTI_LINE, cursor: [0, 0] };
    const action: Action = { type: "backspace" };

    const { buffer, cursor } = reducer(state, action);

    expect(buffer).toEqual(state.buffer);
    expect(cursor).toEqual(state.cursor);
  });

  it("should merge current line with previous line if at begin of line", () => {
    const state: State = { ...MULTI_LINE, cursor: [1, 0] };
    const action: Action = { type: "backspace" };

    const { buffer, cursor } = reducer(state, action);

    expect(buffer[0].text).toBe("Alpha BetaGamma Delta");
    expect(cursor).toEqual([0, 10]);
  });

  it("should remove the charater behind the cursor if at middle of line", () => {
    const state: State = { ...MULTI_LINE, cursor: [0, 6] };
    const action: Action = { type: "backspace" };

    const { buffer, cursor } = reducer(state, action);

    expect(buffer[0].text).toBe("AlphaBeta");
    expect(cursor).toEqual([0, 5]);
  });
});
