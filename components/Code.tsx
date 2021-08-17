import { Fragment } from "react";
import { Action } from "../store";
import { useStore } from "./Store";
import { useKeyboardController } from "./KeyboardController";
import Cursor from "./Cursor";
import Keyboard from "./Keyboard";
import { insertWord } from "../store/operations";
import styles from "../styles/Code.module.css";
import classNames from "classnames";

export default function Code() {
  const { state, dispatch } = useStore();
  const { ref } = useKeyboardController();

  return (
    <div className={classNames("relative", styles.code)}>
      <div
        className="font-mono whitespace-pre"
        onClick={(event) => {
          const element = event.target as HTMLElement;
          const { top, left } = element.getBoundingClientRect();
          const row = ~~((event.clientY - top) / 24);
          const col = ~~((event.clientX - left) / 9.6);

          dispatch({
            type: "cursorMove",
            position: [row, col],
          });
          dispatch({
            type: "toggleMode",
            mode: "edit",
          });
          ref.current?.focus(); // iOS compat
        }}
      >
        {state.buffer.map(({ text, key }) => (
          <Fragment key={key}>
            {text}
            <br />
          </Fragment>
        ))}
      </div>
      <Cursor row={state.cursor[0]} col={state.cursor[1]} />
      <Keyboard
        isFocused={state.mode === "edit"}
        selectionStart={state.cursor[1]}
        selectionEnd={state.cursor[1]}
        value={state.buffer[state.cursor[0]].text}
        row={state.cursor[0]}
        onBlur={() => dispatch({ type: "toggleMode", mode: "view" })}
        onChange={(text, start, end) =>
          dispatch({ type: "updateLine", text, col: end ?? start ?? 0 })
        }
        onSubmit={() => dispatch(insertWord("\n"))}
        onSelect={(start, end) =>
          dispatch({
            type: "cursorMove",
            position: [state.cursor[0], end ?? start ?? 0],
          })
        }
        onBackspace={() =>
          state.cursor[1] === 0 && dispatch({ type: "backspace" })
        }
      />
    </div>
  );
}
