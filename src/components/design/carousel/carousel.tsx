import type {
  Signal} from "@builder.io/qwik";
import {
  component$,
  useSignal,
  useStyles$,
  useVisibleTask$,
  useStore,
  Slot,
  createContextId,
  useContextProvider,
  useContext
} from "@builder.io/qwik";
import styles from "./carousel.css?inline";
import { IconComponent } from "../icon/icon";

export interface CarouselProps {
  id: string;
  ariaLabel: string;
  ariaRoleDescription: string;
  showButtons: boolean;
  showNavigation: boolean;
  scrolledToStart: boolean;
  scrolledToEnd: boolean;
  carouselItemMinWidth: string;
  carouselItemMinHeight: string;
  carouselItemList: CarouselItem[];
  ul: undefined | Signal<HTMLUListElement | undefined>;
  totalItems: number;
  attributes:any;
}

export interface CarouselItem {
  ariaLabel: string;
  ariaRoleDescription: string;
  ariaHidden?: boolean;
  ariaCurrent?: boolean;
  index?: number;
}

export const CarouselContext = createContextId<CarouselProps>(
  "app.carousel-context"
);

export const CarouselComponent = component$<CarouselProps>(
  (
    props = {
      id: "",
      ariaLabel: "",
      ariaRoleDescription: "",
      showButtons: true,
      showNavigation: true,
      scrolledToStart: true,
      scrolledToEnd: false,
      carouselItemMinWidth: "",
      carouselItemMinHeight: "",
      carouselItemList: [],
      ul: undefined,
      totalItems: 0,
      attributes:undefined,
    }
  ) => {
    useStyles$(styles);
    const store = useStore({
      ...props,
      carouselItemList: [],
      ul: useSignal<HTMLUListElement>(),
    });
    useContextProvider(CarouselContext, store);

    return (
      <div
        {...props.attributes}
        class={`carousel-wrapper  ${props.attributes?.className || ''}`}
        scrolled-to-start={store.scrolledToStart || null}
        scrolled-to-end={store.scrolledToEnd || null}
        style={`--carousel-item-min-width:${store.carouselItemMinWidth}; --carousel-item-min-height:${store.carouselItemMinHeight}; ${props.attributes?.styles || ''}`}
      >
        {store.showButtons ? (
          <button
            type="button"
            title="Previous Item"
            aria-label="Previous Item"
            disabled={store.scrolledToStart}
            onClick$={() => {
              navigateDirection("previous", store.ul.value);
            }}
          >
            <IconComponent
              size="small"
              variant="default"
            >arrow_back_ios</IconComponent>
          </button>
        ) : (
          ""
        )}
        <ul ref={store.ul}>
          <Slot></Slot>
        </ul>
        {store.showButtons ? (
          <button
            type="button"
            title="Next Item"
            aria-label="Next Item"
            disabled={store.scrolledToEnd}
            onClick$={() => {
              navigateDirection("next", store.ul.value);
            }}
          >
            <IconComponent
              size="small"
              variant="default"
            >arrow_forward_ios</IconComponent>
          </button>
        ) : (
          ""
        )}

        {store.showNavigation ? (
          <CarouselNavigationItemComponent></CarouselNavigationItemComponent>
        ) : (
          ""
        )}
      </div>
    );
  }
);

export const CarouselItemComponent = component$<{
  carouselItem: CarouselItem;
  attributes?: any;
}>((props) => {
  const store = useContext(CarouselContext);
  const ul = store.ul;
  const li = useSignal<HTMLLIElement>();
  const ulElement = ul?.value;
  const liElement = li.value;

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$( async (taskCtx) => {
    if (ulElement && liElement) {
  
      const liElements = ulElement.querySelectorAll("li");
      const index = Array.from(liElements).indexOf(liElement);
      
      props.carouselItem.index = index;
      store.totalItems = index === 0 ? liElements.length : store.totalItems;
    
      if (index === store.carouselItemList.length) {
        store.carouselItemList.splice(index, 0, props.carouselItem);
      }
    
      const observerCallback = (entries:IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          const iR = entry.intersectionRatio;
          props.carouselItem.ariaCurrent = iR >= 0.75;
          props.carouselItem.ariaHidden = iR < 0.75;
    
          if (index === 0) {
            store.scrolledToStart = ulElement.scrollLeft === 0;
          }
    
          if (index + 1 === store.totalItems) {
            store.scrolledToEnd =
              ulElement.scrollLeft + ulElement.clientWidth + liElement.clientWidth >=
              ulElement.scrollWidth;
          }
        });
      };
    
      const observer = new IntersectionObserver(observerCallback, {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      });
    
      observer.observe(liElement);

      taskCtx.cleanup(() => {
        observer.disconnect();
      });
    }
  },
  { strategy: 'document-idle' }
  );

  return (
    <li
      {...props.attributes}
      ref={li}
      class={props.attributes?.className}
      style={props.attributes?.styles}
      aria-roledescription={props.carouselItem.ariaRoleDescription}
      aria-label={props.carouselItem.ariaLabel}
      aria-hidden={props.carouselItem.ariaHidden}
      aria-current={props.carouselItem.ariaCurrent}
    >
        <Slot></Slot>
    </li>
  );
});

const CarouselNavigationItemComponent = component$<{}>(() => {
  const store = useContext(CarouselContext);

  return (
    <nav class="pagination" role="tablist" aria-multiselectable>
      {store.carouselItemList.map((carouselItem, index) => (
        <button
          key={"tab-" + ((index || 0) + 1)}
          class="pagination-item"
          type="button"
          role="tab"
          id={"tab-" + ((index || 0) + 1)}
          aria-controls={"tabpanel-" + ((index || 0) + 1)}
          title={
            carouselItem.ariaLabel + " Navigation Item " + ((index || 0) + 1)
          }
          aria-label={
            carouselItem.ariaLabel + " Navigation Item " + ((index || 0) + 1)
          }
          aria-setsize={store.carouselItemList.length}
          aria-posinset={(index || 0) + 1}
          aria-expanded={carouselItem.ariaCurrent}
          onClick$={() => {
            navigateToIndex(index || 0, store.ul?.value);
          }}
          /* @ts-ignore */
          tabindex="-1"
        ></button>
      ))}
    </nav>
  );
});

const navigateDirection = (
  direction: "previous" | "next",
  ul: Element | undefined
) => {
  if (ul) {
    if (direction === "previous") {
      ul.scrollTo({ left: ul.scrollLeft - ul.clientWidth / 2 });
    } else {
      ul.scrollTo({ left: ul.scrollLeft + ul.clientWidth / 2 });
    }
  }
};

const navigateToIndex = (index: number, ul: Element | undefined) => {
  if (ul) {
    const li = ul.children[index];
    li.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }
};


