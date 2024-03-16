import { component$, Slot, useContext} from "@builder.io/qwik";
import { LayoutContext } from "~/routes/layout";


export const MainComponent = component$(() => {
  const layoutContext = useContext(LayoutContext);
  return (
    <main ref={layoutContext.mainRef}>
      <Slot></Slot>
    </main>
  );
});
