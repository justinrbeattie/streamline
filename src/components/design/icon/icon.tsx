
import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./icon.css?inline";
import { Icon } from "~/root";


export interface IconProps {
  icon: string,
  size?:  "small" | "medium" | "large";
  variant?: "default" | "primary" | "secondary" | "warning" | "success" | "danger";
}
export const IconComponent = component$<IconProps>(({ icon = "InCloud", size = "small", variant = "default" }) => {
  useStylesScoped$(styles);
  //@ts-ignore
  const Tag = Icon[icon];
  const sizeInPx = size === "small" ? '24px' : (size === "medium" ? '44px' : '56px');

  return (

    <Tag
      width={sizeInPx}
      height={sizeInPx}
      class={`size-${size} variant-${variant}`}
    >

    </Tag> 
  );
});


