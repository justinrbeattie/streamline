import {
  component$,
  Slot,
  useStyles$,
} from "@builder.io/qwik";
import styles from "./section.css?inline";
export interface SectionProps {
  tag: "header" | "section";
  id: string;
}


export const SectionComponent = component$<SectionProps>((props) => {
  useStyles$(styles);

  return (
    <>
      {props.tag === "header" ? (
        <header
          class="page-section"
        >
          <Slot></Slot>
        </header>
      ) : (
        <section
          class="page-section"
        >
          <Slot></Slot>
        </section>
      )}
    </>
  );
});
