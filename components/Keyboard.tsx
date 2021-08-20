import { useEffect, useRef, KeyboardEvent } from "react";
import classNames from "classnames";
import { useKeyboardController } from "./KeyboardController";
import cellStyles from "../styles/Cell.module.css";

type Props = {
  isFocused: boolean;
  selectionStart?: number;
  selectionEnd?: number;
  selectionDirection?: "forward" | "backward" | "none";
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
  selectionDirection,
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
        ref.current.setSelectionRange(
          selectionEnd ?? selectionStart ?? null,
          selectionEnd ?? selectionStart ?? null,
          selectionDirection
        );
      }
    }
  }, [isFocused, selectionStart, selectionEnd, selectionDirection]);

  return (
    <textarea
      ref={ref}
      spellCheck={false}
      className={classNames(
        "absolute w-px h-px font-mono text-transparent bg-transparent caret-transparent outline-none pointer-events-none user-select-none", // left-0
        cellStyles["top-cell"],
        cellStyles["left-cell"]
        // cellStyles["w-cell"]
      )}
      style={{
        "--cell-top": row,
        "--cell-left": selectionEnd ?? selectionStart ?? 0,
      }}
      value={value}
      onBlur={onBlur}
      onFocus={onFocus}
      onChange={(event) => {
        const { value, selectionStart, selectionEnd } =
          event.target as HTMLTextAreaElement;
        onChange?.(value, selectionStart, selectionEnd);
      }}
      onSelect={(event) => {
        const { selectionStart, selectionEnd } =
          event.target as HTMLTextAreaElement;
        onSelect?.(selectionStart, selectionEnd);
      }}
      onKeyDown={(event) => {
        if (event.key === "Backspace") {
          setTimeout(() => onBackspace?.(), 50);
        }
        if (event.key === "Enter") {
          setTimeout(() => onSubmit?.(), 50);
        }
      }}
    />
  );
}
