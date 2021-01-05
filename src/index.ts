import { Visitor, PluginPass } from "@babel/core";
import { detectStyledImportName } from "./DetectStyledImportName";

export interface State extends PluginPass {
  file: Omit<PluginPass["file"], "metadata"> & {
    metadata: {
      importName: string;
    };
  };
}

export default function passerine({
  types,
}: typeof types): { visitor: Visitor<State> } {
  return {
    visitor: {
      Program: {
        enter(path, state) {
          path.traverse({
            ImportDeclaration(path) {
              detectStyledImportName(types, path, state);
            },
          });

          if (!state.file.metadata.importName) {
            console.warn("COULD NOT FIND IMPORT NAME");
          }

          debugger;
        },
      },
    },
  };
}
