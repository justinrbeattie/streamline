import { component$, useContext, useStyles$, $ } from "@builder.io/qwik";
import styles from "./nav-block-start.css?inline";
import { ButtonComponent } from "~/components/design/button/button";
import { IconComponent } from "~/components/design/icon/icon";
import { LayoutContext } from "~/routes/layout";

export const NavBlockStart = component$(() => {
  useStyles$(styles);
  const layoutContext = useContext(LayoutContext);

  const asideInlineStartButtonToggle = $(() => {
    const { asideInlineStartOpened, screen } = layoutContext;

    layoutContext.asideInlineStartOpened = !asideInlineStartOpened;

    if (asideInlineStartOpened && (screen.currentBreakpoint === 'xs' || screen.currentBreakpoint === "sm")) {
      layoutContext.asideInlineEndOpened = false;
    }
  });

  const asideInlineEndButtonToggle = $(() => {
    const { asideInlineEndOpened, screen } = layoutContext;

    layoutContext.asideInlineEndOpened = !asideInlineEndOpened;

    if (asideInlineEndOpened && (screen.currentBreakpoint === 'xs' || screen.currentBreakpoint === "sm")) {
      layoutContext.asideInlineStartOpened = false;
    }
  });

  return (
    <div class="nav-block-start">
        <div class="placeholder"></div>
      <ButtonComponent
        onClick={asideInlineStartButtonToggle}
        id="aside-inline-start-button"
        shape="circle"
        size="small"
        style="blurred"
        ariaLabel="Open Left Navigation Menu"
        ariaRoledescription="Open Left Navigation Menu"
        ariaControls="aside-inline-start"
        ariaHaspopup={true}
        ariaExpanded={layoutContext.asideInlineStartOpened}
        ariaPressed={layoutContext.asideInlineStartOpened}
      >
        <IconComponent><svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M3 5H21" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 12H21" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 19H21" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></IconComponent>
      </ButtonComponent>
      <nav></nav>
      <ButtonComponent
        onClick={asideInlineEndButtonToggle}
        id="aside-inline-end-button"
        shape="circle"
        size="small"
        style="blurred"
        ariaLabel="Open Right Navigation Menu"
        ariaRoledescription="Open Right Navigation Menu"
        ariaControls="aside-inline-end"
        ariaHaspopup={true}
        ariaExpanded={layoutContext.asideInlineEndOpened}
        ariaPressed={layoutContext.asideInlineEndOpened}
      >
        <IconComponent variant="danger">
        <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19.6224 10.3954L18.5247 7.7448L20 6L18 4L16.2647 5.48295L13.5578 4.36974L12.9353 2H10.981L10.3491 4.40113L7.70441 5.51596L6 4L4 6L5.45337 7.78885L4.3725 10.4463L2 11V13L4.40111 13.6555L5.51575 16.2997L4 18L6 20L7.79116 18.5403L10.397 19.6123L11 22H13L13.6045 19.6132L16.2551 18.5155C16.6969 18.8313 18 20 18 20L20 18L18.5159 16.2494L19.6139 13.598L21.9999 12.9772L22 11L19.6224 10.3954Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </IconComponent>
      </ButtonComponent>
    </div>
  );
});
