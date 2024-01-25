import { component$, useContext, useStyles$, $ } from "@builder.io/qwik";
import styles from "./nav-block-start.css?inline";
import { ButtonComponent } from "~/components/design/button/button";
import { IconComponent } from "~/components/design/icon/icon";
import { LayoutContext } from "~/routes/layout";

export const NavBlockStart = component$(() => {
  useStyles$(styles);
  const layoutContext = useContext(LayoutContext);

  const asideInlineStartButtonToggle = $(() => {
    const { asideInlineStartOpened, currentScreenWidth } = layoutContext;

    layoutContext.asideInlineStartOpened = !asideInlineStartOpened;

    if (asideInlineStartOpened && currentScreenWidth < 0) {
      layoutContext.asideInlineEndOpened = false;
    }
  });

  const asideInlineEndButtonToggle = $(() => {
    const { asideInlineEndOpened, currentScreenWidth } = layoutContext;

    layoutContext.asideInlineEndOpened = !asideInlineEndOpened;

    if (asideInlineEndOpened && currentScreenWidth < 0) {
      layoutContext.asideInlineStartOpened = false;
    }
  });

  return (
    <div class="nav-block-start">
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
        <IconComponent icon="InMenu"></IconComponent>
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
        <IconComponent icon="InSettings"></IconComponent>
      </ButtonComponent>
    </div>
  );
});
