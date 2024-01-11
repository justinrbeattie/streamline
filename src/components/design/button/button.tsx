import { component$, useStylesScoped$, Slot } from "@builder.io/qwik";
import styles from "./button.css?inline";
export interface ButtonProps {
  shape?: "rectangle" | "circle", // Aspect
  style?: "standard" | "transparent" | "filled" | "outlined",
  size?: "small" | "medium" | "large";
  variant?:"default" | "primary" | "secondary" | "warning" | "success" | "danger";
  href?:string;
  newWindow?:boolean,
  disabled?:boolean
}
export const ButtonComponent = component$<ButtonProps>(({ size = "medium", variant = "danger", style = "standard", shape="rectangle", href="", newWindow =false, disabled=false }) => {
  useStylesScoped$(styles);
  const Tag = href !== '' ? 'a': 'button';
  return (
      <Tag
        href={href}
        disabled={disabled}
        target={newWindow ? "_blank" : ""}
        class={`size-${size} variant-${variant} style-${style} shape-${shape}`}
      >
        <Slot></Slot>
      </Tag>
  );
});
