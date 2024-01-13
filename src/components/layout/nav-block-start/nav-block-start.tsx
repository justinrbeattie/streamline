

import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./nav-block-start.css?inline"
import { ButtonComponent } from "~/components/design/button/button";
import { IconComponent } from "~/components/design/icon/icon";

export const NavBlockStart = component$(() => {
    useStyles$(styles)

    return (
        <div class="nav-block-start">
               <ButtonComponent id="aside-inline-start-button" shape="circle" size="small" style="blurred" ariaLabel="Open Left Navigation Menu" ariaRoledescription="Open Left Navigation Menu" ariaControls="aside-inline-start" ariaHaspopup={true}> <IconComponent  icon="InMenu"></IconComponent> </ButtonComponent>
            <nav>

            </nav>
            <ButtonComponent id="aside-inline-end-button" shape="circle" size="small" style="blurred" ariaLabel="Open Right Navigation Menu" ariaRoledescription="Open Right Navigation Menu" ariaControls="aside-inline-end" ariaHaspopup={true}> <IconComponent  icon="InSettings"></IconComponent> </ButtonComponent>
        </div>
    );
});
