import { transformAsync } from "@babel/core";
import plugin from ".";

const preset = function () {
  return {
    plugins: [plugin],
  };
};

const example = `
const foo = 1;
if (foo) console.log(foo);
`;

describe("setup", () => {
  test("it works", async () => {
    const { code, map, ast } = await transformAsync(example, {
      filename: "test.ts",
      presets: [preset],
    });
    expect(code).toMatchSnapshot();
  });
});
