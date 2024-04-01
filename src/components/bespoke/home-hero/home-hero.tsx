import { Slot, component$, useStyles$ } from "@builder.io/qwik";
import styles from "./home-hero.css?inline";

export const HomeHeroComponent = component$<any>((props) => {
  useStyles$(styles);

  return (
    <header {...props.attributes}>
      <div class="inner">
        <div class="scroller">
          <h1>
            <span class="enriching">Enriching</span>
            <span class="medicine">Medicine</span>
            <span class="through">Through</span>
            <span class="diversity">Diversity.</span>
          </h1>
          <Slot></Slot>
        </div>
      </div>
    </header>
  );
});
