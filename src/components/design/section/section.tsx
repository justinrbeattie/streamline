import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";
import styles from './section.css?inline';
export interface SectionProps {
  tag: "header" | "section";
  id: string;
  mobileRows: number;
  tabletRows: number;
  desktopRows: number;
}

export const SectionComponent = component$<SectionProps>((props) => {
    useStylesScoped$(styles)
  return (
    <>
      {props.tag === "header" ? (
        <header class="page-section" style={`--mobile-rows:${props.mobileRows}; --tablet-rows:${props.tabletRows}; --desktop-rows:${props.desktopRows};`}>
          <Slot></Slot>
        </header>
      ) : (
        <section class="page-section" style={`--mobile-rows:${props.mobileRows}; --tablet-rows:${props.tabletRows}; --desktop-rows:${props.desktopRows};`}>
          <Slot></Slot>
        </section>
      )}
    </>
  );
});
