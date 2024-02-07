import type { Meta, StoryObj } from "storybook-framework-qwik";
import { ContentComponent, type ContentProps } from "./content";
import { SectionComponent } from "../section/section";
import type { SectionProps } from "../section/section";
import { StoryBookBreakpoint } from "~/components/common/breakpoint/breakpoint";

const meta: Meta<ContentProps> = {
  component: ContentComponent,
};

const sectionProps: SectionProps = {
  tag: "section",
  id: "section-101"
};

type Story = StoryObj<ContentProps>;

export default meta;

export const Content: Story = {
  args: {
    type: "text",
    width:null,
    xs: {
      hidden: false,
      colStart: "left-gutter",
      colSpan: "span 14",
      rowStart: "row 1",
      rowSpan: "span 6",
    },
    sm: {
      hidden: false,
      colStart: "col 1",
      colSpan: "span 12",
      colEnd: "col 8",
      rowStart: "row 1",
      rowSpan: "span 5",
    },

    md: {
      hidden: false,
      colStart: "col 1",
      colSpan: "span 8",
      rowStart: "row 1",
      rowSpan: "span 4",
    },

    lg: {
      hidden: false,
      colStart: "col 1",
      colSpan: "span 6",
      rowStart: "row 1",
      rowSpan: "span 3",
    },

    xl: {
      hidden: false,
      colStart: "col 1",
      colSpan: "span 4",
      rowStart: "row 1",
      rowSpan: "span 6",
    },
  },
  argTypes: {

    type: {
      options: ["decorative" , "text" , "image"],
      control: { type: 'select' },
    },

    width: {
      control: { type: 'number', min:320, max:1920, step: 100 }
    },


  },
  render: (props) => (
    <StoryBookBreakpoint>
    <SectionComponent {...sectionProps}>
      <ContentComponent {...props}>
    <p>
    orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    
    </p>

      </ContentComponent>
    </SectionComponent>
    </StoryBookBreakpoint>
  ),
};
