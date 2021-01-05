import { transformAsync } from "@babel/core";
import plugin from ".";

import type { BabelFileResult } from "@babel/core";

async function transform(code: string): Promise<BabelFileResult | null> {
  return await transformAsync(code, {
    filename: "test.tsx",
    presets: [() => ({ plugins: [plugin] })],
  });
}

test("simple example", async () => {
  const source = `
import React from "react";
import styled from "passerine";

const StyledComponent = styled.div({
  color: "red",
  background: "blue",
});

export const Component = () => <StyledComponent />;
`;

  const output = `
import React from "react";

const StyledComponent = ({children}) => React.createElement("div", {className: 'example'}, children);

export const Component = () => <StyledComponent />;
`;

  const { code } = await transform(source);
  expect(code).toBe(output);
});
