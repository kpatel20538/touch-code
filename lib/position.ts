import { CSSProperties, MouseEvent, TouchEvent } from "react";
import { Position } from "../store";

type Coordinate = {
  x: number;
  y: number;
}

type PositionCallback = (position: Position) => void;
type MouseCallback = (event: MouseEvent) => void;
type TouchCallback = (event: TouchEvent) => void;

declare module "csstype" {
  interface Properties {
    "--block-height"?: string;
    "--block-width"?: string;
    '--cell-top'?: number,
    '--cell-left'?: number,
    '--cell-height'?: number,
    '--cell-width'?: number,
  }
}

export const BLOCK_HEIGHT = 24;
export const BLOCK_WIDTH = 9.6;

export const blockStyle: CSSProperties = {
  '--block-height': `${BLOCK_HEIGHT}px`,
  '--block-width': `${BLOCK_WIDTH}px`,
}

export function toPosition({ x, y }: Coordinate): Position {
  return [y / BLOCK_HEIGHT, x / BLOCK_WIDTH];
}

function fromMouseEvent(event: MouseEvent): Coordinate {
  const element = event.target as HTMLElement;
  const { top, left } = element.getBoundingClientRect();
  const x = element.offsetLeft + event.clientX - left;
  const y = element.offsetTop + event.clientY - top;
  return { x, y };
}

function fromTouchEvent(event: TouchEvent, idx = 0, length = 1): Coordinate | null {
  if (event.touches.length !== length) {
    return null;
  }
  const element = event.target as HTMLElement;
  const { top, left } = element.getBoundingClientRect();
  const x = element.offsetLeft + event.touches[idx].clientX - left;
  const y = element.offsetTop + event.touches[idx].clientY - top;
  return { x, y };
}

export function mousePosition(callback: PositionCallback): MouseCallback {
  return event => {
    const coordinate = fromMouseEvent(event);
    const position = toPosition(coordinate);
    callback(position);
  }
}

export function touchPosition(callback: PositionCallback, idx = 0, length = 1): TouchCallback {
  return event => {
    const coordinate = fromTouchEvent(event, idx, length);
    if (coordinate) {
      const position = toPosition(coordinate);
      callback(position);
    }
  }
}
