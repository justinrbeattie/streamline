import { Slot, component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./home-hero.css?inline";

export const HomeHeroComponent = component$<any>((props) => {
  useStylesScoped$(styles);

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
          <div class="grid-item grid-item-1"></div>
          <div class="grid-item grid-item-2"></div>
          <div class="grid-item grid-item-3"></div>
          <div class="grid-item grid-item-4"></div>
          <div class="grid-item grid-item-5"></div>
        </div>
      </div>
    </header>
  );
});
