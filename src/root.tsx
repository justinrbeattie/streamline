import {
  component$,
  createContextId,
  useContextProvider,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/common/router-head/router-head";

import "./global.css";
// @ts-ignore comment
import cssHasPseudo from "css-has-pseudo/browser";
import * as icon from "@qwikest/icons/iconoir";
export const Icon = icon;

export const ScreenContext =
  createContextId<ScreenContext>("app.screen-context");

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */
  const bodyRef = useSignal<Element>();
  const screen = useStore<ScreenContext>({
    width: 0,
    height: 0,
    currentBreakpoint: "xs",
  });
  useContextProvider(ScreenContext, screen);
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    cssHasPseudo(document);
    if (bodyRef.value) {
      const observer = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          /* min-width: 320px min-width: 481px min-width: 769px min-width: 1025px min-width: 1441px */
          screen.width = entry.contentRect.width;
          screen.height = entry.contentRect.height;
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
      observer.observe(bodyRef.value);
      return () => {
        observer.disconnect();
      };
    }
  });

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
        <ServiceWorkerRegister />
      </head>
      <body
        lang="en"
        ref={bodyRef}
        class={`
      ${screen.width > 0 ? "screen-xs " : ''} 
      ${screen.width > 480 ? "screen-sm " : ''}
      ${screen.width > 768 ? "screen-md " : ''}
      ${screen.width > 1024 ? "screen-lg " : ''}
      ${screen.width > 1440 ? "screen-xl " : ''}
      ${"current-screen-" + screen.currentBreakpoint}
      `}
      >
        <RouterOutlet />
        <script src="https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js"></script>
      </body>
    </QwikCityProvider>
  );
});

 type ScreenContext = {
  width: number;
  height: number;
  currentBreakpoint: string;
};
