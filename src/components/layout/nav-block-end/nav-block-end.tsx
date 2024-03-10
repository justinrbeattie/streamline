

import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./nav-block-end.css?inline"
export const NavBlockEnd = component$(() => {
useStyles$(styles);

    return (
        <nav class="nav-block-end">
        <h6>Nav Block End</h6>
      </nav>
    );
});
