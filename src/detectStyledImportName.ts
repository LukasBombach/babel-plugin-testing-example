import type { types } from "@babel/core";
import type { ImportDeclaration } from "@babel/types";
import type { NodePath } from "@babel/traverse";
import pkg from "../package.json";

import type { State } from ".";

export function detectStyledImportName(
  t: typeof types,
  path: NodePath<ImportDeclaration>,
  state: State
) {
  if (!t.isLiteral(path.node.source, { value: pkg.name })) {
    return;
  }

  path.node.specifiers.forEach(specifier => {
    if (
      t.isImportDefaultSpecifier(specifier) ||
      t.isImportSpecifier(specifier)
    ) {
      state.file.metadata.importName = specifier.local.name;
      path.remove();
    }
  });
}
