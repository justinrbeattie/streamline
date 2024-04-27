import { component$, Slot, useContext, useStyles$ } from "@builder.io/qwik";
import styles from "./layout.css?inline";
import { LayoutContext } from "~/routes/layout";

export interface LayoutProps {
  attributes: any;
  layout: LayoutOptions;
  layoutExtend: ExtendOptions;
}

export const LayoutComponent = component$<LayoutProps>(
  ({
  layout = "1fr",
  layoutExtend = "", 
    attributes = undefined }) => {
    useStyles$(styles);
    const layoutContext = useContext(LayoutContext);

    return (
      <div
        builder-id={attributes["builder-id"]}
        style={`--layout:${layout};`}
        class={`layout-component ${layoutContext.isEditing ? "is-editing" : ""} ${layoutExtend} ${attributes?.class || ""}`}
      >
        <Slot></Slot>
      </div>
    );
  }
);

type LayoutOptions =
  | "1fr"
  | "1fr 1fr"
  | "3fr 9fr"
  | "9fr 3fr"
  | "4fr 8fr"
  | "8fr 4fr"
  | "5fr 7fr"
  | "7fr 5fr"
  | "1fr 1fr 1fr"
  | "1fr 1fr 1fr 1fr";

type ExtendOptions =
  | ""
  | "extend-left"
  | "extend-right"
  | "extend-horizontal"
  | "extend-top"
  | "extend-bottom"
  | "extend-vertical"
  | "extend-all";
