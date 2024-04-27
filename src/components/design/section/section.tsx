import { component$, Slot, useContext, useStyles$ } from "@builder.io/qwik";
import styles from "./section.css?inline";
import { LayoutContext } from "~/routes/layout";
export interface SectionProps {
  tag: "header" | "section" | "footer";
  $name:'',
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
      const isEditing = layoutContext.isEditing;

  return (
    <TAG
      {...props.attributes}
      ref={currentRef}
      id={props.id}
      class={`page-section ${layoutContext.isEditing ? "is-editing" : ""}  ${props.attributes?.class || ""}`}
    >
      <Slot></Slot>

    </TAG>
  );
});
