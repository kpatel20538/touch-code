import { expect, it, describe } from "@jest/globals";
import { reducer, Action, State } from "..";
import { EMPTY } from "../__fixtures__/state";

describe("showCommandBoard action", () => {
  it("should show command board", () => {
    const state: State = { ...EMPTY, isCommandBoardShowing: false };
    const action: Action = { type: "showCommandBoard" };

    const { isCommandBoardShowing } = reducer(state, action);

    expect(isCommandBoardShowing).toBe(true);
  });
});

describe("hideCommandBoard action", () => {
  it("should hide command board", () => {
    const state: State = { ...EMPTY, isCommandBoardShowing: true };
    const action: Action = { type: "hideCommandBoard" };

    const { isCommandBoardShowing } = reducer(state, action);

    expect(isCommandBoardShowing).toBe(false);
  });
});
