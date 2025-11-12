# Matrix Rain

A React component that renders a customizable matrix rain animation onto a canvas. It automatically scales with and fills 100% of its parent. This package has full TypeScript support but currently only supports ESM modules, not CommonJS.

## Install

```bash
npm i react-matrix-rain
```

## Import

```ts
import MatrixRain from "react-matrix-rain"
```

## Examples

Here are a few examples with code and link to a demo page showing how each example looks.

[Default settings with green text and black background](https://ekorium.github.io/react-matrix-rain/)

```tsx
<MatrixRain />
```

[Gradient with faster and heavier rain](https://ekorium.github.io/react-matrix-rain/#%7B%22uniformGradient%22%3A%5B%22red%22%2C%22green%22%2C%22blue%22%5D%2C%22spaceX%22%3A0.8%2C%22density%22%3A0.1%2C%22delay%22%3A30%2C%22dryRate%22%3A3.5%7D)

```tsx
<MatrixRain
  uniformGradient={["red", "green", "blue"]}
  spaceX={0.8}
  density={0.1}
  delay={30}
  dryRate={3.5}
/>
```

[Vertical gradient with blurry text](https://ekorium.github.io/react-matrix-rain/#%7B%22gradient%22%3A%5B%7B%22offset%22%3A0.1%2C%22color%22%3A%22purple%22%7D%2C%7B%22offset%22%3A0.3%2C%22color%22%3A%22yellow%22%7D%2C%7B%22offset%22%3A0.8%2C%22color%22%3A%22red%22%7D%2C%7B%22offset%22%3A1%2C%22color%22%3A%22black%22%7D%5D%2C%22gradientOrientation%22%3A%22vertical%22%2C%22density%22%3A0.05%2C%22dryRate%22%3A0.5%2C%22resolutionY%22%3A50%7D)

```tsx
<MatrixRain
  gradient={[
    { offset: 0.1, color: "purple" },
    { offset: 0.3, color: "yellow" },
    { offset: 0.8, color: "red" },
    { offset: 1.0, color: "black" },
  ]}
  gradientOrientation="vertical"
  density={0.05}
  dryRate={0.5}
  resolutionY={50}
/>
```

## Props

Here's a complete list of all props to the component. All of them are optional and have default values. Invalid values have undefined behavior and may throw errors.

### `color: string`

- Color of the rendered text, in CSS-notation.
- Using a gradient overrides this value.
- Default value is `"#00ff00"` (green).

### `gradient: { offset: number, color: string }[]`

- Gradient of the rendered text, as an array of color stops.
- It spans the whole canvas with offset 0 and 1 at the edges.
- If not specified or empty, **`color`** is used instead.

### `uniformGradient: string[]`

- Uniform gradient of the rendered text, as an array of colors in CSS-notation.
- If not specified or empty, **`color`** is used instead.

### `gradientOrientation: "horizontal" | "vertical"`

- Orientation of gradient, if applicable.
- Default value is `"horizontal"`.

### `backgroundColor: string`

- Color used to fill the background with, in CSS-notation.
- Default value is `"#000000"` (black).

### `alphabet: string`

- String of all possible characters to be used.
- Multiple of the same character makes it appear more often.
- Leave empty for a default mix of katakana, latin letters and digits.

### `font: string`

- Font style of the rendered characters, in CSS-notation.
- Default value is `"1.0rem monospace"`.

### `spaceX: number`

- Horizontal space around each character, as a multiplier.
- Default value is `1.0` and leaves a little bit of space between them.

### `spaceY: number`

- Vertical space around each character, as a multiplier.
- Default value is `1.0` and leaves almost no space between them.

### `density: number`

- Dictates roughly the ratio of raining characters on the canvas.
- A value of 0 would be completely empty and 1 would fill the entire canvas.
- Default value is `0.02`.

### `delay: number`

- Time in milliseconds it takes for each character to update and fall down one step.
- Any positive number works but updates won't happen more than once per frame.
- Default value is `50`.

### `dryRate: number`

- Dictates roughly how fast characters can dry out and vanish early.
- A value of 0 would mean they never dry and larger values would dry quicker.
- Default value is `1.0`.

### `fadeRate: number`

- Dictates how large fading trail each falling character leaves behind.
- A value of 0 means nothing ever fades and 1 means no trail.
- Default value is `0.1`.

### `resolutionX: number`

- Horizontal resolution of the canvas.
- Too low value causes blur.
- Omit for device screen width as default.

### `resolutionY: number`

- Vertical resolution of the canvas.
- Too low value causes blur.
- Omit for device screen height as default.

### `zIndex: number`

- The z-index of the canvas.
- Default value is `-1` to place it behind other elements.
