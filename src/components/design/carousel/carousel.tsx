import type { QRL } from "@builder.io/qwik";
import {
  component$,
  useSignal,
  useStylesScoped$,
  Slot,
  useVisibleTask$,
  $,
  useStore,
} from "@builder.io/qwik";
import styles from "./carousel.css?inline";
import { IconComponent } from "../icon/icon";

export interface CarouselProps {
  id: string;
  ariaLabel: string;
  ariaRoleDescription: string;
  showButtons: boolean;
  showNavigation: boolean;
  carouselItemList: CarouselItem[];
  scrolledToStart: boolean;
  scrolledToEnd: boolean;
  carouselItemMinWidth: string;
  carouselItemMinHeight: string;
}

export interface CarouselItem {
  ariaLabel: string;
  ariaRoleDescription: string;
  ariaHidden: string;
  ariaCurrent: string;
}

export const CarouselComponent = component$<CarouselProps>((props) => {
  useStylesScoped$(styles);
  const ul = useSignal<Element>();
  const ulElement = ul.value;
  const store = useStore(structuredClone({ ...props }));
  const scrollPosition = $(() => {
    if (ulElement) {
      store.scrolledToStart = ulElement.scrollLeft === 0;
      if (ulElement.scrollLeft > 0) {
        const totalItemsWidth = Array.from(ulElement.children).reduce(
          (acc, item) => {
            return acc + item.clientWidth;
          },
          0
        );
        store.scrolledToEnd =
          ulElement.scrollLeft + ulElement.clientWidth >= totalItemsWidth;
      }
    }
  });

  return (
    <div
      class="wrapper"
      scrolled-to-start={store.scrolledToStart || null}
      scrolled-to-end={store.scrolledToEnd || null}
      style={`--carousel-item-min-width:${store.carouselItemMinWidth}; --carousel-item-min-height:${store.carouselItemMinHeight};`}
    >
      {store.showButtons ? (
        <button
          type="button"
          title="Previous Item"
          aria-label="Previous Item"
          disabled={store.scrolledToStart}
          onClick$={() => {
            navigateDirection("previous", ul.value);
          }}
        >
          <IconComponent
            icon="InNavArrowLeft"
            size="small"
            variant="default"
          ></IconComponent>
        </button>
      ) : (
        ""
      )}
      <ul ref={ul}>
        {store.carouselItemList.map((carouselItem, index) => (
          //@ts-ignore
          <li
            key={`Slide ${index + 1} ${carouselItem.ariaLabel}`}
            aria-roledescription={carouselItem.ariaRoleDescription}
            aria-label={carouselItem.ariaLabel}
            aria-hidden={carouselItem.ariaHidden}
            aria-current={carouselItem.ariaCurrent}
          >
            <CarouselItemComponent
              carouselItem={carouselItem}
              scrollPosition={
                index === 0 || index === store.carouselItemList.length - 1
                  ? scrollPosition
                  : undefined
              }
            >
              <Slot></Slot>
            </CarouselItemComponent>
          </li>
        ))}
      </ul>
      {store.showButtons ? (
        <button
          type="button"
          title="Next Item"
          aria-label="Next Item"
          disabled={store.scrolledToEnd}
          onClick$={() => {
            navigateDirection("next", ul.value);
          }}
        >
          <IconComponent
            icon="InNavArrowRight"
            size="small"
            variant="default"
          ></IconComponent>
        </button>
      ) : (
        ""
      )}

      {store.showNavigation ? (
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
                carouselItem.ariaLabel +
                " Navigation Item " +
                ((index || 0) + 1)
              }
              aria-label={
                carouselItem.ariaLabel +
                " Navigation Item " +
                ((index || 0) + 1)
              }
              aria-setsize={store.carouselItemList.length}
              aria-posinset={(index || 0) + 1}
              aria-expanded={carouselItem.ariaCurrent}
              onClick$={() => {
                navigateToIndex(index || 0, ul.value);
              }}
              /* @ts-ignore */
              tabindex="-1"
            ></button>
          ))}
        </nav>
      ) : (
        ""
      )}
    </div>
  );
});

const CarouselItemComponent = component$<{
  carouselItem: CarouselItem;
  scrollPosition?: QRL<() => void>;
}>((props) => {
  useStylesScoped$(
    `div {
      min-width:100%;
      min-height: 100%;
    }
    `
  );
  const sentinel = useSignal<Element>();
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async (taskCtx) => {
    if (sentinel.value) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            props.carouselItem.ariaCurrent = (
              entry.intersectionRatio === 1
            ).toString();
            props.carouselItem.ariaHidden = (
              entry.intersectionRatio != 1
            ).toString();
            if (props.scrollPosition) {
              props.scrollPosition();
            }
          });
        },
        {
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        }
      );

      observer.observe(sentinel.value);

      taskCtx.cleanup(() => {
        observer.disconnect();
      });
    }
  });

  return (
    <div ref={sentinel}>
      <Slot></Slot>
    </div>
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

// spotlight
// set up examples
