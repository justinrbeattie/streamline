import { Slot, component$, useStyles$ } from "@builder.io/qwik";
import styles from "./icon.css?inline";

export interface IconProps {
  attributes?:any,
  svg?:any,
  size?: "small" | "medium" | "large";
}
export const IconComponent = component$<IconProps>(
  ({ size = "small", attributes=null, svg=null, }) => {
    useStyles$(styles);

    return (


            <span {...attributes}>
              <div  class={`icon size-${size}`}>
              <span dangerouslySetInnerHTML={svg}></span>
                    <Slot />
              </div>

          </span>


      
    );
  }
);
/* dangerouslySetInnerHTML={svg} */