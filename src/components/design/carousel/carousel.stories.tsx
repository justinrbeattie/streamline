import type { Meta, StoryObj } from "storybook-framework-qwik";
import { CarouselComponent, type CarouselProps } from "./carousel";

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
    carouselItemList: [
      {
        ariaLabel: "Item 1",
        ariaRoleDescription: "Description for Item 1",
        ariaHidden: "false",
        ariaCurrent: "false",
      },
      {
        ariaLabel: "Item 2",
        ariaRoleDescription: "Description for Item 2",
        ariaHidden: "false",
        ariaCurrent: "false",
      },
      {
        ariaLabel: "Item 3",
        ariaRoleDescription: "Description for Item 3",
        ariaHidden: "false",
        ariaCurrent: "false",
      },
      {
        ariaLabel: "Item 4",
        ariaRoleDescription: "Description for Item 4",
        ariaHidden: "false",
        ariaCurrent: "false",
      },
      {
        ariaLabel: "Item 5",
        ariaRoleDescription: "Description for Item 5",
        ariaHidden: "false",
        ariaCurrent: "false",
      },
      {
        ariaLabel: "Item 6",
        ariaRoleDescription: "Description for Item 6",
        ariaHidden: "false",
        ariaCurrent: "false",
      },
    ],
    scrolledToStart: false,
    scrolledToEnd: false,
    carouselItemMinWidth: '28dvw',
    carouselItemMinHeight: '50dvh',
  },
  argTypes: {},
  render: (props) => <CarouselComponent {...props}></CarouselComponent>,
};
