import strip from "strip-ansi";

export type PaddingtonOptions = {
  truncateMarker?: string;
  padCharacter?: string;
};

export class Paddington {
  private buffer: string = "";

  private truncateMarker = "...";
  private padCharacter = " ";

  constructor(options: PaddingtonOptions = {}) {
    Object.assign(this, options);
  }

  text = this.textLeft;
  textLeft(string: string, width: number) {
    const truncated = this.truncate(string, width);

    this.buffer += truncated;
    this.pad(Math.max(0, width - truncated.length));

    return this;
  }

  textRight(string: string, width: number) {
    const truncated = this.truncate(string, width);

    this.pad(Math.max(0, width - truncated.length));
    this.buffer += truncated;

    return this;
  }

  pad(width: number) {
    this.buffer += this.padding(width);
    return this;
  }

  clear() {
    this.buffer = "";

    return this;
  }

  toString() {
    const string = this.buffer;
    this.buffer = "";

    return string;
  }

  print() {
    console.log(this.buffer);

    this.clear();
    return this;
  }

  private truncate(string: string, maxWidth: number) {
    const stripped = strip(string);
    if (stripped.length > maxWidth) {
      const truncated = stripped.substring(0, maxWidth - this.truncateMarker.length) + this.truncateMarker;
      string = string.replace(stripped, truncated);
    }
    return string;
  }

  private padding(width: number) {
    let pad = "";
    for (let i = 0; i < width; ++i) pad += this.padCharacter;
    return pad;
  }
}

export default new Paddington();
