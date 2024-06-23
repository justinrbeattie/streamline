import { component$, useContext, useStyles$, $ } from "@builder.io/qwik";
import styles from "./nav-block-start.css?inline";
import { ButtonComponent } from "~/components/design/button/button";
import { LayoutContext } from "~/routes/layout";

export const NavBlockStart = component$(() => {
  useStyles$(styles);
  const layoutContext = useContext(LayoutContext);
  const asideInlineStartButtonToggle = $(() => {
    const { asideInlineStartOpened } = layoutContext;

    layoutContext.asideInlineStartOpened = !asideInlineStartOpened;
  });

  const asideInlineEndButtonToggle = $(() => {
    const { asideInlineEndOpened } = layoutContext;

    layoutContext.asideInlineEndOpened = !asideInlineEndOpened;
  });

  return (
    <div ref={layoutContext.navBlockStartRef} class="nav-block-start">
      <a href="" class="logo">
        Dr Amran Dhillon - Enhancing medicine through diversity
      </a>
      <nav class="nav-bar"></nav>
      <ButtonComponent
        onClick={asideInlineEndButtonToggle}
        id="aside-inline-end-button"
        shape="circle"
        size="small"
        style="transparent"
        ariaLabel="Open Right Navigation Menu"
        ariaRoledescription="Open Right Navigation Menu"
        ariaControls="aside-inline-end"
        ariaHaspopup={true}
        ariaExpanded={layoutContext.asideInlineEndOpened}
        ariaPressed={layoutContext.asideInlineEndOpened}
      >

        <span class="menu-icon">
          Menu Button
        </span>
      </ButtonComponent>
    </div>
  );
});


/*       <ButtonComponent
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
        <IconComponent>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
<path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"></path>
</svg></IconComponent>
      </ButtonComponent> */