
import { IconType } from "react-icons";
import {
  MdKeyboardBackspace,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardArrowUp,
  MdKeyboardReturn,
  MdKeyboardTab,
  MdSpaceBar,
} from "react-icons/md";
import Button from "./Button";
import { useStore } from "./Store";
import * as operations from "../store/operations";
import { Action } from "../store";

const data = {
  keywords: [
    "break",
    "case",
    "catch",
    "const",
    "continue",
    "default",
    "delete",
    "do",
    "double",
    "else",
    "false",
    "finally",
    "for",
    "function",
    "if",
    "in",
    "instanceof",
    "let",
    "long",
    "new",
    "null",
    "return",
    "switch",
    "this",
    "throw",
    "true",
    "try",
    "typeof",
    "var",
    "void",
    "while",
    "yield",
    "class",
    "export",
    "extends",
    "import",
    "super",
  ].map((word) => toAction(word)),
  symbols: [
    ".",
    ";",
    ":",
    "=>",
    "{}",
    "[]",
    "()",
    '""',
    "''",
    "$",
    "_",
    "=",
    "+",
    "-",
    "*",
    "/",
    "%",
    "<",
    ">",
    "?",
    "!",
    "&",
    "|",
    "~",
    "^",
    "#",
    "@",
    "\\",
  ].map((word) => toAction(word)),
  digits: "0123456789".split("").map((word) => toAction(word)),
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    .split("")
    .map((word) => toAction(word)),
  lowercase: "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map((word) => toAction(word)),
  arrows: [
    toAction("left", MdKeyboardArrowLeft, { type: "cursorLeft" }),
    toAction("right", MdKeyboardArrowRight, { type: "cursorRight" }),
    toAction("up", MdKeyboardArrowUp, { type: "cursorUp" }),
    toAction("down", MdKeyboardArrowDown, { type: "cursorDown" }),
  ],
  spacing: [
    toAction(" ", MdSpaceBar),
    toAction("    ", MdKeyboardTab),
    toAction("\n", MdKeyboardReturn),
    toAction("backspace", MdKeyboardBackspace, { type: "backspace" }),
  ],
};

const sections = [
  { key: "arrows", color: "primary" },
  { key: "spacing", color: "primary" },
  { key: "uppercase", color: "secondary" },
  { key: "lowercase", color: "secondary-outline" },
  { key: "digits", color: "primary" },
  { key: "symbols", color: "primary-outline" },
  { key: "keywords", color: "primary" },
] as const;

function toAction(word: string, Icon?: IconType, action?: Action) {
  return {
    key: word,
    label: Icon ? <Icon size="1.5rem" /> : word,
    action: () => action ?? operations.insertWord(word),
  };
}

export default function Snippets() {
  const { dispatch } = useStore();
  return (
    <div className="font-mono whitespace-pre  p-2">
      {sections.map(({ key, color }) => (
        <div key={key} className="flex flex-wrap pb-2">
          {data[key].map(({ key, label, action }) => (
            <Button
              key={key}
              className="m-2"
              variant={color}
              onClick={() => dispatch(action())}
            >
              {label}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
}
