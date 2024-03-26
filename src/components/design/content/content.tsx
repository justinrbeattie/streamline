import {
  component$,
  Slot,
  useContext,
  useSignal,
  useStore,
  useStyles$,
  useVisibleTask$,
  $,
} from "@builder.io/qwik";
import styles from "./content.css?inline";
import type { EmulatedBreakpoint } from "~/routes/layout";
import { LayoutContext } from "~/routes/layout";
import { isBrowser } from "@builder.io/qwik/build";

export interface ContentProps {
  autoHeight: boolean;
  emulatedBreakpoint: EmulatedBreakpoint;
  layer: number;
  xs: Placement;
  sm: Placement;
  md: Placement;
  lg: Placement;
  xl: Placement;
  attributes: any;
}

export const ContentComponent = component$<ContentProps>(
  ({
    autoHeight = true,
    layer = "0",
    emulatedBreakpoint = "Off",
    attributes = undefined,
    xs = {
      hidden: false,
      colStart: "col 1",
      colEnd: "col 8",
      rowStart: "row 2",
      rowEnd: "row 8",
    },
    sm = {
      hidden: false,
      colStart: "col 1",
      colEnd: "col 8",
      rowStart: "row 2",
      rowEnd: "row 8",
    },

    md = {
      hidden: false,
      colStart: "col 1",
      colEnd: "col 8",
      rowStart: "row 2",
      rowEnd: "row 8",
    },
    lg = {
      hidden: false,
      colStart: "col 1",
      colEnd: "col 8",
      rowStart: "row 2",
      rowEnd: "row 8",
    },
    xl = {
      hidden: false,
      colStart: "col 1",
      colEnd: "col 8",
      rowStart: "row 2",
      rowEnd: "row 8",
    },
  }) => {
    useStyles$(styles);
    const layoutContext = useContext(LayoutContext);
    const innerRef = useSignal<Element>();
    const store = useStore<AutoRowsStore>({
      viewportHeight: 0,
      height: 0,
      autoRows: 0,
    });

    const image =
      "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAADQAgCdASoUABQAPm00lkekIyIhKAgAgA2JaQAAPaOgAP77nMAAAA==";
    const isEditing = layoutContext.isEditing;
    const onLoad$ = $(() => {
      if (isBrowser) {
        layoutContext.screen.emulatedBreakpoint = emulatedBreakpoint;
      }
    });


    if (autoHeight) {
      // eslint-disable-next-line
      useVisibleTask$(() => {
        if (innerRef.value) {
          const observer = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
              store.viewportHeight = window.innerHeight;
              store.height = entry.contentRect.height;
              store.autoRows = Math.max(
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
        builder-id={attributes['builder-id']}
        class={`section-content  ${autoHeight? 'auto-height' : 'manual-height'} ${layoutContext.isEditing ? "is-editing" : ""} layer-${layer} ${attributes?.class || ""}`}
        style={`
        --xs-cols: ${(xs.colStart as number) > 0 ? "col " + xs.colStart : "left-gutter"} / span ${xs.colSpan};
        --sm-cols: ${(sm.colStart as number) > 0 ? "col " + sm.colStart : "left-gutter"} / span ${sm.colSpan};
        --md-cols: ${(md.colStart as number) > 0 ? "col " + md.colStart : "left-gutter"} / span ${md.colSpan};
        --lg-cols: ${(lg.colStart as number) > 0 ? "col " + lg.colStart : "left-gutter"} / span ${lg.colSpan};
        --xl-cols: ${(xl.colStart as number) > 0 ? "col " + xl.colStart : "left-gutter"} / span ${xl.colSpan};
        --xs-rows: row ${xs.rowStart} / span ${autoHeight ? store.autoRows : xs.rowSpan};
        --sm-rows: row ${sm.rowStart} / span ${autoHeight ? store.autoRows : sm.rowSpan};
        --md-rows: row ${md.rowStart} / span ${autoHeight ? store.autoRows : md.rowSpan};
        --lg-rows: row ${lg.rowStart} / span ${autoHeight ? store.autoRows : lg.rowSpan};
        --xl-rows: row ${xl.rowStart} / span ${autoHeight ? store.autoRows : xl.rowSpan};

        --xs-hidden: ${xs.hidden ? "none" : "flex"};
        --sm-hidden: ${sm.hidden ? "none" : "flex"};
        --md-hidden: ${md.hidden ? "none" : "flex"};
        --lg-hidden: ${lg.hidden ? "none" : "flex"};
        --xl-hidden: ${xl.hidden ? "none" : "flex"};
        z-index: ${layer};
      `}
      >
        {
          /* prettier-ignore */ isEditing && emulatedBreakpoint === "Off" ? <img onLoad$={() => { onLoad$(); }} width="20" height="20" src={image} /> : ""
        }
        {
          /* prettier-ignore */ isEditing && emulatedBreakpoint === "xs" ? <img onLoad$={() => { onLoad$(); }} width="20" height="20" src={image} /> : ""
        }
        {
          /* prettier-ignore */ isEditing && emulatedBreakpoint === "sm" ? <img onLoad$={() => { onLoad$(); }} width="20" height="20" src={image} /> : ""
        }
        {
          /* prettier-ignore */ isEditing && emulatedBreakpoint === "md" ? <img onLoad$={() => { onLoad$(); }} width="20" height="20" src={image} /> : ""
        }
        {
          /* prettier-ignore */ isEditing && emulatedBreakpoint === "lg" ? <img onLoad$={() => { onLoad$(); }} width="20" height="20" src={image} /> : ""
        }
        {
          /* prettier-ignore */ isEditing && emulatedBreakpoint === "xl" ? <img onLoad$={() => { onLoad$(); }} width="20" height="20" src={image} /> : ""
        }

        <div ref={innerRef} class="section-content-inner">
          <Slot></Slot>
        </div>
      </div>
    );
  }
);

interface Placement {
  hidden: boolean;
  colStart: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
  rowStart: number;
  rowSpan?: number;
}

interface AutoRowsStore {
  viewportHeight: number;
  height: number;
  autoRows: number;
}
