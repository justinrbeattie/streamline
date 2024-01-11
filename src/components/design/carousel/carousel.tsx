
import { component$, useOnDocument, useSignal, useStore, useStylesScoped$, useVisibleTask$, $, Slot } from "@builder.io/qwik";
import styles from "./carousel.css?inline";
import { IconComponent } from "../icon/icon";
const intersectionObserverList: IntersectionObserver[] = []
let mutationObserver: MutationObserver | undefined = undefined;
export interface CarouselProps {


}
export const CarouselComponent = component$<CarouselProps>(() => {
  const store: CarouselStore = useStore({
    'aria-label': '',
    showTabNavigation: true,
    scrolledToStart: true,
    scrolledToEnd: false,
    totalItems: 0,
    carouselItemList: []
  });
  const ul = useSignal<Element>();
  useStylesScoped$(styles);

  useVisibleTask$(() => {
    mutationObserverInit(ul.value as HTMLElement, store);
    return () => mutationObserver?.disconnect();
  });

  useOnDocument(
    'load',
    $(() => {
      if (!mutationObserver) {
        mutationObserverInit(ul.value as HTMLElement, store);
      }
    })
  );

  return (
    <div class="wrapper">
      <button
        type="button"
        title="Previous Item"
        aria-label="Previous Item"
        disabled={store.scrolledToStart}
        onClick$={() => { navigateDirection('previous', ul.value); }}>
        <IconComponent icon='InNavArrowLeft' size='small' variant="default" >
        </IconComponent>
      </button>
      <ul ref={ul}>
        <Slot></Slot>
      </ul>
      <button
        type="button"
        title="Next Item"
        aria-label="Next Item"
        disabled={store.scrolledToEnd}
        onClick$={() => { navigateDirection('next', ul.value); }}>
        <IconComponent icon='InNavArrowRight' size='small' variant="default" >
        </IconComponent>
      </button>

      {store.showTabNavigation ?
        <nav class="pagination" role="tablist" aria-multiselectable>
          {store.carouselItemList.map((carouselItem) =>
            <button
              key={'tab-' + ((carouselItem?.index || 0) + 1)}
              class="pagination-item"
              type="button"
              role="tab"
              id={'tab-' + ((carouselItem?.index || 0) + 1)}
              aria-controls={'tabpanel-' + ((carouselItem.index || 0) + 1)}
              title={'Navigation Item ' + ((carouselItem.index || 0) + 1)}
              aria-label='Navigation Item'
              aria-setsize={store.totalItems}
              aria-posinset={(carouselItem.index || 0) + 1}
              onClick$={() => { navigateToIndex((carouselItem.index || 0), ul.value) }}
              /* @ts-ignore */
              tabindex="-1"
            ></button>
          )}

        </nav>
        : ''}

    </div>


  );
});


export const CarouselItemComponent = component$(() => {
  useStylesScoped$(`
  li {
    scroll-snap-align: start;
    min-width:600px;
    background:var(--surface-3);
    padding:0;
}
  `);
  return (
    <li role="group" aria-roledescription="slide">
      <Slot></Slot>
    </li>
  );
});



const mutationObserverInit = (element: HTMLElement, store: CarouselStore) => {

  const config = { attributes: false, childList: true, subtree: true };
  mutationObserver = new MutationObserver(() => mutationObserverCallback(element, store));
  mutationObserver.observe(element, config);
  mutationObserverCallback(element, store);
}

const mutationObserverCallback = (element: HTMLElement, store: CarouselStore) => {
  store.totalItems = element.querySelectorAll('li').length;

  intersectionObserverList.forEach((intersectionObserver) => {
    intersectionObserver.disconnect()
  });

  store.carouselItemList = [];

  for (let i = 0; i < element.children.length; i++) {

    if (element.children[i].tagName === 'LI') {
      store.carouselItemList.push({
        index: i,
        intersectionRatio: 0,
        fullyVisible: false,
        firstFullyVisible: false,
        lastFullyVisible: false,
        partiallyVisible: false,
        notVisible: false,
        scrollPercentage: 0,

      });
      element.children[i].setAttribute('aria-label', `Slide ${i + 1} of ${store.totalItems}`);
      element.children[i].setAttribute('id', `slide-${i + 1}`);
      intersectionObserverInit(i, element.children[i] as HTMLElement, store);
    }

  }
};

const intersectionObserverInit = (index: number, element: HTMLElement, store: CarouselStore) => {
  const intersectionObserver = new IntersectionObserver(
    (entries) => { intersectionObserverCallback(index, entries, store) },
    {
      root: this,
      threshold: [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1],
    }
  );
  intersectionObserver.observe(element);
  intersectionObserverList.push(intersectionObserver);
}

const intersectionObserverCallback = (index: number, entries: IntersectionObserverEntry[], store: CarouselStore) => {
  entries.forEach((entry) => {
    if (store.carouselItemList[index]) {
      const last = entry.intersectionRatio === 1 && (index + 1) === store.totalItems;
      store.carouselItemList[index].intersectionRatio = entry.intersectionRatio;
      store.carouselItemList[index].fullyVisible = entry.intersectionRatio === 1;
      store.carouselItemList[index].partiallyVisible = entry.intersectionRatio > 0 && entry.intersectionRatio < 1;
      store.carouselItemList[index].notVisible = entry.intersectionRatio === 0;
      store.carouselItemList[index].firstFullyVisible = entry.intersectionRatio === 1 && index === 0;
      store.carouselItemList[index].lastFullyVisible = entry.intersectionRatio === 1 && last;
      entry.target.setAttribute('aria-hidden', String(store.carouselItemList[index].fullyVisible === false));
      entry.target.setAttribute('aria-current', String(store.carouselItemList[index].fullyVisible));
      entry.target.setAttribute('aria-current', String(store.carouselItemList[index].fullyVisible));
      entry.target.closest('.wrapper')?.querySelector('nav')?.children[index].setAttribute('aria-expanded', String(store.carouselItemList[index].fullyVisible));
      store.scrolledToStart = store.carouselItemList.some((item) => item.firstFullyVisible);
      store.scrolledToEnd = store.carouselItemList.some((item) => item.lastFullyVisible);
    }



  });
};

const navigateDirection = (direction: 'previous' | 'next', ul: Element | undefined) => {

  if (ul) {
    if (direction === 'previous') {
      ul.scrollTo({ left: ul.scrollLeft - (ul.clientWidth / 2) })
    } else {
      ul.scrollTo({ left: ul.scrollLeft + (ul.clientWidth / 2) })
    }

  }

}

const navigateToIndex = (index: number, ul: Element | undefined) => {
  if (ul) {
    const li = ul.children[index];
    li.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }
}

export interface CarouselStore {
  'aria-label': string;
  showTabNavigation: boolean;
  scrolledToStart: boolean;
  scrolledToEnd: boolean;
  totalItems: number;
  carouselItemList: CarouselItem[];
}

export interface CarouselItem {
  index: number;
  intersectionRatio: number;
  fullyVisible: boolean;
  firstFullyVisible: boolean;
  lastFullyVisible: boolean;
  partiallyVisible: boolean;
  notVisible: boolean;
  scrollPercentage: number;
}


