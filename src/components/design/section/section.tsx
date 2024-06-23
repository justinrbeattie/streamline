import {
  component$,
  Slot,
  useContext,
  useSignal,
  useStyles$,
} from "@builder.io/qwik";
import styles from "./section.css?inline";
import { LayoutContext } from "~/routes/layout";
export interface SectionProps {
  tag: "header" | "section" | "footer";
  $name: "";
  id: string;
  attributes: any;
}

export const SectionComponent = component$<SectionProps>((props) => {
  useStyles$(styles);
  const layoutContext = useContext(LayoutContext);
  const TAG = props.tag;
  const sectionRef = useSignal<Element>();
  const currentRef =
    TAG === "header"
      ? layoutContext.headerRef
      : TAG === "footer"
        ? layoutContext.footerRef
        : sectionRef;


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
