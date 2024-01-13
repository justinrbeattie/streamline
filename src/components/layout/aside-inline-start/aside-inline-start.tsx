

import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./aside-inline-start.css?inline"
export const AsideInlineStart = component$(() => {
  useStyles$(styles);


    return (
        <aside id="aside-inline-start" class="aside-inline-start">
        <h6>Aside Inline Start</h6>
      </aside>
    );
});
