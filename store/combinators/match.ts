import { AnyAction, Reducer } from "../types";

type MatchManifest<S, A extends AnyAction> = {
  [ActionType in A["type"]]: (state: S, action: A & { type: ActionType }) => S;
};

export function match<S, A extends AnyAction>(
  manifest: MatchManifest<S, A>
): Reducer<S, A> {
  return (state, action) => {
    const actionType: A["type"] = action.type;
    return manifest[actionType](state, action);
  };
}
