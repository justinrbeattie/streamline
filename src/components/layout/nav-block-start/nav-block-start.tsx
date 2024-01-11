

import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./nav-block-start.css?inline"
import { ButtonComponent } from "~/components/design/button/button";

export const NavBlockStart = component$(() => {
    useStylesScoped$(styles)

    return (
        <div class="nav-block-start">
               <ButtonComponent variant={"primary"} > Learn More </ButtonComponent>
            <nav>

            </nav>
        </div>
    );
});
