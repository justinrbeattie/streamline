import type { Meta, StoryObj } from "storybook-framework-qwik";
import { ContentComponent, type ContentProps } from "./content";
import { SectionComponent } from "../section/section";
import type { SectionProps } from "../section/section";

const meta: Meta<ContentProps> = {
  component: ContentComponent,
};

const sectionProps: SectionProps = {
  tag: "section",
  id: "section-101",
  mobileRows: 20,
  tabletRows: 15,
  desktopRows: 10,
};

type Story = StoryObj<ContentProps>;

export default meta;

export const Content: Story = {
  args: {
    type: "text",
    mobilePlacement: {
      colStart: "col 1",
      colEnd: "col 8",
      rowStart: "row 1",
      rowEnd: "row 8",
    },
    tabletPlacement: {
      colStart: "col 1",
      colEnd: "col 8",
      rowStart: "row 1",
      rowEnd: "row 8",
    },
    desktopPlacement: {
      colStart: "col 1",
      colEnd: "col 8",
      rowStart: "row 1",
      rowEnd: "row 8",
    },
  },
  argTypes: {},
  render: (props) => (
    <SectionComponent {...sectionProps}>
      <ContentComponent {...props}></ContentComponent>
    </SectionComponent>
  ),
};
