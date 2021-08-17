import { ReactNode, useContext, createContext, useRef, RefObject } from "react";

export const KeyboardControllerContext = createContext<{
  ref: RefObject<HTMLInputElement>;
}>({
  ref: { current: null },
});

export function useKeyboardController() {
  return useContext(KeyboardControllerContext);
}

type Props = {
  children?: ReactNode;
};

export default function KeyboardController({ children }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <KeyboardControllerContext.Provider value={{ ref }}>
      {children}
    </KeyboardControllerContext.Provider>
  );
}
