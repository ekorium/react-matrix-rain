export type Size = { width: number; height: number };
export type Position = { x: number; y: number };

export type Color = string;
export type ColorStop = { offset: number; color: Color };
export type Orientation = "horizontal" | "vertical";

/**
 * Props for the MatrixRain component.
 */
export type MatrixRainProps = {

  /**
   * Color of the rendered text.
   * Using a gradient overrides this value.
   * 
   * Default value is "#00ff00" (green).
   */
  color?: Color;

  /**
   * Gradient of the rendered text.
   * It spans the whole canvas with offset 0 and 1 at the edges.
   * 
   * If not specified or empty, color is used instead.
   */
  gradient?: ColorStop[];

  /**
   * Uniform gradient of the rendered text.
   * Like gradient but offsets are computed automatically.
   * 
   * If not specified or empty, color is used instead.
   */
  uniformGradient?: Color[];

  /**
   * Orientation of gradient, if applicable.
   * 
   * Default value is "horizontal".
   */
  gradientOrientation?: Orientation;

  /**
   * Color used to fill the background with.
   * 
   * Default value is "#000000" (black).
   */
  backgroundColor?: Color;

  /**
   * String of all possible characters to be used.
   * Multiple of the same increases its probability.
   * 
   * Leave empty for a default mix of katakana, latin letters and digits.
   */
  alphabet?: string;

  /**
   * Font style of the rendered characters, in CSS-notation.
   * 
   * Default value is "1.0rem monospace".
   */
  font?: string;

  /**
   * Horizontal space around each character, as a multiplier.
   * 
   * Default value is 1.0 and leaves a little bit of space between them.
   */
  spaceX?: number;

  /**
   * Vertical space around each character, as a multiplier.
   * 
   * Default value is 1.0 and leaves almost no space between them.
   */
  spaceY?: number;

  /**
   * Dictates roughly the ratio of raining characters on the canvas.
   * 
   * Default value is 0.02.
   * A value of 0 would be completely empty and 1 would fill the entire canvas.
   */
  density?: number;

  /**
   * Time in milliseconds it takes for each character to update and fall down one step.
   * 
   * Default value is 50.
   */
  delay?: number;

  /**
   * Dictates roughly how fast characters can dry out and vanish early.
   * 
   * Default value is 1.0.
   * A value of 0 would mean they never dry and larger values would dry quicker.
   */
  dryRate?: number;

  /**
   * Dictates how large fading trail each falling character leaves behind.
   * 
   * Default value is 0.1.
   * A value of 0 means nothing ever fades and 1 means no trail.
   */
  fadeRate?: number;

  /**
   * Horizontal resolution of the canvas.
   * Too low value causes blur.
   * 
   * Omit for device screen width as default.
   */
  resolutionX?: number;

  /**
   * Vertical resolution of the canvas.
   * Too low value causes blur.
   * 
   * Omit for device screen height as default.
   */
  resolutionY?: number;

  /**
   * The z-index of the canvas.
   * 
   * Default value is -1 to place it behind other elements.
   */
  zIndex?: number
};

export type MatrixRainState = {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  rainDrops: Set<Position>;
  animationId: number;
  containerWidth: number;
  containerHeight: number;
  scaleX: number;
  scaleY: number;
  gridCols: number;
  gridRows: number;
  cellWidth: number;
  cellHeight: number;
  colorGradient: ColorStop[];
  gradientOrientation: Orientation;
  foregroundStyle: CanvasGradient;
  backgroundStyle: Color;
  alphabetArray: string[];
  font: string;
  spaceX: number;
  spaceY: number;
  density: number;
  delay: number;
  dryRate: number;
  fadeRate: number;
};
