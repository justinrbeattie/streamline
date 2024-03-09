import { Slot, component$, useStyles$ } from "@builder.io/qwik";
import styles from "./icon.css?inline";

export interface IconProps {
  size?: "small" | "medium" | "large";
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "warning"
    | "success"
    | "danger";
}
export const IconComponent = component$<IconProps>(
  ({ size = "small", variant = "default" }) => {
    useStyles$(styles);

    return (
      <span class={`icon material-symbols-rounded size-${size} variant-${variant}`}>
        <Slot />
      </span>
    );
  }
);
