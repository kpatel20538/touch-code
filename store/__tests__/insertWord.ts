import { expect, it, describe } from "@jest/globals";
import { reducer, Action, State } from "..";
import { BUFFER } from "../__fixtures__/buffer";
import { MULTI_LINE } from "../__fixtures__/state";

describe("insertWord action", () => {
  it("can insert word in start of line", () => {
    const state: State = { ...MULTI_LINE, cursor: [1, 0] };
    const action: Action = { type: "insertWord", word: "word" };

    const { buffer, cursor } = reducer(state, action);

    expect(buffer[1].text).toBe("wordGamma Delta");
    expect(cursor).toEqual([1, 4]);
  });

  it("can insert word in end of line", () => {
    const state: State = { ...MULTI_LINE, cursor: [1, 11] };
    const action: Action = { type: "insertWord", word: "word" };

    const { buffer, cursor } = reducer(state, action);

    expect(buffer[1].text).toBe("Gamma Deltaword");
    expect(cursor).toEqual([1, 15]);
  });

  it("can insert word in middle of line", () => {
    const state: State = { ...MULTI_LINE, cursor: [1, 5] };
    const action: Action = { type: "insertWord", word: "word" };

    const { buffer, cursor } = reducer(state, action);

    expect(buffer[1].text).toBe("Gammaword Delta");
    expect(cursor).toEqual([1, 9]);
  });
});

describe("insertBuffer action", () => {
  it("can insert buffer in the begining of the document", () => {
    const state: State = { ...MULTI_LINE, cursor: [0, 0] };
    const action: Action = { type: "insertBuffer", buffer: BUFFER };

    const { buffer, cursor } = reducer(state, action);

    expect(buffer).toEqual([
      { key: "0", text: "Red Blue" },
      { key: "b1", text: "Yellow Green" },
      { key: "b2", text: "Gold SilverAlpha Beta" },
      { key: "1", text: "Gamma Delta" },
      { key: "2", text: "Epsilon Zeta" },
      { key: "3", text: "Eta Theta" },
      { key: "4", text: "Iota Kappa" },
    ]);
    expect(cursor).toEqual([2, 11]);
  });

  it("can insert buffer in the end of the document", () => {
    const state: State = { ...MULTI_LINE, cursor: [4, 10] };
    const action: Action = { type: "insertBuffer", buffer: BUFFER };

    const { buffer, cursor } = reducer(state, action);

    expect(buffer).toEqual([
      { key: "0", text: "Alpha Beta" },
      { key: "1", text: "Gamma Delta" },
      { key: "2", text: "Epsilon Zeta" },
      { key: "3", text: "Eta Theta" },
      { key: "4", text: "Iota KappaRed Blue" },
      { key: "b1", text: "Yellow Green" },
      { key: "b2", text: "Gold Silver" },
    ]);
    expect(cursor).toEqual([6, 11]);
  });

  it("can insert buffer in the middle of the document", () => {
    const state: State = { ...MULTI_LINE, cursor: [2, 7] };
    const action: Action = { type: "insertBuffer", buffer: BUFFER };

    const { buffer, cursor } = reducer(state, action);

    expect(buffer).toEqual([
      { key: "0", text: "Alpha Beta" },
      { key: "1", text: "Gamma Delta" },
      { key: "2", text: "EpsilonRed Blue" },
      { key: "b1", text: "Yellow Green" },
      { key: "b2", text: "Gold Silver Zeta" },
      { key: "3", text: "Eta Theta" },
      { key: "4", text: "Iota Kappa" },
    ]);
    expect(cursor).toEqual([4, 11]);
  });
});

describe("updateLine action", () => {
  it("should update the current line and cursor", () => {
    const state: State = { ...MULTI_LINE, cursor: [1, 5] };
    const action: Action = {
      type: "updateLine",
      text: "Red Blue Green",
      col: 7,
    };

    const { buffer, cursor } = reducer(state, action);

    expect(buffer[1].text).toBe("Red Blue Green");
    expect(cursor).toEqual([1, 7]);
  });
});
