

import { component$, useSignal, useStylesScoped$, useVisibleTask$ } from "@builder.io/qwik";
import styles from "./drawer.css?inline";
export const Drawer = component$(() => {
    useStylesScoped$(styles);
    const scrollWrapperRef = useSignal<Element>();
    const scrollContainerRef = useSignal<Element>();
    useVisibleTask$(() => {
      if(scrollContainerRef.value && scrollWrapperRef.value) {
        scrollWrapperRef.value.animate(
            { background: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.25)']},
            { fill: 'both',
            //@ts-ignore
              timeline: new ScrollTimeline({
                source: scrollContainerRef.value,
              }),
              //@ts-ignore
              rangeStart: new CSSUnitValue(0, 'vh'),
              rangeEnd: new CSSUnitValue(80, 'vh'),
            });
      }
      });
    
    return (
        <div ref={scrollWrapperRef} class="drawer-wrapper">
            <div ref={scrollContainerRef} class="drawer-container">
                <div class="drawer-header">

                </div>
                <div class="drawer-content">

                </div>
            </div>
        </div>
    );
});
