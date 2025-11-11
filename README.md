<h1>Matrix Rain</h1>

A React component that renders a customizable matrix rain animation onto a canvas. It automatically scales with and fills 100% of parent. See https://ekorium.github.io/react-matrix-rain/ for a demo of how it looks with default settings. In order to use it, first install with:

    npm i react-matrix-rain

Then import with:

    import MatrixRain from "react-matrix-rain"

This package currently only supports ESM modules, not CommonJS.

<h2>Customization<h2>
Here's a complete list of all props to the component. All of them are optional and have default values.

<h3>resolutionX<h3>>
Horizontal resolution of the canvas.
Too low value causes blur.
Omit for device screen width as default.

<h3>resolutionY<h3>>
Vertical resolution of the canvas.
Too low value causes blur.
Omit for device screen height as default.

<h3>color</h3>
Color of the rendered text.
Using a gradient overrides this value. 
Default value is "#0f0" (green).

<h3>gradient</h3>
Gradient of the rendered text.
It spans the whole canvas with offset 0 and 1 at the edges.
If not specified or empty, color is used instead.

<h3>uniformGradient</h3>
Uniform gradient of the rendered text.
Like gradient but offsets are computed automatically.
If not specified or empty, color is used instead.

<h3>gradientOrientation</h3>
Orientation of gradient, if applicable.
Default value is "horizontal".

<h3>backgroundColor</h3>
Color used to fill the background with.
Default value is "#000" (black).

<h3>alphabet</h3>
String of all possible characters to be used.
Multiple of the same increases its probability.
Leave empty for a default mix of katakana, english alphabet and digits.

<h3>font</h3>
Font style of the rendered characters, in CSS-notation.
Default value is "1.0rem monospace".

<h3>spaceX</h3>
Extra horizontal space around each character, as a multiplier.
Default value is 1.0 and leaves a little bit of space between them.

<h3>spaceY</h3>
Extra vertical space around each character, as a multiplier.
Default value is 1.0 and leaves almost no space between them.

<h3>density</h3>
Dictates roughly the ratio of raining characters on the canvas.
Default value is 0.02.
A value of 0 would be completely empty and 1 would fill the entire canvas.

<h3>delay</h3>
Time in milliseconds it takes for each character to update and fall down one step.
Default value is 50.

<h3>dryRate</h3>
Dictates roughly how fast characters can dry out and vanish early.
Default value is 1.0.
A value of 0 would mean they never dry and larger values would dry quicker.

<h3>fadeRate</h3>
Dictates how large fading trail each falling character leaves behind.
Default value is 0.1.
A value of 0 means nothing ever fades and 1 means no trail.
