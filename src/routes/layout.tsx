import { component$, createContextId, Signal, Slot, useContextProvider, useSignal, useStore, useStyles$, } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";

import styles from "./layout.css?inline";
import { AnnouncementBar } from "~/components/layout/announcement-bar/announcement-bar";
import { AsideInlineEnd } from "~/components/layout/aside-inline-end/aside-inline-end";
import { AsideInlineStart } from "~/components/layout/aside-inline-start/aside-inline-start";
import { NavBlockEnd } from "~/components/layout/nav-block-end/nav-block-end";
import { NavBlockStart } from "~/components/layout/nav-block-start/nav-block-start";
import { Drawer } from "~/components/layout/drawer/drawer";

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

export type LayoutContext = {
  theme:'light' | 'dark',
  currentScreenWidth:number,
  selectedBreakpoint: string,
  asideInlineStartOpened: boolean,
  asideInlineEndOpened: boolean,
  drawerClosable: boolean,
  drawerClosed: boolean,
  drawerOpen: boolean,
  drawerExpanded: boolean,
  drawerCollapsed: boolean,
  drawerTransitioning:boolean,
  drawerHeaderIntersectionRatio: number,
  drawerContentIntersectionRatio: number,
  layoutRef: Signal<Element | undefined>,
  headerRef: Signal<Element | undefined>,
  mainRef: Signal<Element | undefined>,
  footerRef: Signal<Element | undefined>
}

export const LayoutContext = createContextId<LayoutContext>(
  'docs.layout-context'
);


export default component$(() => {
  useStyles$(styles);
  const layoutRef = useSignal<Element>();
  // Add Store for layout and pass in context // can you update a context with a store value  
  const layout = useStore<LayoutContext>(
    {
      theme:'light',
      currentScreenWidth:0,
      selectedBreakpoint: 'lg',
      asideInlineStartOpened: false,
      asideInlineEndOpened: false,
      drawerClosable: false,
      drawerClosed: false,
      drawerOpen: false,
      drawerExpanded: false,
      drawerCollapsed: false,
      drawerTransitioning:false,
      drawerHeaderIntersectionRatio: 0,
      drawerContentIntersectionRatio: 0,
      layoutRef: layoutRef,
      headerRef: useSignal(undefined),
      mainRef: useSignal(undefined),
      footerRef: useSignal(undefined),
    }
  );
  useContextProvider(LayoutContext, layout);
  return (
    <>
      <div class="layout-wrapper">
        <div ref={layoutRef} class="layout">
          <AnnouncementBar />
          <NavBlockStart />
          <AsideInlineStart />
          <Slot />
          <AsideInlineEnd />
        </div>
      </div>

      <Drawer layoutRef={layoutRef}></Drawer>
      <NavBlockEnd />

    </>

  );
});
