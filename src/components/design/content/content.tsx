import {
  component$,
  Slot,
  useContext,
  useSignal,
  useStore,
  useStyles$,
  useVisibleTask$,
} from "@builder.io/qwik";
import styles from "./content.css?inline";
import { LayoutContext } from "~/routes/layout";

export interface ContentProps {
  emulatedBreakpoint:'' | 'emulated-xs' | 'emulated-sm' | 'emulated-md' | 'emulated-lg' | 'emulated-xl';
  width: number | null;
  type: "decorative" | "text" | "image";
  layer: "-5" | "-4" | "-3" | "-2" | "-1" | "0" | "1" | "2" | "3" | "4" | "5";
  xs: Placement;
  sm: Placement;
  md: Placement;
  lg: Placement;
  xl: Placement;
  autoRows: boolean;
  builderBlock:any;
}

export const ContentComponent = component$<(ContentProps)>(
  ({
    emulatedBreakpoint = '',
    type = "text",
    layer = "0",
    autoRows = false,
    builderBlock = {},
    xs = {
      hidden: false,
      colStart: "col 1",
      colEnd: "col 8",
      rowStart: "row 1",
      rowEnd: "row 8",
    },
    sm = {
      hidden: false,
      colStart: "col 1",
      colEnd: "col 8",
      rowStart: "row 1",
      rowEnd: "row 8",
    },

    md = {
      hidden: false,
      colStart: "col 1",
      colEnd: "col 8",
      rowStart: "row 1",
      rowEnd: "row 8",
    },
    lg = {
      hidden: false,
      colStart: "col 1",
      colEnd: "col 8",
      rowStart: "row 1",
      rowEnd: "row 8",
    },
    xl = {
      hidden: false,
      colStart: "col 1",
      colEnd: "col 8",
      rowStart: "row 1",
      rowEnd: "row 8",
    },
  }) => {
    useStyles$(styles);
    const layoutContext = useContext(LayoutContext);
    const innerRef = useSignal<Element>();
    const innerContent = useStore<{
      height: number;
      width: number;
      rows: number;
    }>({ height: 0, width: 0, rows: 0 });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
      console.log(builderBlock);
      if (innerRef.value && layoutContext.isEditing) {
        layoutContext.screen.emulatedBreakpoint = emulatedBreakpoint;
        const observer = new ResizeObserver((entries) => {
          entries.forEach((entry) => {
            innerContent.height = entry.contentRect.height;
            innerContent.rows = Math.round(innerContent.height / 64);

            if (autoRows) {
              console.log(innerContent.rows);
            }
          });
        });

        observer.observe(innerRef.value);

        return () => {
          observer.disconnect();
        };
      }
    });

    return (
      <div
        class={`section-content section-content-type-${type} ${layoutContext.isEditing ? "is-editing" : ""} layer-${layer}`}
        style={`
        --xs-cols: ${xs.colStart} / ${xs.colSpan || xs.colEnd};
        --sm-cols: ${sm.colStart} / ${sm.colSpan || sm.colEnd};
        --md-cols: ${md.colStart} / ${md.colSpan || md.colEnd};
        --lg-cols: ${lg.colStart} / ${lg.colSpan || lg.colEnd};
        --xl-cols: ${xl.colStart} / ${xl.colSpan || xl.colEnd};
        --xs-rows: ${xs.rowStart} / ${xs.rowSpan || xs.rowEnd};
        --sm-rows: ${sm.rowStart} / ${sm.rowSpan || sm.rowEnd};
        --md-rows: ${md.rowStart} / ${md.rowSpan || md.rowEnd};
        --lg-rows: ${lg.rowStart} / ${lg.rowSpan || lg.rowEnd};
        --xl-rows: ${xl.rowStart} / ${xl.rowSpan || xl.rowEnd};

        --xs-hidden: ${xs.hidden ? "none" : "block"};
        --sm-hidden: ${sm.hidden ? "none" : "block"};
        --md-hidden: ${md.hidden ? "none" : "block"};
        --lg-hidden: ${lg.hidden ? "none" : "block"};
        --xl-hidden: ${xl.hidden ? "none" : "block"};
      `}
      >
        <div
          ref={innerRef}
          class="section-content-inner"
          data-rows={innerContent.rows}
        >
          <Slot></Slot>
        </div>
      </div>
    );
  }
);

interface Placement {
  hidden: boolean;
  colStart: Column;
  colEnd?: Column;
  colSpan?: Span;
  rowStart: Row;
  rowEnd?: Row;
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
