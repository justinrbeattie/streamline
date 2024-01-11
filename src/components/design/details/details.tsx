import { component$, useStylesScoped$, Slot } from "@builder.io/qwik";
import styles from "./details.css?inline";
export interface DetailsProps {
summary:string;
}
export const DetailsComponent = component$<DetailsProps>(({summary = 'Detail Summary' }) => {
  useStylesScoped$(styles);
  return (
    <details>
      <summary>{summary}</summary>
      <div class="content">
      <Slot></Slot>
      </div>
    </details>
  );
});
