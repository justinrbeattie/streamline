import type { QRL, Signal } from "@builder.io/qwik";
import { component$, useStylesScoped$, Slot, $, useSignal } from "@builder.io/qwik";
import styles from "./button.css?inline";
import { Link } from "@builder.io/qwik-city";
export interface ButtonProps {
  shape?: "rectangle" | "circle", // Aspect
  style?: "standard" | "outlined" | "filled" | "transparent" | "blurred",
  size?: "small" | "medium" | "large";
  variant?: "default" | "primary" | "secondary" | "warning" | "success" | "danger";
  href?: string;
  newWindow?: boolean,
  disabled?: boolean,
  cms?: boolean,
  ariaLabel?: string;
  ariaControls?: string,
  ariaHaspopup?: boolean,
  ariaRoledescription?: string,
  id?: string,
  onClick$?: QRL<() => void>,

}
export const ButtonComponent = component$<ButtonProps>((
  { size = "medium",
    variant = "default",
    style = "standard",
    shape = "rectangle",
    href = "",
    newWindow = false,
    disabled = false,
    cms = false,
    ariaLabel = "",
    ariaRoledescription = "",
    ariaHaspopup = false,
    ariaControls = "",
    id="",
    onClick$ = $(() => { }),
  }
) => {

  const Tag = getHTMLTag(href !== "", cms, Link);
  const buttonRef = useSignal<Element>();

  useStylesScoped$(styles);
  return (
      //@ts-ignore
    <Tag
      ref={Tag === "button" ? buttonRef : undefined}
      href={href}
      disabled={disabled}
      aria-disabled={disabled}
      target={newWindow ? "_blank" : undefined}
      class={`btn size-${size} variant-${variant} style-${style} shape-${shape}`}
      onClick$={() => { onClick$(); expand(ariaControls, ariaHaspopup, buttonRef) }}
      aria-label={ariaLabel ? ariaLabel : null}
      aria-roledescription={ariaRoledescription ? ariaRoledescription : null}
      aria-haspopup={ariaHaspopup ? ariaHaspopup : null}
      aria-controls={ariaControls ? ariaControls : null}
            //@ts-ignore
      id={id ? id : null}
    >
      <Slot></Slot>
    </Tag>
  );
});


const getHTMLTag = (href: boolean, cms: boolean, link: typeof Link) => {

  if (!href) {
    return "button";
  } else if (cms) {
    return "a";
  }
  return link

}

const expand = (ariaControls: string, ariaHasPopup: boolean, ref: Signal<Element | undefined>) => {

  if (ariaControls !== "" && ariaHasPopup && ref.value) {
    const expanded = ref.value.getAttribute("aria-expanded");
    ref.value.setAttribute("aria-expanded", expanded !== "true" ? "true" : "false");
    ref.value.setAttribute("aria-pressed", expanded !== "true" ? "true" : "false");
  }

}

