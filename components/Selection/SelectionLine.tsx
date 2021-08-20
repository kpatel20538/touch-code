import classNames from "classnames";
import cellStyles from "../../styles/Cell.module.css";

type Props = {
  row: number;
  start: number;
  end: number;
};

export default function SelectionLine({ row, start, end }: Props) {
  return (
    <div
      className={classNames(
        "absolute opacity-25 bg-purple-700 pointer-events-none",
        cellStyles['top-cell'],
        cellStyles['left-cell'],
        cellStyles['h-cell'],
        cellStyles['w-cell'],
      )}
      style={{
        '--cell-top': row,
        '--cell-left': start,
        '--cell-height': 1,
        '--cell-width': end - start,
      }}
    />
  );
}
