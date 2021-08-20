import { Position, TextBuffer } from "../../store";
import SelectionLine from "./SelectionLine";

type Props = {
  buffer: TextBuffer;
  start: Position | null;
  end: Position | null;
  onAlphaMove?: (position: Position) => void;
  onBetaMove?: (position: Position) => void;
};

function range(start: number, stop: number): number[] {
  return Array.from({ length: stop - start }, (_, i) => i + start);
}

export default function SelectionArea({
  start,
  end,
  buffer,
}: Props) {
  function getSelectionEnd(row: number, col: number = Infinity): number {
    const length = buffer[row]?.text?.length ?? 0;
    return length <= col ? length + 0.5 : col;
  }

  if (!start || !end || (start[0] == end[0] && start[1] == end[1])) {
    return null;
  }

  if (start[0] === end[0]) {
    const endCol = getSelectionEnd(end[0], end[1]);
    return (
      <SelectionLine
        key={start[0]}
        row={start[0]}
        start={start[1]}
        end={endCol}
      />
    );
  }
  const endCol = getSelectionEnd(end[0], end[1]);
  return (
    <>
      <SelectionLine
        key={start[0]}
        row={start[0]}
        start={start[1]}
        end={getSelectionEnd(start[0])}
      />
      {range(start[0] + 1, end[0]).map((row) => (
        <SelectionLine
          key={row}
          row={row}
          start={0}
          end={getSelectionEnd(row)}
        />
      ))}
      <SelectionLine key={end[0]} row={end[0]} start={0} end={endCol} />
    </>
  );
}
