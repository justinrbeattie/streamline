import type { Meta, StoryObj } from "storybook-framework-qwik";
import { DetailsComponent, type DetailsProps } from "./details";

const meta: Meta<DetailsProps> = {
  component: DetailsComponent,
};

type Story = StoryObj<DetailsProps>;

export default meta;

export const Details: Story = {
  args: {
    summary: "Detail Summary",
  },
  argTypes: {



  },
  render: (props) => <>
  <DetailsComponent {...props}>Some Details</DetailsComponent>
  <DetailsComponent {...props}>Some Details</DetailsComponent>
  </>
  ,
};
