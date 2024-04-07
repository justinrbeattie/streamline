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
  });

  return (
    <div
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
