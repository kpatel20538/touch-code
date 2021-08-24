import { MdCode } from "react-icons/md";
import BottomSheet from "./BottomSheet";
import Button from "./Button";
import Code from "./Code";
import Header from "./Header";
import Snippets from "./Snippets";
import { useStore } from "./Store";

export default function Container() {
  const { state, dispatch } = useStore();

  return (
    <div className="v-screen h-screen">
      <Header />
      <div className="container px-8 py-20 overflow-scroll">
        <Code />
      </div>
      <Button
        className="fixed bottom-8 right-8 h-14 w-14 shadow-lg"
        variant="primary"
        onClick={() => dispatch({ type: "toggleMode", mode: "command" })}
      >
        <MdCode size="1.5em" />
      </Button>
      <BottomSheet
        isActive={state.mode === "command"}
        onClose={() => dispatch({ type: "toggleMode", mode: "view" })}
      >
        <Snippets />
      </BottomSheet>
    </div>
  );
}
