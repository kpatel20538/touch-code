import {
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
  createContext,
} from "react";
import { Action, initialState, reducer, State } from "../store";

export const StoreContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {},
});

export function useStore() {
  return useContext(StoreContext);
}

type Props = {
  children?: ReactNode;
};

export default function Store({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}
