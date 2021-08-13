import classNames from "classnames";
import { useEffect } from "react";
import { useState } from "react";
import styles from "../styles/Cursor.module.css";

declare module "csstype" {
  interface Properties {
    "--cursor-row"?: number;
    "--cursor-col"?: number;
  }
}

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
        "inline-block bg-purple-700 absolute",
        visible ? "visible" : "invisible",
        styles["cursor"]
      )}
      style={{
        "--cursor-row": row,
        "--cursor-col": col,
      }}
    />
  );
}
