import { component$,  useVisibleTask$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/common/router-head/router-head";

import "./global.css";
// @ts-ignore comment
import cssHasPseudo from 'css-has-pseudo/browser';
import * as icon from "@qwikest/icons/iconoir";
export const Icon = icon;


export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  /* Miss */

  useVisibleTask$(() => {
    cssHasPseudo(document);
  });


  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <script src="https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js"></script>
        <RouterHead />
        <ServiceWorkerRegister />
      </head>
      <body lang="en">
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
