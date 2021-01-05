import { Visitor, PluginPass } from "@babel/core";
import { detectStyledImportName } from "./DetectStyledImportName";

import type core from "@babel/core";

export type Core = typeof core;

export interface State extends PluginPass {
  file: Omit<PluginPass["file"], "metadata"> & {
    metadata: {
      importName: string;
    };
  };
}

export default function passerine({
  types,
}: Core): { visitor: Visitor<State> } {
  return {
    visitor: {
      Program: {
        enter(path, state) {
          path.traverse({
            ImportDeclaration(path) {
              detectStyledImportName(types, path, state);
            },
          });

          const { importName } = state.file.metadata;

          if (!importName) {
            console.warn("COULD NOT FIND IMPORT NAME");
          }

          path.traverse({
            CallExpression(path) {
              const { callee } = path.node;
              if (!types.isMemberExpression(callee)) {
                return;
              }
              if (!types.isIdentifier(callee.object)) {
                return;
              }
              if (callee.object.name === importName) {
                path.replaceWith(
                  types.arrowFunctionExpression(
                    [types.identifier("props")],
                    types.callExpression(
                      types.memberExpression(
                        types.identifier("React"),
                        types.identifier("createElement")
                      ),
                      [
                        types.stringLiteral("div"),
                        types.objectExpression([
                          types.objectProperty(
                            types.stringLiteral("className"),
                            types.stringLiteral("p12p")
                          ),
                        ]),
                        types.objectExpression([
                          types.objectProperty(
                            types.stringLiteral("props"),
                            types.stringLiteral("children")
                          ),
                        ]),
                      ]
                    )
                  )
                );
              }
            },
          });
        },
      },
    },
  };
}
