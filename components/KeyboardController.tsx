import { ReactNode, useContext, createContext, useRef, RefObject } from "react";

export const KeyboardControllerContext = createContext<{
  ref: RefObject<HTMLTextAreaElement>;
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
  const ref = useRef<HTMLTextAreaElement>(null);

  return (
    <KeyboardControllerContext.Provider value={{ ref }}>
      {children}
    </KeyboardControllerContext.Provider>
  );
}
