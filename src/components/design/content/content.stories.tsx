import type { Meta, StoryObj } from "storybook-framework-qwik";
import { ContentComponent, type ContentProps } from "./content";
import { SectionComponent } from "../section/section";
import type { SectionProps } from "../section/section";

const meta: Meta<ContentProps> = {
  component: ContentComponent,
};

const sectionProps: SectionProps = {
  emulatedBreakpoint:'Off',
  tag: "section",
  id: "section-101",
  attributes:{}

};

type Story = StoryObj<ContentProps>;

export default meta;

export const Content: Story = {
  args: {
    autoHeight: true,
    xs: {
      hidden: false,
      colStart: 0,
      colSpan: 14,
      rowStart: 1,
      rowSpan: 2,
    },
    sm: {
      hidden: false,
      colStart: 0,
      colSpan: 14,
      rowStart: 1,
      rowSpan: 2,
    },

    md: {
      hidden: false,
      colStart: 0,
      colSpan: 14,
      rowStart: 1,
      rowSpan: 2,
    },

    lg: {
      hidden: false,
      colStart: 0,
      colSpan: 14,
      rowStart: 1,
      rowSpan: 2,
    },

    xl: {
      hidden: false,
      colStart: 0,
      colSpan: 14,
      rowStart: 1,
      rowSpan: 2,
    },
  },
  argTypes: {



  },
  render: (props) => (
    <SectionComponent {...sectionProps}>
      <ContentComponent {...props}>
    <p>
    orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    
    </p>

      </ContentComponent>
    </SectionComponent>
  ),
};
