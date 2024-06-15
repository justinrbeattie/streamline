

import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./aside-inline-end.css?inline"
export const AsideInlineEnd = component$(() => {
  useStyles$(styles);

    return (
        <aside id="aside-inline-end" class="aside-inline-end brand-primary">
        <aside>Aside Inline End</aside>
      </aside>
    );
});
