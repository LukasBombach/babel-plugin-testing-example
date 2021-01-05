import type { Visitor } from "@babel/core";

export default function testPlugin(): { visitor: Visitor } {
  return {
    visitor: {
      Identifier(path) {
        if (path.node.name === "foo") {
          path.node.name = "baz";
        }
      },
    },
  };
}
