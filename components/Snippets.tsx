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
  MdTextsms,
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
    "else",
    "false",
    "finally",
    "for",
    "function",
    "if",
    "in",
    "instanceof",
    "let",
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
  ].map((word) => toAction({ word: word + " " })),
  braces: [toAction({ word: "=> " })].concat(
    ["{}", "[]", "()", '""', "''"].map((word) => toAction({ word, start: 1 }))
  ),
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
  ].map((word) => toAction({ word })),
  digits: "0123456789".split("").map((word) => toAction({ word })),
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    .split("")
    .map((word) => toAction({ word })),
  lowercase: "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map((word) => toAction({ word })),
  arrows: [
    toAction({
      word: "left",
      Icon: MdKeyboardArrowLeft,
      action: { type: "cursorLeft" },
    }),
    toAction({
      word: "right",
      Icon: MdKeyboardArrowRight,
      action: { type: "cursorRight" },
    }),
    toAction({
      word: "up",
      Icon: MdKeyboardArrowUp,
      action: { type: "cursorUp" },
    }),
    toAction({
      word: "down",
      Icon: MdKeyboardArrowDown,
      action: { type: "cursorDown" },
    }),
  ],
  spacing: [
    toAction({ word: " ", Icon: MdSpaceBar }),
    toAction({ word: "    ", Icon: MdKeyboardTab }),
    toAction({ word: "\n", Icon: MdKeyboardReturn }),
    toAction({
      word: "backspace",
      Icon: MdKeyboardBackspace,
      action: { type: "backspace" },
    }),
  ],
};

const sections = [
  { key: "arrows", color: "primary" },
  { key: "spacing", color: "primary-outline" },
  { key: "keywords", color: "secondary" },
  { key: "braces", color: "secondary-outline" },
] as const;

type ToActionOptions = {
  word: string;
  Icon?: IconType;
  action?: Action;
  start?: number;
};

function toAction({ word, Icon, action, start }: ToActionOptions) {
  return {
    key: word,
    label: Icon ? <Icon size="1.5rem" /> : word.trim(),
    action: () => action ?? operations.insertWord(word, start),
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
