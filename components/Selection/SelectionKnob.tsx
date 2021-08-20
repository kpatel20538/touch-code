import classNames from "classnames";
import styles from "../../styles/SelectionKnob.module.css";
import cellStyles from "../../styles/Cell.module.css";
import { touchPosition } from "../../lib/position";

type Props = {
  row: number;
  col: number;
  onPressStart?: () => void;
};

const className = classNames(
  "absolute bg-purple-700 rounded-full user-select-none",
  cellStyles["top-cell"],
  cellStyles["left-cell"],
  styles.selectionKnob
);

export default function SelectionKnob({ row, col, onPressStart }: Props) {
  return (
    <div
      className={className}
      style={{
        "--cell-top": row + 1,
        "--cell-left": col - 0.75,
      }}
      onMouseDown={onPressStart}
      onTouchStart={onPressStart && touchPosition(onPressStart)}
    />
  );
}
