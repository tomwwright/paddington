# paddington

> Simple string-padding and columns in Javascript, useful for terminal output

```
import paddington from "paddington";

paddington
  .text("Column 1", 12)
  .text("Column 2", 12)
  .text("Column 3", 12)
  .newline()
  .text("First", 12)
  .text("Second to be truncated", 12)
  .text("Third", 12)
  .print();

/*
  'Column 1    Column 2    Column 3    '
  'First       Second to...Third       '
*/

paddington
  .text("Column 1", 10).pad(2)
  .text("Column 2", 10).pad(2)
  .text("Column 3", 10).pad(2)
  .newline()
  .text("First", 10).pad(2)
  .text("Second to be truncated", 10).pad(2)
  .text("Third", 10).pad(2)
  .print();

/*
  'Column 1    Column 2    Column 3    '
  'First       Second ...  Third       '
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

```
const paddington = require("paddington").default
```

or

```
import paddington from "paddington"
```

#### Customising

The constructor is available for import if you need to customise options:

```
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

Add some text to the buffer, padded to `width`

```

```
