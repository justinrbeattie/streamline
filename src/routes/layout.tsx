import type { Signal } from "@builder.io/qwik";
import {
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useSignal,
  useStore,
  useStyles$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";

import styles from "./layout.css?inline";
import { AnnouncementBar } from "~/components/layout/announcement-bar/announcement-bar";
import { AsideInlineEnd } from "~/components/layout/aside-inline-end/aside-inline-end";
import { AsideInlineStart } from "~/components/layout/aside-inline-start/aside-inline-start";
import { NavBlockStart } from "~/components/layout/nav-block-start/nav-block-start";
/* import { Drawer } from "~/components/layout/drawer/drawer"; */

declare const ScrollTimeline: any;

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export const LayoutContext =
  createContextId<LayoutContext>("app.layout-context");

export default component$(() => {
  useStyles$(styles);
  const location = useLocation();
  const layoutRef = useSignal<Element>();
  const layout = useStore<LayoutContext>({
    theme: "light",
    isEditing: location.url.href.includes("&__builder_editing__=true"),
    screen: {
      emulatedBreakpoint: "Off",
      width: 0,
      height: 0,
      currentBreakpoint: "xs",
      classes: "",
    },
    asideInlineStartOpened: false,
    asideInlineEndOpened: false,
    drawerTimeoutRef: null,
    drawerTouching: false,
    drawerClosable: false,
    drawerClosed: false,
    drawerOpen: false,
    drawerExpanded: false,
    drawerCollapsed: false,
    drawerTransitioning: false,
    drawerHeaderIntersectionRatio: 0,
    drawerContentIntersectionRatio: 0,
    layoutRef: layoutRef,
    headerRef: useSignal(undefined),
    mainRef: useSignal(undefined),
    footerRef: useSignal(undefined),
  });
  useContextProvider(LayoutContext, layout);
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (!CSS.supports("selector(:has(*))")) {
      // @ts-ignore comment
      import("css-has-pseudo/browser")
        .then((module) => {
          const cssHasPseudo = module.default;
          cssHasPseudo(document);
        })
        .catch((error) => {
          console.error("Failed to load css-has-pseudo polyfill:", error);
        });
    }

    if (typeof ScrollTimeline === "undefined") {
      const script = document.createElement("script");
      script.src = "./scripts/scroll-timeline.js";
      script.defer = true;
      script.onerror = (error) => {
        console.error("Failed to load the ScrollTimeline polyfill:", error);
      };
      document.head.appendChild(script);
    }
    if (layoutRef.value && layoutRef.value.parentElement) {
      const observer = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          /* min-width: 320px min-width: 481px min-width: 769px min-width: 1025px min-width: 1441px */
          layout.screen.width = entry.contentRect.width;
          layout.screen.height = entry.contentRect.height;
          /* selected width */
          if (layout.screen.width > 0 && layout.screen.width <= 480) {
            layout.screen.currentBreakpoint = "xs";
          } else if (layout.screen.width > 480 && layout.screen.width <= 768) {
            layout.screen.currentBreakpoint = "sm";
          } else if (layout.screen.width > 768 && layout.screen.width <= 1024) {
            layout.screen.currentBreakpoint = "md";
          } else if (
            layout.screen.width > 1024 &&
            layout.screen.width <= 1440
          ) {
            layout.screen.currentBreakpoint = "lg";
          } else if (layout.screen.width > 1440) {
            layout.screen.currentBreakpoint = "xl";
          }
          layout.screen.classes = [
            layout.screen.width > 0 && "screen-xs",
            layout.screen.width > 480 && "screen-sm",
            layout.screen.width > 768 && "screen-md",
            layout.screen.width > 1024 && "screen-lg",
            layout.screen.width > 1440 && "screen-xl",
            "current-screen-" + layout.screen.currentBreakpoint,
          ]
            .filter(Boolean)
            .join(" ");
        });
      });
      observer.observe(layoutRef.value.parentElement);
      return () => {
        observer.disconnect();
      };
    }
  });

  return (
    <div
      class={`${layout.screen.classes} ${layout.isEditing ? ('emulated-' +layout.screen.emulatedBreakpoint) : ""}`}
      style={`--drawer-progress:${layout.drawerContentIntersectionRatio};`}
    >
      <AnnouncementBar />
      <NavBlockStart />
      <div class="layout-wrapper">
        <div ref={layoutRef} class="layout">
          <AsideInlineStart />
          <Slot />
          <AsideInlineEnd />
        </div>
      </div>
      {/*    <Drawer></Drawer> */}
    </div>
  );
});

export type LayoutContext = {
  theme: "light" | "dark";
  isEditing: boolean;
  screen: {
    emulatedBreakpoint:EmulatedBreakpoint;
    width: number;
    height: number;
    currentBreakpoint: string;
    classes: string;
  };
  asideInlineStartOpened: boolean;
  asideInlineEndOpened: boolean;
  drawerTimeoutRef: any;
  drawerTouching: boolean;
  drawerClosable: boolean;
  drawerClosed: boolean;
  drawerOpen: boolean;
  drawerExpanded: boolean;
  drawerCollapsed: boolean;
  drawerTransitioning: boolean;
  drawerHeaderIntersectionRatio: number;
  drawerContentIntersectionRatio: number;
  layoutRef: Signal<Element | undefined>;
  headerRef: Signal<Element | undefined>;
  mainRef: Signal<Element | undefined>;
  footerRef: Signal<Element | undefined>;
};

export type EmulatedBreakpoint = "Off" | "xs" | "sm" | "md" | "lg" | "xl";
