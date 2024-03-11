import {
  component$,
  Slot,
  useContext,
  useStore,
  useStyles$,
  useVisibleTask$,
} from "@builder.io/qwik";
import styles from "./section.css?inline";
import { LayoutContext } from "~/routes/layout";
export interface SectionProps {
  tag: "header" | "section" | "footer";
  id: string;
  attributes: any;
}

export const SectionComponent = component$<SectionProps>((props) => {
  useStyles$(styles);
  const layoutContext = useContext(LayoutContext);
  const TAG = props.tag;
  const currentRef =
    TAG === "header"
      ? layoutContext.headerRef
      : TAG === "footer"
        ? layoutContext.footerRef
        : undefined;

  const store = useStore({
    numberOfColumns: 14,
    numberOfRows: 5,
  });

  if(layoutContext.isEditing) {
  // eslint-disable-next-line
  useVisibleTask$(() => {
/*     if (layoutContext.isEditing && currentRef?.value) {
      const observer = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          const innerHeight = entry.contentRect.height;
          const rowHeight = window.innerHeight * 0.1;
          store.numberOfRows = Math.round(innerHeight / rowHeight);
        });
      });

      observer.observe(currentRef.value);
      return () => {
        observer.disconnect();
      };
    } */
  });
  }

  return (
    <TAG
      {...props.attributes}
      ref={currentRef}
      id={props.id}
      class={`page-section ${layoutContext.isEditing ? "is-editing" : ""}  ${props.attributes?.className || ""}`}
    >
      {layoutContext.isEditing
        ? Array.from({ length: store.numberOfRows }, (_, index) => index).map(
            (rowIndex) =>
              Array.from(
                { length: store.numberOfColumns },
                (_, index) => index
              ).map((colIndex) => (
                <div
                  class="grid-guide"
                  style={`grid-column:${colIndex + 1} / span 1; grid-row:${rowIndex + 1} / span 1;`}
                  key={(rowIndex + 1) * (colIndex + 1)}
                >

                  { 'col ' + (colIndex + 1) + ' / row ' + (rowIndex + 1)}
                </div>
              ))
          )
        : ""}

      <Slot></Slot>
    </TAG>
  );
});
