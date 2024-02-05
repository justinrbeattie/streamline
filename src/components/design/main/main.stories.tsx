import type { Meta, StoryObj } from "storybook-framework-qwik";
import { MainComponent } from "./main";

const meta: Meta = {
  component: MainComponent,
};

type Story = StoryObj;

export default meta;

export const Main: Story = {
  args: {
  },
  argTypes: {},
  render: (props) => <MainComponent {...props}></MainComponent>,
};
