import { insertWord } from "../store/operations";
import {
  getOrderedSelection,
  getSelectionRange,
} from "../store/selectors/select";
import { blockStyle, mousePosition, touchPosition } from "../lib/position";
import { useStore } from "./Store";
import { useKeyboardController } from "./KeyboardController";
import Cursor from "./Cursor";
import Keyboard from "./Keyboard";
import classNames from "classnames";
import MonospaceArea from "./MonospaceArea";
import SelectionArea from "./Selection/SelectionArea";
import styles from "../styles/Code.module.css";
import SelectionKnob from "./Selection/SelectionKnob";

export default function Code() {
  const { state, dispatch } = useStore();
  const { ref } = useKeyboardController();

  const [start, end] = getOrderedSelection(state);
  const { selectionStart, selectionEnd, selectionDirection } =
    getSelectionRange(state);
  return (
    <div
      className={classNames("relative", styles.code)}
      style={blockStyle}
      onMouseMove={mousePosition((position) =>
        dispatch({ type: "selectMove", position })
      )}
      onMouseUp={() => dispatch({ type: "selectEnd" })}
      onTouchMove={touchPosition((position) => dispatch({ type: "selectMove", position }))}
      onTouchEnd={() => dispatch({ type: "selectEnd" })}
    >
      <MonospaceArea
        buffer={state.buffer}
        onLongPress={(position) => {
          dispatch({
            type: "selectWord",
            position,
          });
        }}
        onPress={(position) => {
          dispatch({
            type: "cursorMove",
            position,
          });
          dispatch({
            type: "toggleMode",
            mode: "edit",
          });
          ref.current?.focus();
        }}
      />
      <SelectionArea start={start} end={end} buffer={state.buffer} />
      <Cursor row={state.cursor[0]} col={state.cursor[1]} />
      <SelectionKnob
        row={state.selection.alpha[0]}
        col={state.selection.alpha[1]}
        onPressStart={() => dispatch({ type: "selectStart", knob: "alpha" })}
      />
      <SelectionKnob
        row={state.selection.beta[0]}
        col={state.selection.beta[1]}
        onPressStart={() => dispatch({ type: "selectStart", knob: "beta" })}
      />
      <Keyboard
        isFocused={state.mode === "edit"}
        selectionStart={selectionStart}
        selectionEnd={selectionEnd}
        selectionDirection={selectionDirection}
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
