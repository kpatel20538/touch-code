import { nanoid } from "nanoid/non-secure";
import { InsertBufferAction, InsertWordAction } from "../types";

export function insertWord(
  word: string
): InsertWordAction | InsertBufferAction {
  const lines = word.split("\n");
  if (lines.length === 1) {
    return { type: "insertWord", word };
  } else {
    const buffer = lines.map((text) => ({ key: nanoid(), text }));
    return { type: "insertBuffer", buffer };
  }
}
