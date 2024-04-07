import {
  component$,
  Slot,
  useContext,
  useSignal,
  useStyles$,
} from "@builder.io/qwik";
import styles from "./content.css?inline";
import { LayoutContext } from "~/routes/layout";

export interface ContentProps {
  $name:string,
  attributes: any;
}

export const ContentComponent = component$<ContentProps>(
  ({
    attributes = undefined,
  }) => {
    useStyles$(styles);
    const layoutContext = useContext(LayoutContext);
    const innerRef = useSignal<Element>();

    return (
      <div
        builder-id={attributes['builder-id']}
        class={`section-content ${layoutContext.isEditing ? "is-editing" : ""} ${attributes?.class || ""}`}
      >

        <div ref={innerRef} class='section-content-inner'>
          <Slot></Slot>
        </div>
      </div>
    );
  }
);


