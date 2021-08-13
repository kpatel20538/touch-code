import { MdEdit } from "react-icons/md";
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
        className="fixed bottom-8 right-8 h-12 w-12 shadow-lg"
        variant="primary"
        onClick={() => dispatch({ type: "showCommandBoard" })}
      >
        <MdEdit />
      </Button>
      <BottomSheet
        isActive={state.isCommandBoardShowing}
        onClose={() => dispatch({ type: "hideCommandBoard" })}
      >
        <Snippets />
      </BottomSheet>
    </div>
  );
}
