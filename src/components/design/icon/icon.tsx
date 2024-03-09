
import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./icon.css?inline";


export interface IconProps {
  icon: string,
  size?:  "small" | "medium" | "large";
  variant?: "default" | "primary" | "secondary" | "warning" | "success" | "danger";
}
export const IconComponent = component$<IconProps>(({ icon = "las la-feather", size = "small", variant = "default" }) => {
  useStylesScoped$(styles);

  return (

    <i
      class={`icon ${icon} size-${size} variant-${variant}`}
    >

    </i> 
  );
});


