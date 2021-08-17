import Store from "../components/Store";
import Container from "../components/Container";
import KeyboardController from "../components/KeyboardController";

export default function Home() {
  return (
    <Store>
      <KeyboardController>
        <Container />
      </KeyboardController>
    </Store>
  );
}
