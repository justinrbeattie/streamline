import { component$, Slot, useContext, useStyles$, $ } from "@builder.io/qwik";
import styles from "./section.css?inline";
import type { EmulatedBreakpoint} from "~/routes/layout";
import { LayoutContext } from "~/routes/layout";
import { isBrowser } from "@builder.io/qwik/build";
export interface SectionProps {
  tag: "header" | "section" | "footer";
  id: string;
  emulatedBreakpoint: EmulatedBreakpoint;
  attributes: any;
}

export const SectionComponent = component$<SectionProps>((props) => {
  useStyles$(styles);
  const layoutContext = useContext(LayoutContext);
  const TAG = props.tag;
  const currentRef =
    TAG === "header"
      ? layoutContext.headerRef
      : TAG === "footer"
        ? layoutContext.footerRef
        : undefined;

        const image =
        "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAADQAgCdASoUABQAPm00lkekIyIhKAgAgA2JaQAAPaOgAP77nMAAAA==";
      const isEditing = layoutContext.isEditing;
      const onLoad$ = $(() => {
        if (isBrowser) {
          layoutContext.screen.emulatedBreakpoint = props.emulatedBreakpoint;
        }
      });

  return (
    <TAG
      {...props.attributes}
      ref={currentRef}
      id={props.id}
      class={`page-section ${layoutContext.isEditing ? "is-editing" : ""}  ${props.attributes?.className || ""}`}
    >
      <Slot></Slot>

      {
          /* prettier-ignore */ isEditing && props.emulatedBreakpoint === "Off" ? <img onLoad$={() => { onLoad$(); }} width="0" height="0" src={image} /> : ""
        }
        {
          /* prettier-ignore */ isEditing && props.emulatedBreakpoint === "xs" ? <img onLoad$={() => { onLoad$(); }} width="0" height="0" src={image} /> : ""
        }
        {
          /* prettier-ignore */ isEditing && props.emulatedBreakpoint === "sm" ? <img onLoad$={() => { onLoad$(); }} width="0" height="0" src={image} /> : ""
        }
        {
          /* prettier-ignore */ isEditing && props.emulatedBreakpoint === "md" ? <img onLoad$={() => { onLoad$(); }} width="0" height="0" src={image} /> : ""
        }
        {
          /* prettier-ignore */ isEditing && props.emulatedBreakpoint === "lg" ? <img onLoad$={() => { onLoad$(); }} width="0" height="0" src={image} /> : ""
        }
        {
          /* prettier-ignore */ isEditing && props.emulatedBreakpoint === "xl" ? <img onLoad$={() => { onLoad$(); }} width="0" height="0" src={image} /> : ""
        }

      {isEditing ? (
        <div class="grid-column-guide">
          <div class="column"></div>
          <div class="column"></div>
          <div class="column"></div>
          <div class="column"></div>
          <div class="column"></div>
          <div class="column"></div>
          <div class="column"></div>
          <div class="column"></div>
          <div class="column"></div>
          <div class="column"></div>
          <div class="column"></div>
          <div class="column"></div>
          <div class="column"></div>
          <div class="column"></div>
        </div>
      ) : (
        ""
      )}
    </TAG>
  );
});
