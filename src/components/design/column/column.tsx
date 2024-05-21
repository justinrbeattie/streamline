import { Slot, component$, useStylesScoped$} from "@builder.io/qwik";
import styles from "./column.css?inline";
export const ContentColumnComponent = component$<any>(
  (props) => {
    useStylesScoped$(styles);
    return (
      <div      {...props.attributes}>
        <Slot />
      </div>
    );
  }
);
