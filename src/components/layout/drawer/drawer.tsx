


import { component$, useContext, useSignal, useStyles$, useVisibleTask$ } from "@builder.io/qwik";
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
        if (drawerContainerRef.value && drawerHeaderRef.value && drawerContentRef.value) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.target.id === "drawer-header") {
                        layoutContext.drawerHeaderIntersectionRatio = entry.intersectionRatio;
                    } else if (entry.target.id === "drawer-content") {
                        layoutContext.drawerContentIntersectionRatio = entry.intersectionRatio;
                    }

                    layoutContext.drawerClosed = layoutContext.drawerHeaderIntersectionRatio <= 0.1 && layoutContext.drawerContentIntersectionRatio <= 0.1;
                    layoutContext.drawerCollapsed = layoutContext.drawerHeaderIntersectionRatio === 1 && layoutContext.drawerContentIntersectionRatio <= 0.1;
                    layoutContext.drawerOpen = layoutContext.drawerHeaderIntersectionRatio === 1;
                    layoutContext.drawerTransitioning = layoutContext.drawerHeaderIntersectionRatio === 1 && layoutContext.drawerContentIntersectionRatio > 0.1 && layoutContext.drawerContentIntersectionRatio < 1;
                    layoutContext.drawerExpanded = layoutContext.drawerHeaderIntersectionRatio === 1 && layoutContext.drawerContentIntersectionRatio === 1;

                    if (layoutContext.drawerOpen && layoutContext.drawerExpanded) {
                        layoutContext.layoutRef.value?.setAttribute('inert', '');
                        layoutContext.headerRef.value?.setAttribute('hidden', '');
                        layoutContext.mainRef.value?.setAttribute('hidden', '');
                        layoutContext.footerRef.value?.setAttribute('hidden', '');
                    } else {
                        layoutContext.layoutRef.value?.removeAttribute('inert');
                        layoutContext.headerRef.value?.removeAttribute('hidden');
                        layoutContext.mainRef.value?.removeAttribute('hidden');
                        layoutContext.footerRef.value?.removeAttribute('hidden');
                    }
                });
            },
                {
                    root: drawerContainerRef.value,
                    threshold: [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1],
                });

            observer.observe(drawerHeaderRef.value);
            observer.observe(drawerContentRef.value);

            return () => {
                observer.disconnect();
            };
        }
    });

    return (
        //@ts-ignore
        <div id="drawer-wrapper" class="drawer-wrapper" closable={layoutContext.drawerClosable} transitioning={layoutContext.drawerTransitioning} closed={layoutContext.drawerClosed} open={layoutContext.drawerOpen} expanded={layoutContext.drawerExpanded} collapsed={layoutContext.drawerCollapsed} >
            <div class="drawer-container" ref={drawerContainerRef}>
                <div ref={drawerHeaderRef} class="drawer-header" id="drawer-header">

                </div>
                <div ref={drawerContentRef} class="drawer-content" id="drawer-content">

                </div>
            </div>
        </div>
    );
});




