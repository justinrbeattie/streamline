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
  width: number | null;
  type: "decorative" | "text" | "image";
  layer: "-5" | "-4" | "-3" | "-2" | "-1" | "0" | "1" | "2" | "3" | "4" | "5";
  xs: Placement;
  sm: Placement;
  md: Placement;
  lg: Placement;
  xl: Placement;
  attributes: any;
  state: any;
}

export const ContentComponent = component$<ContentProps>(
  ({
    type = "text",
    layer = "0",
    attributes = undefined,
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
    const store = useStore<AutoRowsStore>({
      viewportHeight: 0,
      height: 0,
      autoRows: "span 1",
    });

    if (type === "text") {
      // eslint-disable-next-line
      useVisibleTask$(() => {
        if (innerRef.value) {
          const observer = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
              store.viewportHeight = window.innerHeight;
              store.height = entry.contentRect.height;
              store.autoRows =
                "span " +
                Math.max(
                  1,
                  Math.round(store.height / (store.viewportHeight * 0.09))
                );
            });
          });

          observer.observe(innerRef.value);
          return () => {
            observer.disconnect();
          };
        }
      });
    }

    return (
      <div
        {...attributes}
        class={`section-content section-content-type-${type} ${layoutContext.isEditing ? "is-editing" : ""} layer-${layer} ${attributes?.className || ""}`}
        style={`
        --xs-cols: ${xs.colStart} / ${xs.colSpan};
        --sm-cols: ${sm.colStart} / ${sm.colSpan};
        --md-cols: ${md.colStart} / ${md.colSpan};
        --lg-cols: ${lg.colStart} / ${lg.colSpan};
        --xl-cols: ${xl.colStart} / ${xl.colSpan};
        --xs-rows: ${xs.rowStart} / ${type === "text" ? store.autoRows : xs.rowSpan};
        --sm-rows: ${sm.rowStart} / ${type === "text" ? store.autoRows : sm.rowSpan};
        --md-rows: ${md.rowStart} / ${type === "text" ? store.autoRows : md.rowSpan};
        --lg-rows: ${lg.rowStart} / ${type === "text" ? store.autoRows : lg.rowSpan};
        --xl-rows: ${xl.rowStart} / ${type === "text" ? store.autoRows : xl.rowSpan};

        --xs-hidden: ${xs.hidden ? "none" : "block"};
        --sm-hidden: ${sm.hidden ? "none" : "block"};
        --md-hidden: ${md.hidden ? "none" : "block"};
        --lg-hidden: ${lg.hidden ? "none" : "block"};
        --xl-hidden: ${xl.hidden ? "none" : "block"};
      `}
      >
        <div ref={innerRef} class="section-content-inner">
          <Slot></Slot>
        </div>
      </div>
    );
  }
);

interface Placement {
  hidden: boolean;
  colStart: Column;
  colSpan?: Span;
  rowStart: Row;
  rowSpan?: Span;
}

interface AutoRowsStore {
  viewportHeight: number;
  height: number;
  autoRows: string | undefined;
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
  | "row 20";
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
