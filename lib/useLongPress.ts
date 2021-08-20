import { MouseEvent, TouchEvent, useEffect, useState } from 'react';
import { Position } from '../store';
import { mousePosition, touchPosition } from './position';

type LongPressOptions = {
  onStart?: (position: Position) => void;
  onEnd?: (position: Position) => void;
  onMove?: (position: Position, isCanceled: boolean) => void;
  onCancel?: (position: Position) => void;
  onPress?: (position: Position) => void;
  onLongPress?: (position: Position) => void;
};

type LongPressProps = {
  onMouseUp: (event: MouseEvent) => void;
  onMouseDown: (event: MouseEvent) => void;
  onMouseMove: (event: MouseEvent) => void;
  onMouseLeave: (event: MouseEvent) => void;
  onTouchStart: (event: TouchEvent) => void;
  onTouchEnd: (event: TouchEvent) => void;
  onTouchMove: (event: TouchEvent) => void;
}

const DISTANCE_THRESHOLD = 3;
const DELAY = 400;

export function useLongPress({
  onStart,
  onEnd,
  onMove,
  onCancel,
  onPress,
  onLongPress,
}: LongPressOptions): LongPressProps {
  const [isPressing, setIsPressing] = useState<boolean>(true);
  const [enqueue, setEnqueue] = useState<Position | null>(null);

  function handleStart(position: Position) {
    onStart?.(position);
    setEnqueue(position);
    setIsPressing(true);
  }

  function handleEnd(position: Position) {
    enqueue !== null && onPress?.(position);
    onEnd?.(position);
    setEnqueue(null);
    setIsPressing(false);
  }

  function handleMove(position: Position) {
    if (enqueue !== null && (
      Math.abs(enqueue[0] - position[0]) > DISTANCE_THRESHOLD
      || Math.abs(enqueue[1] - position[1]) > DISTANCE_THRESHOLD
    )) {
      onCancel?.(position);
      onPress?.(position);
      setEnqueue(null);
    }

    isPressing && onMove?.(position, enqueue === null);
  }

  function handleLongPress() {
    if (enqueue) {
      onLongPress?.(enqueue);
      setEnqueue(null);
    }
  }

  useEffect(() => {
    if (enqueue) {
      const handle = setTimeout(handleLongPress, DELAY);
      return () => clearTimeout(handle);
    }
  }, [enqueue]);

  return {
    onMouseUp: mousePosition(handleEnd),
    onMouseDown: mousePosition(handleStart),
    onMouseMove: mousePosition(handleMove),
    onMouseLeave: mousePosition(handleEnd),
    onTouchStart: touchPosition(handleStart),
    onTouchEnd: touchPosition(handleEnd),
    onTouchMove: touchPosition(handleMove),
  }
}
