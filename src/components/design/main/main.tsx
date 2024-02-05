import { component$, Slot, useContext, useStyles$ } from "@builder.io/qwik";
import styles from "./main.css?inline";
import { LayoutContext } from "~/routes/layout";


export const MainComponent = component$(() => {
  useStyles$(styles);
  const layoutContext = useContext(LayoutContext);
  return (
    <main ref={layoutContext.mainRef}>
      <Slot></Slot>
    </main>
  );
});
