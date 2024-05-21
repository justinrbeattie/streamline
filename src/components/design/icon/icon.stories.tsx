import type { Meta, StoryObj } from "storybook-framework-qwik";
import { IconComponent, type IconProps } from "./icon";

const meta: Meta<IconProps> = {
  component: IconComponent,
};

type Story = StoryObj<IconProps>;

export default meta;

export const Icon: Story = {
  args: {
    size: "medium",
  },
  argTypes: {

    size: {
      options: ["small", "medium", "large"],
      control: { type: 'select' },
    },
  },
  render: (props) => <IconComponent {...props}></IconComponent>,
};



