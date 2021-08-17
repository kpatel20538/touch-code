import { expect, it, describe } from "@jest/globals";
import { reducer, Action, State } from "..";
import { EMPTY } from "../__fixtures__/state";

describe("toggleMode action", () => {
  it("should set application mode", () => {
    const state: State = { ...EMPTY, mode: "view" };
    const action: Action = { type: "toggleMode", mode: "command" };

    const { mode } = reducer(state, action);

    expect(mode).toBe("command");
  });
});
