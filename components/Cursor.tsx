import { useState, useEffect } from "react";
import classNames from "classnames";
import styles from "../styles/Cursor.module.css";
import cellStyles from "../styles/Cell.module.css";

type Props = {
  row: number;
  col: number;
};

export default function Cursor({ row, col }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handle = setInterval(() => setVisible((value) => !value), 500);
    return () => clearInterval(handle);
  }, []);

  return (
    <span
      className={classNames(
        "absolute bg-purple-700",
        cellStyles['top-cell'],
        cellStyles['left-cell'],
        cellStyles['h-cell'],
        visible ? "visible" : "invisible",
        styles.cursor,
      )}
      style={{
        '--cell-top': row,
        '--cell-left': col,
        '--cell-height': 1
      }}
    />
  );
}
