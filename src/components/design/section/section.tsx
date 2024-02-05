import {
  component$,
  Slot,
  useContext,
  useStyles$,
} from "@builder.io/qwik";
import styles from "./section.css?inline";
import { LayoutContext } from "~/routes/layout";
export interface SectionProps {
  tag: "header" | "section" | "footer";
  id: string;
}


export const SectionComponent = component$<SectionProps>((props) => {
  useStyles$(styles);
  const layoutContext = useContext(LayoutContext);
  const TAG = props.tag;
  const currentRef = TAG === 'header'? layoutContext.headerRef : TAG === 'footer' ? layoutContext.footerRef  : undefined;

  return (
    <TAG
    ref={currentRef}
    id={props.id}
    class="page-section"
  >
    <Slot></Slot>
  </TAG>
  );
});
