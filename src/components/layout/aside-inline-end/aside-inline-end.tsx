

import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./aside-inline-end.css?inline"
export const AsideInlineEnd = component$(() => {
  useStylesScoped$(styles);

    return (
        <aside class="aside-inline-end">
        <aside>Aside Inline End</aside>
      </aside>
    );
});
