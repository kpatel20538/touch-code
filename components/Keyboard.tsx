import classNames from "classnames";
import { useEffect, useRef, KeyboardEvent } from "react";
import styles from "../styles/Keyboard.module.css";
import { useKeyboardController } from "./KeyboardController";

declare module "csstype" {
  interface Properties {
    "--keyboard-row"?: number;
    "--keyboard-width"?: number;
  }
}

type Props = {
  isFocused: boolean;
  selectionStart?: number;
  selectionEnd?: number;
  value: string;
  row: number;
  onBlur?: () => void;
  onFocus?: () => void;
  onChange?: (value: string, start: number | null, stop: number | null) => void;
  onSubmit?: () => void;
  onSelect?: (start: number | null, stop: number | null) => void;
  onBackspace?: () => void;
};

export default function Keyboard({
  isFocused,
  selectionStart,
  selectionEnd,
  value,
  row,
  onBlur,
  onFocus,
  onChange,
  onSubmit,
  onSelect,
  onBackspace,
}: Props) {
  const { ref } = useKeyboardController();

  useEffect(() => {
    if (ref.current) {
      if (isFocused) {
        ref.current.focus();
        ref.current.click();
      } else {
        ref.current.blur();
      }
    }
  }, [isFocused]);

  useEffect(() => {
    if (ref.current) {
      if (isFocused) {
        if (selectionStart) {
          ref.current.selectionStart = selectionStart;
        }
        if (selectionEnd) {
          ref.current.selectionEnd = selectionEnd;
        }
      }
    }
  }, [isFocused, selectionStart, selectionEnd]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.();
      }}
    >
      <input
        ref={ref}
        spellCheck={false}
        className={classNames(
          "absolute inset-0 font-mono text-transparent opacity-50 bg-transparent outline-none pointer-events-none caret-transparent",
          styles.keyboard,
          
        )}
        style={{
          "--keyboard-row": row,
          "--keyboard-width": value.length,
        }}
        value={value}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={(event) => {
          const { value, selectionStart, selectionEnd } =
            event.target as HTMLInputElement;
          onChange?.(value, selectionStart, selectionEnd);
        }}
        onSelect={(event) => {
          const { selectionStart, selectionEnd } =
            event.target as HTMLInputElement;
          onSelect?.(selectionStart, selectionEnd);
        }}
        onKeyDown={(event) => {
          if (event.key === "Backspace") {
            setTimeout(() => onBackspace?.(), 50);
          }
        }}
      />
    </form>
  );
}
