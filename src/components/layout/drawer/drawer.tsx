

import type { Signal} from "@builder.io/qwik";
import { component$, useSignal, useStylesScoped$, useVisibleTask$ } from "@builder.io/qwik";
import styles from "./drawer.css?inline";


interface DrawerProps {
    layoutRef:Signal<Element|undefined>
  }

export const Drawer = component$<DrawerProps>((props) => {
    useStylesScoped$(styles);
    const scrollWrapperRef = useSignal<Element>();
    const scrollContainerRef = useSignal<Element>();
    useVisibleTask$(() => {
      if(scrollContainerRef.value && scrollWrapperRef.value && props.layoutRef.value) {
        backdropAnimation(scrollWrapperRef.value, scrollContainerRef.value)
        layoutAnimation(props.layoutRef.value, scrollContainerRef.value);
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


const backdropAnimation = (scrollWrapper: Element,scrollContainer: Element) => {
    scrollWrapper.animate(
        { background: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.25)']},
        { fill: 'both',
        //@ts-ignore
          timeline: new ScrollTimeline({
            source: scrollContainer,
          }),
          //@ts-ignore
          rangeStart: new CSSUnitValue(0, 'vh'),
          rangeEnd: new CSSUnitValue(80, 'vh'),
        });
}

const layoutAnimation = (layout: Element,scrollContainer: Element) => {
   layout.animate(
        { transform: ['scale(1)', 'scale(.98)'],
    
    },
        
        { fill: 'both',
        //@ts-ignore
          timeline: new ScrollTimeline({
            source: scrollContainer,
          }),
          //@ts-ignore
          rangeStart: new CSSUnitValue(0, 'vh'),
          rangeEnd: new CSSUnitValue(80, 'vh'),
        });
}