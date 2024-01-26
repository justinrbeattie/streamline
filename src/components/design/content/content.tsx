import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./content.css?inline";
export interface ContentProps {
  type: "decorative" | "text" | "image";
  mobilePlacement: Placement;
  tabletPlacement: Placement;
  desktopPlacement: Placement;
}

export const ContentComponent = component$<ContentProps>(
  ({
    type = "text",
    mobilePlacement = {
      colStart: "col 1",
      colEnd: "col 8",
      rowStart: "row 1",
      rowEnd: "row 8",
    },
    tabletPlacement = {
      colStart: "col 1",
      colEnd: "col 8",
      rowStart: "row 1",
      rowEnd: "row 8",
    },
    desktopPlacement = {
      colStart: "col 1",
      colEnd: "col 8",
      rowStart: "row 1",
      rowEnd: "row 8",
    },
  }) => {
    useStylesScoped$(styles);

    return (
      <div
        class={`content content-type-${type}`}
        style={`
      --mobile-cols:${mobilePlacement.colStart} / 
      ${mobilePlacement.colSpan || mobilePlacement.colEnd};
      --tablet-cols:${tabletPlacement.colStart} / 
      ${tabletPlacement.colSpan || tabletPlacement.colEnd};
      --desktop-cols:${desktopPlacement.colStart} / 
      ${desktopPlacement.colSpan || desktopPlacement.colEnd};
      --mobile-rows:${mobilePlacement.rowStart} / 
      ${mobilePlacement.rowSpan || mobilePlacement.rowEnd};
      --tablet-rows:${tabletPlacement.rowStart} / 
      ${tabletPlacement.rowSpan || tabletPlacement.rowEnd};
      --desktop-rows:${desktopPlacement.rowStart} / 
      ${desktopPlacement.rowSpan || desktopPlacement.rowEnd};
      `}
      >
        <Slot></Slot>
      </div>
    );
  }
);

interface Placement {
  colStart: Column;
  colEnd: Column;
  colSpan?: Span;
  rowStart: Row;
  rowEnd: Row;
  rowSpan?: Span;
}

type Column =
  | "left-gutter"
  | "col 1"
  | "col 2"
  | "col 3"
  | "col 4"
  | "col 5"
  | "col 6"
  | "col 7"
  | "col 8"
  | "col 9"
  | "col 10"
  | "col 11"
  | "col 12"
  | "right-gutter";
type Row =
  | "top-gutter"
  | "row 1"
  | "row 2"
  | "row 3"
  | "row 4"
  | "row 5"
  | "row 6"
  | "row 7"
  | "row 8"
  | "row 9"
  | "row 10"
  | "row 11"
  | "row 12"
  | "row 13"
  | "row 14"
  | "row 15"
  | "row 16"
  | "row 17"
  | "row 18"
  | "row 19"
  | "row 20"
  | "bottom-gutter";
type Span =
  | "span 0"
  | "span 1"
  | "span 2"
  | "span 3"
  | "span 4"
  | "span 5"
  | "span 6"
  | "span 7"
  | "span 8"
  | "span 9"
  | "span 10"
  | "span 11"
  | "span 12"
  | "span 13"
  | "span 14"
  | "span 15"
  | "span 16"
  | "span 17"
  | "span 18"
  | "span  19"
  | "span 20";
