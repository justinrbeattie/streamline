import type { Meta, StoryObj } from "storybook-framework-qwik";
import { CarouselComponent, type CarouselProps, CarouselItemComponent } from "./carousel";


const meta: Meta<CarouselProps> = {
  component: CarouselComponent,
};

type Story = StoryObj<CarouselProps>;

export default meta;

export const Carousel: Story = {
  args: {

  },
  argTypes: {
  },
  render: (props) => 

  <CarouselComponent {...props}>
    <CarouselItemComponent> 1 </CarouselItemComponent>
    <CarouselItemComponent> 2 </CarouselItemComponent>
    <CarouselItemComponent> 3 </CarouselItemComponent>
    <CarouselItemComponent> 4 </CarouselItemComponent>
    <CarouselItemComponent> 5 </CarouselItemComponent>

  </CarouselComponent>    
};



