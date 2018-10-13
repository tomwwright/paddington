import { Paddington } from ".";

test("pads to the correct length", () => {
  const paddington = new Paddington();
  expect(paddington.text("hello", 8).toString()).toEqual("hello   ");
});

test("pads right to the correct length", () => {
  const paddington = new Paddington();
  expect(paddington.textRight("hello", 8).toString()).toEqual("   hello");
});

test("chaining text", () => {
  const paddington = new Paddington();
  expect(
    paddington
      .text("test1", 8)
      .text("test2", 6)
      .toString()
  ).toEqual("test1   test2 ");
});

test("clear", () => {
  const paddington = new Paddington();

  paddington.text("test", 8).clear();

  expect(paddington.toString()).toEqual("");
});

test("print", () => {
  const paddington = new Paddington();

  const spy = jest.spyOn(console, "log");

  paddington.text("test", 8).print();

  expect(spy).toHaveBeenCalledWith("test    ");

  spy.mockRestore();
});

test("truncates", () => {
  const paddington = new Paddington();

  expect(paddington.text("stringtotruncate", 8).toString()).toEqual("strin...");
});

test("truncates with custom marker", () => {
  const paddington = new Paddington({
    truncateMarker: "|"
  });

  expect(paddington.text("stringtotruncate", 8).toString()).toEqual("stringt|");
});

test("truncates Chalk strings", () => {
  const paddington = new Paddington();

  const chalkedString = "\u001b[32mlongstringtotruncate\u001b[39m";
  const truncatedChalkedString = "\u001b[32mlongstrin...\u001b[39m";

  expect(paddington.text(chalkedString, 12).toString()).toEqual(truncatedChalkedString);
});
