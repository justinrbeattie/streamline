import type { Meta, StoryObj } from "storybook-framework-qwik";
import {
  CarouselComponent,
  CarouselItemComponent,
  type CarouselProps,
} from "./carousel";

const meta: Meta<CarouselProps> = {
  component: CarouselComponent,
};

type Story = StoryObj<CarouselProps>;

export default meta;

export const Carousel: Story = {
  args: {
    id: "carousel1",
    ariaLabel: "Aria Label for Carousel 1",
    ariaRoleDescription: "Description for Carousel 1",
    showButtons: true,
    showNavigation: true,
    scrolledToStart: false,
    scrolledToEnd: false,
    carouselItemMinWidth: "28dvw",
    carouselItemMinHeight: "50dvh",
  },
  argTypes: {},
  render: (props) => (
    <CarouselComponent {...props}>
      <CarouselItemComponent
        {...{
          carouselItem: {
            ariaLabel: "Item 1",
            ariaRoleDescription: "Description for Item 1",
          },
        }}
      ><div style="background:var(--surface-0);">Slide 1</div></CarouselItemComponent>
            <CarouselItemComponent
        {...{
          carouselItem: {
            ariaLabel: "Item 2",
            ariaRoleDescription: "Description for Item 2",
          },
        }}
      ><div style="background:var(--surface-0);">Slide 2</div></CarouselItemComponent>
            <CarouselItemComponent
        {...{
          carouselItem: {
            ariaLabel: "Item 3",
            ariaRoleDescription: "Description for Item 3",
          },
        }}
      ><div style="background:var(--surface-0);">Slide 3</div></CarouselItemComponent>
            <CarouselItemComponent
        {...{
          carouselItem: {
            ariaLabel: "Item 4",
            ariaRoleDescription: "Description for Item 4",
          },
        }}
      ><div style="background:var(--surface-0);">Slide 4</div></CarouselItemComponent>
            <CarouselItemComponent
        {...{
          carouselItem: {
            ariaLabel: "Item 5",
            ariaRoleDescription: "Description for Item 5",
          },
        }}
      ><div style="background:var(--surface-0);">Slide 5</div></CarouselItemComponent>
            <CarouselItemComponent
        {...{
          carouselItem: {
            ariaLabel: "Item 6",
            ariaRoleDescription: "Description for Item 6",
          },
        }}
      ><div style="background:var(--surface-0);">Slide 6</div></CarouselItemComponent>
    </CarouselComponent>
  ),
};
