import type { FC, CSSProperties } from "react";

declare interface Styled {
  div: (styles: CSSProperties) => FC;
}

declare const styled: Styled;

export default styled;
