import type { Meta, StoryObj } from "storybook-framework-qwik";
import { SectionComponent, type SectionProps } from "./section";

const meta: Meta<SectionProps> = {
  component: SectionComponent,
};

type Story = StoryObj<SectionProps>;

export default meta;

export const Section: Story = {
  args: {

      tag: "section",
      id: "section-101",
      mobileRows: 20,
      tabletRows: 15,
      desktopRows: 10,

  },
  argTypes: {},
  render: (props) => <SectionComponent {...props}></SectionComponent>,
};
