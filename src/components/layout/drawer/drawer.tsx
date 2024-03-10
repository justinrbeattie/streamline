import {
  component$,
  useContext,
  useSignal,
  useStyles$,
  useVisibleTask$,
  $
} from "@builder.io/qwik";
import styles from "./drawer.css?inline";
import { LayoutContext } from "~/routes/layout";

export const Drawer = component$(() => {
  useStyles$(styles);
  const drawerContainerRef = useSignal<Element>();
  const drawerHeaderRef = useSignal<Element>();
  const drawerContentRef = useSignal<Element>();
  const layoutContext = useContext(LayoutContext);
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (
      drawerContainerRef.value &&
      drawerHeaderRef.value &&
      drawerContentRef.value
    ) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target.id === "drawer-header") {
              layoutContext.drawerHeaderIntersectionRatio =
                entry.intersectionRatio;
            } else if (entry.target.id === "drawer-content") {
              layoutContext.drawerContentIntersectionRatio =
                entry.intersectionRatio;
            }

            layoutContext.drawerClosed =
              layoutContext.drawerHeaderIntersectionRatio <= 0.1 &&
              layoutContext.drawerContentIntersectionRatio <= 0.1;
            layoutContext.drawerCollapsed =
              layoutContext.drawerHeaderIntersectionRatio === 1 &&
              layoutContext.drawerContentIntersectionRatio <= 0.1;
            layoutContext.drawerOpen =
              layoutContext.drawerHeaderIntersectionRatio === 1;
            layoutContext.drawerTransitioning =
              layoutContext.drawerHeaderIntersectionRatio === 1 &&
              layoutContext.drawerContentIntersectionRatio > 0.1 &&
              layoutContext.drawerContentIntersectionRatio < 1;
            layoutContext.drawerExpanded =
              layoutContext.drawerHeaderIntersectionRatio === 1 &&
              layoutContext.drawerContentIntersectionRatio === 1;

            if (layoutContext.drawerOpen && layoutContext.drawerExpanded) {
              layoutContext.layoutRef.value?.setAttribute("inert", "");
              layoutContext.headerRef.value?.setAttribute("hidden", "");
              layoutContext.mainRef.value?.setAttribute("hidden", "");
              layoutContext.footerRef.value?.setAttribute("hidden", "");
            } else {
              layoutContext.layoutRef.value?.removeAttribute("inert");
              layoutContext.headerRef.value?.removeAttribute("hidden");
              layoutContext.mainRef.value?.removeAttribute("hidden");
              layoutContext.footerRef.value?.removeAttribute("hidden");
            }
          });
        },
        {
          root: drawerContainerRef.value,
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        }
      );

      observer.observe(drawerHeaderRef.value);
      observer.observe(drawerContentRef.value);

      return () => {
        observer.disconnect();
      };
    }
  });

  const onTouchStart = $(() => {
    layoutContext.drawerTouching = true;
    // Clear any existing timeout to reset the timer
    if (layoutContext.drawerTimeoutRef !== null) {
      clearTimeout(layoutContext.drawerTimeoutRef.current);
    }
    // Set a new timeout
    layoutContext.drawerTimeoutRef= setTimeout(() => {
      if (layoutContext.drawerCollapsed) {
        layoutContext.drawerTouching = false;
      }
    }, 2000) as unknown as number; // setTimeout returns a number, but useRef typing expects a different type
  });

  const onTouchEnd = $(() => {
    layoutContext.drawerTouching = false;
    // Clear the timeout if the touch ends before 2 seconds
    if (layoutContext.drawerTimeoutRef !== null) {
      clearTimeout(layoutContext.drawerTimeoutRef);
    }
  });


  return (
    //@ts-ignore
    <div
      id="drawer-wrapper"
      class="drawer-wrapper"
          //@ts-ignore
      closable={layoutContext.drawerClosable}
      transitioning={layoutContext.drawerTransitioning}
      closed={layoutContext.drawerClosed}
      open={layoutContext.drawerOpen}
      expanded={layoutContext.drawerExpanded}
      collapsed={layoutContext.drawerCollapsed}
    >
      <div class="drawer-container" ref={drawerContainerRef}>
        <div
          ref={drawerHeaderRef}
          id="drawer-header"
          onMouseEnter$={onTouchStart}
          onMouseLeave$={onTouchEnd}
          onTouchStart$={onTouchStart}
          onTouchEnd$={onTouchEnd}
          onTouchCancel$={onTouchEnd}
          class={`drawer-header ${layoutContext.drawerTouching ? "touched" : ""}`}
        ></div>
        <div
          ref={drawerContentRef}
          class="drawer-content"
          id="drawer-content"
        ></div>
      </div>
    </div>
  );
});
