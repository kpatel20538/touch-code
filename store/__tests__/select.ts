import { expect, it, describe } from "@jest/globals";
import { reducer, Action, State } from "..";
import { getOrderedSelection } from "../selectors/select";
import { SINGLE_LINE } from "../__fixtures__/state";

describe("selectWord action", () => {
  it("should select from center of word", () => {
    const state: State = { ...SINGLE_LINE };
    const action: Action = { type: "selectWord", position: [0, 7] };

    const statePrime = reducer(state, action);
    const [start, end] = getOrderedSelection(statePrime);
    
    expect(start).toEqual([0, 5]);
    expect(end).toEqual([0, 9]);
  });

  it("should select from start of word", () => {
    const state: State = { ...SINGLE_LINE };
    const action: Action = { type: "selectWord", position: [0, 5] };

    const statePrime = reducer(state, action);
    const [start, end] = getOrderedSelection(statePrime);
    
    expect(start).toEqual([0, 5]);
    expect(end).toEqual([0, 9]);
  });

  it("should select from end of word", () => {
    const state: State = { ...SINGLE_LINE };
    const action: Action = { type: "selectWord", position: [0, 9] };

    const statePrime = reducer(state, action);
    const [start, end] = getOrderedSelection(statePrime);
    
    expect(start).toEqual([0, 5]);
    expect(end).toEqual([0, 9]);
  });

  it("should select nothing if not over word", () => {
    const state: State = { ...SINGLE_LINE };
    const action: Action = { type: "selectWord", position: [0, 10] };

    const statePrime = reducer(state, action);
    const [start, end] = getOrderedSelection(statePrime);
    
    expect(start).toEqual([0, 10]);
    expect(end).toEqual([0, 10]);
  });
});
