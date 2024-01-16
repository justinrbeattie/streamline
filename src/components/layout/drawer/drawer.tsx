

import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./drawer.css?inline";
export const Drawer = component$(() => {
    useStylesScoped$(styles);
    return (
        <div class="drawer-container">
            <div class="drawer">
                
            </div>
        </div>
    );
});
