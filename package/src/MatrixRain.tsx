import { useRef, useEffect } from "react";
import { defaultProps, defaultStyle } from "./defaults";

import type {
  MatrixRainProps,
  MatrixRainState,
  Size,
  ColorStop,
} from "./types";

/**
 * Renders a customizable matrix rain animation onto a canvas.
 * Scales with and fills 100% of its parent.
 */
export default function MatrixRain(props: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<MatrixRainState>(null);
  const mergedProps = { ...defaultProps, ...props };
  const style = { ...defaultStyle, zIndex: mergedProps.zIndex };

  useEffect(() => {
    if (stateRef.current) {
      updateState(mergedProps, stateRef.current);
    } else {
      stateRef.current = initializeState(mergedProps, canvasRef.current!);
    }
  }, [props]);

  useEffect(() => {
    fillBackground(stateRef.current!, false);
  }, [props.resolutionX, props.resolutionY]);

  useEffect(() => observeContainerResize(stateRef.current!), []);
  useEffect(() => createAnimationLoop(stateRef.current!), []);

  return (
    <canvas
      ref={canvasRef}
      style={style}
      width={props.resolutionX ?? screen.width}
      height={props.resolutionY ?? screen.height}
    />
  );
}

function initializeState(
  props: Required<MatrixRainProps>,
  canvas: HTMLCanvasElement
): MatrixRainState {
  const state = {
    canvas,
    context: canvas.getContext("2d")!,
    rainDrops: new Set(),
    animationId: 0,
  } as MatrixRainState; // shut up TypeScript!

  updateContainerSize(state);
  updateState(props, state);
  return state;
}

function updateState(
  props: Required<MatrixRainProps>,
  state: MatrixRainState
): void {
  state.alphabetArray = Array.from(props.alphabet);
  state.font = props.font;
  state.spaceX = props.spaceX;
  state.spaceY = props.spaceY;
  state.density = props.density;
  state.delay = props.delay;
  state.dryRate = props.dryRate;
  state.fadeRate = props.fadeRate;

  state.colorGradient = getColorGradient(props, state);
  state.gradientOrientation = props.gradientOrientation;
  state.backgroundStyle = props.backgroundColor;
  updateForegroundStyle(state);
  updateCellSize(state);
  updateGridSize(state);
  updateScale(state);
}

function observeContainerResize(state: MatrixRainState): () => void {
  const observer = new ResizeObserver((entries) => {
    updateContainerSize(state, entries[0].contentRect);
    updateForegroundStyle(state);
    updateGridSize(state);
    updateScale(state);
  });

  observer.observe(state.canvas);
  return () => observer.disconnect();
}

function createAnimationLoop(state: MatrixRainState): () => void {
  const time = performance.now();
  updateAnimationLoop(state, time, time);
  return () => cancelAnimationFrame(state.animationId);
}

function updateAnimationLoop(
  state: MatrixRainState,
  time: number,
  nextUpdateTime: number
): void {
  if (time > nextUpdateTime) {
    updateRainDrops(state);
    animateNextFrame(state);
  }

  const deltaTime = time - nextUpdateTime;
  const adjustMultiple = Math.ceil(deltaTime / state.delay);
  nextUpdateTime += state.delay * adjustMultiple;

  state.animationId = requestAnimationFrame((nextTime) =>
    updateAnimationLoop(state, nextTime, nextUpdateTime)
  );
}

function updateRainDrops(state: MatrixRainState): void {
  const targetRainDropCount = state.density * state.gridCols * state.gridRows;
  const missingRainDropCount = targetRainDropCount - state.rainDrops.size;
  const dryProbability = state.dryRate / state.gridRows;

  for (let i = 0; i < missingRainDropCount; i++) {
    if (Math.random() < state.density) {
      state.rainDrops.add({ x: randomRange(state.gridCols), y: -1 });
    }
  }

  for (const rainDrop of state.rainDrops) {
    rainDrop.y++;

    if (
      rainDrop.x >= state.gridCols ||
      rainDrop.y >= state.gridRows ||
      Math.random() < dryProbability
    ) {
      state.rainDrops.delete(rainDrop);
    }
  }
}

function animateNextFrame(state: MatrixRainState): void {
  fillBackground(state, true);

  state.context.scale(state.scaleX, state.scaleY);
  state.context.fillStyle = state.foregroundStyle;
  state.context.font = state.font;
  state.context.textBaseline = "middle";
  state.context.textAlign = "center";

  for (const rainDrop of state.rainDrops) {
    const text = pickRandom(state.alphabetArray);
    const offsetX = (rainDrop.x + 0.5) * state.cellWidth;
    const offsetY = (rainDrop.y + 0.5) * state.cellHeight;
    state.context.fillText(text, offsetX, offsetY);
  }

  state.context.resetTransform();
}

function updateContainerSize(state: MatrixRainState, size?: Size): void {
  const { width, height } = size ?? state.canvas.getBoundingClientRect();
  state.containerWidth = width;
  state.containerHeight = height;
}

function updateCellSize(state: MatrixRainState): void {
  state.context.font = state.font;
  const textMetrics = state.context.measureText("j");
  const length =
    textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
  state.cellWidth = state.spaceX * length;
  state.cellHeight = state.spaceY * length;
}

function updateGridSize(state: MatrixRainState): void {
  state.gridCols = Math.round(state.containerWidth / state.cellWidth);
  state.gridRows = Math.round(state.containerHeight / state.cellHeight);
}

function updateScale(state: MatrixRainState): void {
  state.scaleX = state.canvas.width / (state.cellWidth * state.gridCols);
  state.scaleY = state.canvas.height / (state.cellHeight * state.gridRows);
}

function fillBackground(state: MatrixRainState, useAlpha: boolean): void {
  state.context.globalAlpha = useAlpha ? state.fadeRate : 1;
  state.context.fillStyle = state.backgroundStyle;
  state.context.fillRect(0, 0, state.canvas.width, state.canvas.height);
  state.context.globalAlpha = 1;
}

function getColorGradient(
  props: Required<MatrixRainProps>,
  state: MatrixRainState
): ColorStop[] {
  if (props.gradient.length > 0) {
    return structuredClone(props.gradient);
  }

  if (props.uniformGradient.length === 0) {
    return [{ offset: 0, color: props.color }];
  }

  const baseOffset = 1 / Math.max(1, props.uniformGradient.length - 1);

  return props.uniformGradient.map((color, index) => ({
    offset: index * baseOffset,
    color,
  }));
}

function updateForegroundStyle(state: MatrixRainState): void {
  const [endX, endY] =
    state.gradientOrientation === "horizontal"
      ? [state.containerWidth, 0]
      : [0, state.containerHeight];

  state.foregroundStyle = state.context.createLinearGradient(0, 0, endX, endY);

  for (const { offset, color } of state.colorGradient) {
    state.foregroundStyle.addColorStop(offset, color);
  }
}

function randomRange(limit: number): number {
  return Math.floor(limit * Math.random());
}

function pickRandom<T>(array: T[]): T {
  return array[randomRange(array.length)];
}
