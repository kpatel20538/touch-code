import { Fragment } from "react";
import classNames from "classnames";
import { useLongPress } from "../lib/useLongPress";
import { TextBuffer } from "../store";
import cellStyles from "../styles/Cell.module.css";

type Props = {
  buffer: TextBuffer;
  onPress?: (relative: [number, number]) => void;
  onLongPress?: (relative: [number, number]) => void;
};

export default function MonospaceArea({
  buffer,
  onPress,
  onLongPress
}: Props) {
  const bind = useLongPress({
    onPress,
    onLongPress,
  })

  return (
    <div
      {...bind}
      className="font-mono whitespace-pre select-none"
    >
      {buffer.map(({ text, key }, row) => (
        <span
          key={key}
          className={classNames(
            "absolute left-0",
            cellStyles['top-cell'],
            cellStyles['h-cell'],
            cellStyles['w-cell']
          )}
          style={{
            '--cell-top': row,
            '--cell-width': text.length,
            '--cell-height': 1,
          }}
        >
          {text}
        </span>
      ))}
    </div>
  );
}
