import {
  component$,
  useContext,
  useStyles$,
} from "@builder.io/qwik";
import { LayoutContext } from "~/routes/layout";
import styles from "./breakpoint-emulator.css?inline";

export const BreakpointEmulator = component$(() => {
  useStyles$(styles);
  const layoutContext = useContext(LayoutContext);
  return (
    <div id="breakpoint-emulator">
      <button
      class={layoutContext.screen.emulatedBreakpoint === ""? 'selected' : ''}
              onClick$={() =>
                (layoutContext.screen.emulatedBreakpoint =
                 "" as EmulatedBreakpoint)
              }
      >
        Off
      </button>
      <button
           class={layoutContext.screen.emulatedBreakpoint === "emulated-xs"? 'selected' : ''}
              onClick$={() =>
                (layoutContext.screen.emulatedBreakpoint =
                 "emulated-xs" as EmulatedBreakpoint)
              }
      >
        XS
      </button>

      <button
           class={layoutContext.screen.emulatedBreakpoint === "emulated-sm"? 'selected' : ''}
              onClick$={() =>
                (layoutContext.screen.emulatedBreakpoint =
                 "emulated-sm" as EmulatedBreakpoint)
              }
      >
        SM
      </button>
      <button
           class={layoutContext.screen.emulatedBreakpoint === "emulated-md"? 'selected' : ''}
              onClick$={() =>
                (layoutContext.screen.emulatedBreakpoint =
                 "emulated-md" as EmulatedBreakpoint)
              }
      >
        MD
      </button>
      <button
           class={layoutContext.screen.emulatedBreakpoint === "emulated-lg"? 'selected' : ''}
              onClick$={() =>
                (layoutContext.screen.emulatedBreakpoint =
                 "emulaated-lg" as EmulatedBreakpoint)
              }
      >
        LG
      </button>
      <button
           class={layoutContext.screen.emulatedBreakpoint === "emulated-xl"? 'selected' : ''}
              onClick$={() =>
                (layoutContext.screen.emulatedBreakpoint =
                 "emulated-xl" as EmulatedBreakpoint)
              }
      >
        XL
      </button>
    
    </div>
  );
});

type EmulatedBreakpoint =
  | ""
  | "emulated-xs"
  | "emulated-sm"
  | "emulated-md"
  | "emulated-lg"
  | "emulated-xl";
