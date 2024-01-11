import type { Meta, StoryObj } from "storybook-framework-qwik";
import { ButtonComponent, type ButtonProps } from "./button";

const meta: Meta<ButtonProps> = {
  component: ButtonComponent,
};

type Story = StoryObj<ButtonProps>;

export default meta;

export const Button: Story = {
  args: {
    size: "medium",
    variant: "primary",
    style: "standard",
    shape: "rectangle",
    href: "",
    newWindow: false,
    disabled: false,
  },
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
      control: { type: 'select' },
    },

    variant: {
      options: ["default", "primary", "secondary", "warning", "success", "danger"],
      control: { type: 'select' },
    },

    style: {
      options: ["standard", "transparent", "filled", "outlined"],
      control: { type: 'select' },
    },

    shape: {
      options: ["rectangle", "circle"],
      control: { type: 'select' },
    },


  },
  render: (props) => <ButtonComponent {...props}>Some button</ButtonComponent>,
};
