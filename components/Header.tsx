import { MdKeyboard, MdKeyboardHide } from "react-icons/md";
import { SiJavascript } from "react-icons/si";
import { useStore } from "./Store";

export default function Header() {
  const { state, dispatch } = useStore();

  return (
    <div className="flex shadow-md px-4 py-2 inset-x-0 top-0 fixed bg-white z-30">
      <div className="font-bold p-2 ">
        <SiJavascript className="mr-3 inline-block" size="1.5em" />
        <span>index.js</span>
      </div>
      <div className="flex-1" />
      <button
        key={state.mode}
        className="p-2"
        onClick={() =>
          dispatch({
            type: "toggleMode",
            mode: state.mode === "edit" ? "view" : "edit",
          })
        }
      >
        {state.mode === "edit" ? (
          <MdKeyboardHide size="1.5em" />
        ) : (
          <MdKeyboard size="1.5em" />
        )}
      </button>
    </div>
  );
}
