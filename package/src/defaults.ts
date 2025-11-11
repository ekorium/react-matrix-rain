import type { MatrixRainProps } from "./types";

const katakana =
  "アカサタナハマヤラワイキシチニヒミリウクスツヌフムユルエケセテネヘメレオコソトノホモヨロヲン";
const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const digits = "0123456789";
const alphabet = katakana + latin + digits;

export const defaultProps: Required<MatrixRainProps> = {
  color: "#00ff00",
  gradient: [],
  uniformGradient: [],
  gradientOrientation: "horizontal",
  backgroundColor: "#000000",
  alphabet,
  font: "1.0rem monospace",
  spaceX: 1.0,
  spaceY: 1.0,
  density: 0.02,
  delay: 50,
  dryRate: 1.0,
  fadeRate: 0.1,
  resolutionX: 0,
  resolutionY: 0,
  zIndex: -1,
};

export const defaultStyle: React.CSSProperties = {
  position: "absolute",
  height: "100%",
  width: "100%",
  top: 0,
  left: 0,
};
