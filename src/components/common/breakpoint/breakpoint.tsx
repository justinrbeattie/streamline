import {
  Slot,
  component$,
  useSignal,
  useStore,
  useStyles$,
  useVisibleTask$,
} from "@builder.io/qwik";

import styles from "./breakpoint.css?inline";
/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const StoryBookBreakpoint = component$(() => {
  useStyles$(styles);
  const breakpointRef = useSignal<Element>();
  const screen = useStore<{ currentBreakpoint: string; width: number }>({
    currentBreakpoint: "xs",
    width: 0,
  });
  const selectedWidth = useSignal(screen.width.toString());
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (breakpointRef.value) {
      const observer = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          /* min-width: 320px min-width: 481px min-width: 769px min-width: 1025px min-width: 1441px */
          screen.width = entry.contentRect.width;
          /* selected width */
          if (screen.width > 0 && screen.width <= 480) {
            screen.currentBreakpoint = "xs";
          } else if (screen.width > 480 && screen.width <= 768) {
            screen.currentBreakpoint = "sm";
          } else if (screen.width > 768 && screen.width <= 1024) {
            screen.currentBreakpoint = "md";
          } else if (screen.width > 1024 && screen.width <= 1440) {
            screen.currentBreakpoint = "lg";
          } else if (screen.width > 1440) {
            screen.currentBreakpoint = "xl";
          }
        });
      });
      observer.observe(breakpointRef.value);
      return () => {
        observer.disconnect();
      };
    }
  });

  return (
    <>
      <input
        type="range"
        id="width"
        name="width"
        min="320"
        max="1920"
        step="50"
        value={screen.width}
        bind:value={selectedWidth}
      />
      <div
        ref={breakpointRef}
        data-screen-width={`${selectedWidth.value}px`}
        data-current-breakpoint={`${screen.currentBreakpoint} `}
        style={`width: ${selectedWidth.value}px;`}
        class={`
        breakpoint
    ${screen.width > 0 ? "screen-xs " : ""} 
    ${screen.width > 480 ? "screen-sm " : ""}
    ${screen.width > 768 ? "screen-md " : ""}
    ${screen.width > 1024 ? "screen-lg " : ""}
    ${screen.width > 1440 ? "screen-xl " : ""}
    ${"current-screen-" + screen.currentBreakpoint}
    `}
      >
        <Slot></Slot>
      </div>
    </>
  );
});
