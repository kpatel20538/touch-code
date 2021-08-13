import { expect, it, describe } from "@jest/globals";
import { reducer, Action, State } from "..";
import { MULTI_LINE } from "../__fixtures__/state";

describe("cursorLeft action", () => {
  it("should move cursor to the left", () => {
    const state: State = { ...MULTI_LINE, cursor: [0, 3] };
    const action: Action = { type: "cursorLeft" };

    const { cursor } = reducer(state, action);

    expect(cursor).toEqual([0, 2]);
  });

  it("should not move cursor if at begining of line", () => {
    const state: State = { ...MULTI_LINE, cursor: [1, 0] };
    const action: Action = { type: "cursorLeft" };

    const { cursor } = reducer(state, action);

    expect(cursor).toEqual([1, 0]);
  });
});

describe("cursorRight action", () => {
  it("should move cursor to the right", () => {
    const state: State = { ...MULTI_LINE, cursor: [0, 3] };
    const action: Action = { type: "cursorRight" };

    const { cursor } = reducer(state, action);

    expect(cursor).toEqual([0, 4]);
  });

  it("should not move cursor if at end of line", () => {
    const state: State = { ...MULTI_LINE, cursor: [1, 11] };
    const action: Action = { type: "cursorRight" };

    const { cursor } = reducer(state, action);

    expect(cursor).toEqual([1, 11]);
  });
});

describe("cursorUp action", () => {
  it("should move cursor to upwards", () => {
    const state: State = { ...MULTI_LINE, cursor: [1, 3] };
    const action: Action = { type: "cursorUp" };

    const { cursor } = reducer(state, action);

    expect(cursor).toEqual([0, 3]);
  });

  it("should not move cursor past the length of the previous line", () => {
    const state: State = { ...MULTI_LINE, cursor: [2, 12] };
    const action: Action = { type: "cursorUp" };

    const { cursor } = reducer(state, action);

    expect(cursor).toEqual([1, 11]);
  });

  it("should not move cursor if at first line", () => {
    const state: State = { ...MULTI_LINE, cursor: [0, 3] };
    const action: Action = { type: "cursorUp" };

    const { cursor } = reducer(state, action);

    expect(cursor).toEqual([0, 3]);
  });
});

describe("cursorDown action", () => {
  it("should move cursor to downwards", () => {
    const state: State = { ...MULTI_LINE, cursor: [1, 3] };
    const action: Action = { type: "cursorDown" };

    const { cursor } = reducer(state, action);

    expect(cursor).toEqual([2, 3]);
  });

  it("should not move cursor past the length of the next line", () => {
    const state: State = { ...MULTI_LINE, cursor: [2, 12] };
    const action: Action = { type: "cursorDown" };

    const { cursor } = reducer(state, action);

    expect(cursor).toEqual([3, 9]);
  });

  it("should not move cursor if at last line", () => {
    const state: State = { ...MULTI_LINE, cursor: [4, 3] };
    const action: Action = { type: "cursorDown" };

    const { cursor } = reducer(state, action);

    expect(cursor).toEqual([4, 3]);
  });
});

describe("cursorMove action", () => {
  it("should move cursor to selected position", () => {
    const state: State = { ...MULTI_LINE, cursor: [0, 0] };
    const action: Action = { type: "cursorMove", position: [3, 3] };

    const { cursor } = reducer(state, action);

    expect(cursor).toEqual([3, 3]);
  });

  it("should not move cursor to before the start of the selected line", () => {
    const state: State = { ...MULTI_LINE, cursor: [0, 0] };
    const action: Action = { type: "cursorMove", position: [2, -1] };

    const { cursor } = reducer(state, action);

    expect(cursor).toEqual([2, 0]);
  });

  it("should not move cursor to after the end of the selected line", () => {
    const state: State = { ...MULTI_LINE, cursor: [0, 0] };
    const action: Action = { type: "cursorMove", position: [3, 100] };

    const { cursor } = reducer(state, action);

    expect(cursor).toEqual([3, 9]);
  });

  it("should not move cursor to before the first line", () => {
    const state: State = { ...MULTI_LINE, cursor: [0, 0] };
    const action: Action = { type: "cursorMove", position: [-1, 5] };

    const { cursor } = reducer(state, action);

    expect(cursor).toEqual([0, 5]);
  });

  it("should not move cursor to after the last line", () => {
    const state: State = { ...MULTI_LINE, cursor: [0, 0] };
    const action: Action = { type: "cursorMove", position: [100, 5] };

    const { cursor } = reducer(state, action);

    expect(cursor).toEqual([4, 5]);
  });
});
