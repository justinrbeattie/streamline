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
    variant: "primary",
  },
  argTypes: {

    size: {
      options: ["small", "medium", "large"],
      control: { type: 'select' },
    },

    variant: {
      options: ["default", "primary", "secondary", "warning", "success", "danger"],
      control: { type: 'select' },
    }
  },
  render: (props) => <IconComponent {...props}></IconComponent>,
};



