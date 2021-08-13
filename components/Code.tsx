import { Fragment } from "react";
import { Action } from "../store";
import { useStore } from "./Store";
import Cursor from "./Cursor";

function handleClick(event: MouseEvent): Action {
  const element = event.target as HTMLElement;
  const { top, left } = element.getBoundingClientRect();
  const row = ~~((event.clientY - top) / 24);
  const col = ~~((event.clientX - left) / 9.5);

  return {
    type: "cursorMove",
    position: [row, col],
  };
}

export default function Code() {
  const { state, dispatch } = useStore();

  return (
    <div className="relative">
      <div
        className="font-mono whitespace-pre"
        onClick={(event) => dispatch(handleClick(event.nativeEvent))}
      >
        {state.buffer.map(({ text, key }) => (
          <Fragment key={key}>
            {text}
            <br />
          </Fragment>
        ))}
      </div>
      <Cursor row={state.cursor[0]} col={state.cursor[1]} />
    </div>
  );
}
