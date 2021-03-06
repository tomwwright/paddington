import strip from "strip-ansi";

export interface IPaddingtonOptions {
  truncateMarker?: string;
  padCharacter?: string;
  printFunction?: (text: string) => void;
}

export class Paddington {
  private buffer: string = "";

  private truncateMarker = "...";
  private padCharacter = " ";
  private printFunction = console.log; // tslint:disable-line

  constructor(options: IPaddingtonOptions = {}) {
    Object.assign(this, options);
  }

  public text(text: string, width: number = text.length) {
    return this.textLeft(text, width);
  }

  public textLeft(text: string, width: number) {
    const { truncated, truncatedLength } = this.truncate(text, width);

    this.buffer += truncated;
    this.pad(Math.max(0, width - truncatedLength));

    return this;
  }

  public textRight(text: string, width: number) {
    const { truncated, truncatedLength } = this.truncate(text, width);

    this.pad(Math.max(0, width - truncatedLength));
    this.buffer += truncated;

    return this;
  }

  public pad(width: number) {
    this.buffer += this.padding(width);
    return this;
  }

  public newline() {
    this.buffer += "\n";
    return this;
  }

  public clear() {
    this.buffer = "";

    return this;
  }

  public toString() {
    return this.buffer;
  }

  public print() {
    this.printFunction(this.buffer);

    this.clear();
    return this;
  }

  private truncate(text: string, maxWidth: number) {
    const stripped = strip(text);
    if (stripped.length > maxWidth) {
      const truncated = stripped.substring(0, maxWidth - this.truncateMarker.length) + this.truncateMarker;
      text = text.replace(stripped, truncated);
    }
    return {
      truncated: text,
      truncatedLength: Math.min(maxWidth, stripped.length)
    };
  }

  private padding(width: number) {
    let pad = "";
    for (let i = 0; i < width; ++i) {
      pad += this.padCharacter;
    }
    return pad;
  }
}

export default new Paddington();
