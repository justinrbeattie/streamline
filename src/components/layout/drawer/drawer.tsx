

import type { Signal } from "@builder.io/qwik";
import { component$, useSignal, useStore, useStyles$, useVisibleTask$ } from "@builder.io/qwik";
import styles from "./drawer.css?inline";


interface DrawerProps {
    layoutRef: Signal<Element | undefined>
}

export interface DrawerStore {
    closable:boolean,
    closed: boolean,
    open: boolean,
    expanded: boolean,
    collapsed: boolean,
    transitioning:boolean,
    headerIntersectionRatio: number,
    contentIntersectionRatio: number,
}

export const Drawer = component$<DrawerProps>((props) => {

    const store: DrawerStore = useStore({
        closable: false,
        closed: true,
        open: false,
        expanded: false,
        collapsed: true,
        transitioning:false,
        headerIntersectionRatio: 0,
        contentIntersectionRatio: 0,
    });

    useStyles$(styles);
    const drawerHeaderRef = useSignal<Element>();
    const drawerContentRef = useSignal<Element>();
    useVisibleTask$(() => {
        if (drawerHeaderRef.value && drawerContentRef.value && props.layoutRef.value) {
            intersectionObserverInit(drawerHeaderRef.value as HTMLElement, props.layoutRef.value as HTMLElement, store);
            intersectionObserverInit(drawerContentRef.value as HTMLElement, props.layoutRef.value as HTMLElement, store);
        }
    });

    return (
        //@ts-ignore
        <div id="drawer-wrapper" class="drawer-wrapper" closable={store.closable} transitioning={store.transitioning} closed={store.closed} open={store.open} expanded={store.expanded} collapsed={store.collapsed} >
            <div class="drawer-container">
                <div ref={drawerHeaderRef} class="drawer-header" id="drawer-header">

                </div>
                <div ref={drawerContentRef} class="drawer-content" id="drawer-content">

                </div>
            </div>
        </div>
    );
});



const intersectionObserverInit = (element: HTMLElement, layout: HTMLElement, store: any) => {
    const intersectionObserver = new IntersectionObserver(
        (entries) => { intersectionObserverCallback(entries, layout, store) },
        {
            root: element.parentElement,
            threshold: [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1],
        }
    );
    intersectionObserver.observe(element);
}

const intersectionObserverCallback = (entries: IntersectionObserverEntry[], layout: HTMLElement, store: any) => {
    entries.forEach((entry) => {
        if (entry.target.id === "drawer-header") {
            store.headerIntersectionRatio = entry.intersectionRatio;
        } else if (entry.target.id === "drawer-content") {
            store.contentIntersectionRatio = entry.intersectionRatio;
        }

        store.closed = store.headerIntersectionRatio <= 0.1 && store.contentIntersectionRatio <= 0.1;
        store.collapsed = store.headerIntersectionRatio === 1 && store.contentIntersectionRatio <= 0.1;
        store.open = store.headerIntersectionRatio === 1;
        store.transitioning = store.headerIntersectionRatio === 1 && store.contentIntersectionRatio >= .5 && store.contentIntersectionRatio < 1;
        store.expanded = store.headerIntersectionRatio === 1 && store.contentIntersectionRatio === 1;

        if (store.open && store.expanded) {
            layout.setAttribute('inert', '');
            layout.querySelector('header')?.setAttribute('hidden', '');
            layout.querySelector('main')?.setAttribute('hidden', '');
            layout.querySelector('footer')?.setAttribute('hidden', '');
        } else {
            layout.removeAttribute('inert');
            layout.querySelector('header')?.removeAttribute('hidden');
            layout.querySelector('main')?.removeAttribute('hidden');
            layout.querySelector('footer')?.removeAttribute('hidden');
        }


    });
};
