

import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./aside-inline-start.css?inline"
export const AsideInlineStart = component$(() => {
  useStylesScoped$(styles);


    return (
        <aside class="aside-inline-start">
        <h6>Aside Inline Start</h6>
      </aside>
    );
});
