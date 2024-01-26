import type { QRL} from "@builder.io/qwik";
import { component$, useStylesScoped$, Slot, $} from "@builder.io/qwik";
import styles from "./button.css?inline";
import { Link } from "@builder.io/qwik-city";
export type  ButtonProps = {
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
  ariaExpanded?: boolean,
  ariaPressed?: boolean,
  id?: string,
  onClick?: QRL<() => void>;

}
export const ButtonComponent = component$<ButtonProps>((
  { size = "medium",
    variant = "default",
    style = "standard",
    shape = "rectangle",
    href = "",
    newWindow = false,
    disabled = undefined,
    cms = false,
    ariaLabel = "",
    ariaRoledescription = "",
    ariaHaspopup = undefined,
    ariaControls = "",
    ariaExpanded = undefined,
    ariaPressed = undefined,
    id = "",
    onClick = $(() => console.log('Button clicked!')),
  }
) => {

  const Tag = getHTMLTag(href !== "", cms, Link);

  useStylesScoped$(styles);
  return (
    //@ts-ignore
    <Tag
      href={href}
      disabled={disabled}
      aria-disabled={disabled}
      target={newWindow ? "_blank" : undefined}
      class={`btn size-${size} variant-${variant} style-${style} shape-${shape}`}
      // eslint-disable-next-line qwik/valid-lexical-scope
      onClick$={onClick}
      aria-label={ariaLabel ? ariaLabel : null}
      aria-roledescription={ariaRoledescription ? ariaRoledescription : null}
      aria-haspopup={ariaHaspopup ? ariaHaspopup : null}
      aria-controls={ariaControls ? ariaControls : null}
      aria-expanded={ariaControls ? ariaExpanded : null}
      aria-pressed={ariaControls ? ariaPressed : null}
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


