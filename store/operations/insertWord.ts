import { nanoid } from "nanoid/non-secure";
import { InsertBufferAction, InsertWordAction } from "../types";

export function insertWord(
  word: string,
  start?: number,
): InsertWordAction | InsertBufferAction {
  const lines = word.split("\n");
  if (lines.length === 1) {
    return typeof start === "undefined"
      ? { type: "insertWord", word }
      : { type: "insertWord", word, start };
  } else {
    const buffer = lines.map((text) => ({ key: nanoid(), text }));
    return { type: "insertBuffer", buffer };
  }
}
