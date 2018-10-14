# paddington

> Simple string-padding and columns in Javascript, useful for terminal output

```js
import paddington from "paddington";

paddington
  .text("Column 1", 12)
  .text("Column 2", 12)
  .text("Column 3", 12)
  .newline()
  .text("First", 12)
  .text("Secondtobetruncated", 12)
  .text("Third", 12)
  .print();

/*
  'Column 1    Column 2    Column 3    '
  'First       Secondtob...Third       '
*/

paddington
  .text("Column 1", 10)
  .pad(2)
  .text("Column 2", 10)
  .pad(2)
  .text("Column 3", 10)
  .pad(2)
  .newline()
  .text("First", 10)
  .pad(2)
  .text("Secondtobetruncated", 10)
  .pad(2)
  .text("Third", 10)
  .pad(2)
  .print();

/*
  'Column 1    Column 2    Column 3    '
  'First       Secondt...  Third       '
*/
```

## Install

Add `paddington` to your project with:

```
npm install --save paddington
```

or

```
yarn add paddington
```

## Usage

`paddington` provides a ready-to-use instance of itself as the default export:

```js
const paddington = require("paddington").default;
```

or

```js
import paddington from "paddington";
```

#### Customising

The constructor is available for import if you need to customise options:

```js
const Paddington = require("paddington").Paddington
// or
import { Paddington } from "paddington";

const Paddington = new Paddington({
  truncateMarker: "(more)"      // default "..."
  padCharacter: "_"             // default " "
  printFunction: myCustomPrint  // default console.log
});
```

## API

#### `paddington.text(text: string, width: number)`

Add some text to the buffer, padded to `width` by `padCharacter` (default `" "`) or truncated to `width` (including `truncateMarker` in the truncated string). Returns itself for chaining.

```js
paddington.text("padded", 10).print();

// 'padded    '

paddington
  .text("chaining", 10)
  .text("is", 10)
  .text("fun", 10)
  .print();

// 'chaining  is        fun          '

paddington.text("truncatedstring", 8).print();

// 'trunc...'

paddington = new Paddington({
  truncateMarker: " (more)"
});

paddington.text("texttexttexttext", 16).print();

// 'texttextt (more)'
```

#### `paddington.text(text: string)`

Add some text to the buffer, without padding or truncation. Useful for last columns that don't need to be bounded in width. Returns itself for chaining.

```js
paddington
  .text("Column 1", 10)
  .text("Column 2", 10)
  .text("Column 3", 10)
  .newline()
  .text("Pad this", 10)
  .text("This too", 10)
  .text("This one is fine, it's the last column wee")
  .print();

// 'Column 1  Column 2  Column 3  '
// 'Pad this  This too  This one is fine, it's the last column wee'
```

#### `paddington.textLeft(text: string, width: number)`

Alias for `paddington.text(text: string, width: number)`

#### `paddington.textRight(text: string, width: number)`

Add some text to the buffer, right-aligned (padded on left side to `width`). Returns itself for chaining.

```js
paddington
  .text("Column 1", 10)
  .newline()
  .textRight("right", 10)
  .print();

// 'Column 1  '
// '     right'
```

#### `paddington.pad(width: number)`

Add padding of size `width` to buffer -- uses `padCharacter` (default `" "` -- space). Returns itself for chaining.

```js
paddington
  .text("we need")
  .pad(4)
  .text("space")
  .print();

// 'we need    space'

paddington = new Paddington({
  padCharacter: "_"
});

paddington
  .text("we need")
  .pad(4)
  .text("space")
  .print();

// 'we need____space'
```

#### `paddington.newline()`

Add a newline to the buffer. Returns itself for chaining.

```js
paddington
  .text("line", 8)
  .newline()
  .text("break", 8)
  .print();

// 'line    '
// 'break   '
```

#### `paddington.clear()`

Clears the internal `paddington` buffer. Returns itself for chaining.

```js
paddington
  .text("adding some cool text")
  .clear()
  .print();

// ''
```

#### `paddington.print()`

Prints the internal buffer to `printFunction` and then clears it. Default `printFunction` is `console.log` -- this can be overwritted in the constructor. Returns itself for chaining.

```js
paddington.text("hello, world", 16).print();

// 'hello, world    '

paddington = new Paddington({
  printFunction: mySuperCoolFileOutputter
});

paddington.text("more text").print();

// mySuperCoolFileOutputter("more text") was invoked
```

#### `paddington.toString()`

Returns the current contents of the initial buffer

```js
const woohoo = paddington
  .text("woo", 6)
  .text("hoo", 6)
  .toString();

console.log(woohoo);

// 'woo   hoo   '
```
