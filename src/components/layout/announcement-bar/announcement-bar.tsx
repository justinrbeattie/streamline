

import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./announcement-bar.css?inline";
export const AnnouncementBar = component$(() => {
    useStylesScoped$(styles);
    return (
        <div class="announcement-bar">
            <h6>Announcement Bar</h6>
        </div>
    );
});
