
import type { RegisteredComponent } from "@builder.io/sdk-qwik";
import { ButtonComponent } from "./design/button/button";
import {
  CarouselComponent,
  CarouselItemComponent,
} from "./design/carousel/carousel";
import { ContentComponent } from "./design/content/content";
import { MainComponent } from "./design/main/main";
import { SectionComponent } from "./design/section/section";
import type { BuilderElement } from "@builder.io/sdk-qwik/types/src/types/element";
import type { Input } from "@builder.io/sdk-qwik/types/src/types/input";



/**
 * This array is used to integrate custom components within Builder.
 * https://www.builder.io/c/docs/custom-components-intro
 *
 * These components will be found the "Custom Components"
 * section of Builder's visual editor.
 * You can also turn on "components only mode" to limit
 * editing to only these components.
 * https://www.builder.io/c/docs/guides/components-only-mode
 */


const defaultChildConfig: BuilderElement[] = [
  {
    "@type": "@builder.io/sdk:Element",
    component: {
      name: "Box",
      options: {},
    },
    children: [
      {
        "@type": "@builder.io/sdk:Element",
        component: {
          name: "Text",
          options: { text: "Insert Text Here" },
        },
      },
    ],
  },
];

const contentPlacement: Input[] = [
  {
    name: "hidden",
    type: "boolean",
  },
  {
    name: "colStart",
    type: "string",
    defaultValue: "col 1",
    enum: [
      "left-gutter",
      "col 1",
      "col 2",
      "col 3",
      "col 4",
      "col 5",
      "col 6",
      "col 7",
      "col 8",
      "col 9",
      "col 10",
      "col 11",
      "col 12",
      "right-gutter",
    ],
  },
  {
    name: "colSpan",
    type: "string",
    defaultValue: "span 2",
    enum: [
      "span 1",
      "span 2",
      "span 3",
      "span 4",
      "span 5",
      "span 6",
      "span 7",
      "span 8",
      "span 9",
      "span 10",
      "span 11",
      "span 12",
      "span 13",
      "span 14",
    ],
  },
  {
    name: "rowStart",
    type: "string",
    defaultValue: "row 1",
    enum: [
      "row 1",
      "row 2",
      "row 3",
      "row 4",
      "row 5",
      "row 6",
      "row 7",
      "row 8",
      "row 9",
      "row 10",
      "row 11",
      "row 12",
      "row 13",
      "row 14",
      "row 15",
      "row 16",
      "row 17",
      "row 18",
      "row 19",
      "row 20",
    ],
  },
  {
    name: "rowSpan",
    type: "string",
    defaultValue: "span 1",
    hideFromUI:true,
    enum: [
      "span 0",
      "span 1",
      "span 2",
      "span 3",
      "span 4",
      "span 5",
      "span 6",
      "span 7",
      "span 8",
      "span 9",
      "span 10",
      "span 11",
      "span 12",
      "span 13",
      "span 14",
      "span 15",
      "span 16",
      "span 17",
      "span 18",
      "span 19",
      "span 20",
    ],
  },
];

const contentOptions: any = {
  type: "text",
  xs: {
    hidden: false,
    colStart: "col 1",
    colSpan: "span 12",
    rowStart: "row 1",
    rowSpan: "span 4",
  },
  sm: {
    hidden: false,
    colStart: "col 1",
    colSpan: "span 12",
    rowStart: "row 1",
    rowSpan: "span 4",
  },

  md: {
    hidden: false,
    colStart: "col 1",
    colSpan: "span 11",
    rowStart: "row 1",
    rowSpan: "span 4",
  },

  lg: {
    hidden: false,
    colStart: "col 1",
    colSpan: "span 8",
    rowStart: "row 1",
    rowSpan: "span 3",
  },

  xl: {
    hidden: false,
    colStart: "col 1",
    colSpan: "span 6",
    rowStart: "row 1",
    rowSpan: "span 6",
  },
};

export const CUSTOM_COMPONENTS: RegisteredComponent[] = [
  {
    component: ButtonComponent,
    name: "Button",
    image: "https://img.icons8.com/ios/50/button2.png",
    noWrap: true,
    inputs: [
      {
        name: "shape",
        type: "string",
        enum: ["rectangle", "circle"],
        defaultValue: "rectangle",
      },
      {
        name: "style",
        type: "string",
        enum: ["standard", "outlined", "filled", "transparent", "blurred"],
        defaultValue: "standard",
      },
      {
        name: "size",
        type: "string",
        enum: ["small", "medium", "large"],
        defaultValue: "medium",
      },
      {
        name: "variant",
        type: "string",
        enum: [
          "default",
          "primary",
          "secondary",
          "warning",
          "success",
          "danger",
        ],
        defaultValue: "default",
      },
      {
        name: "href",
        type: "string",
        defaultValue: "",
      },
      {
        name: "newWindow",
        type: "boolean",
        defaultValue: false,
      },
      {
        name: "cms",
        type: "boolean",
        defaultValue: true,
        hideFromUI: true,
      },
      {
        name: "ariaLabel",
        type: "string",
        defaultValue: "",
      },
      {
        name: "ariaControls",
        type: "string",
        defaultValue: "",
      },
      {
        name: "ariaRoledescription",
        type: "string",
        defaultValue: "",
      },
      {
        name: "ariaHaspopup",
        type: "boolean",
        defaultValue: false,
      },
      {
        name: "id",
        type: "string",
        defaultValue: "",
      },
    ],
    defaultChildren: [
      {
        "@type": "@builder.io/sdk:Element",
        component: {
          name: "Text",
          options: { text: "I am child text block!" },
        },
      },
    ],
  },
  {
    component: CarouselComponent,
    name: "Carousel",
    image: "https://img.icons8.com/ios/50/view-carousel.png",
    noWrap: true,
    canHaveChildren: true,
    childRequirements: {
      message: "You can only put Carousel Items in a Carousel",
      query: {
        "component.name": { $in: ["CarouselItemComponent"] },
      },
    },
    inputs: [
      {
        name: "ariaLabel",
        type: "string",
        required: true,
        defaultValue: "Carousel of images",
      },
      {
        name: "ariaRoleDescription",
        type: "string",
        required: true,
        defaultValue: "Carousel of images",
      },
      {
        name: "carouselItemMinHeight",
        type: "string",
        required: true,
        defaultValue: "40dvh",
      },
      {
        name: "carouselItemMinWidth",
        type: "string",
        required: true,
        defaultValue: "33dvw",
      },
      {
        name: "id",
        type: "string",
        required: true,
        defaultValue: "carousel-id",
      },
      {
        name: "showButtons",
        type: "boolean",
        defaultValue: true,
      },
      {
        name: "showNavigation",
        type: "boolean",
        defaultValue: true,
      },
    ],
    defaultChildren: [
      {
        "@type": "@builder.io/sdk:Element",
        component: {
          name: "CarouselItemComponent",
          options: {
            carouselItem: {
              ariaLabel: "Item 1",
              ariaRoleDescription: "Description for Item 1",
            },
          },
        },
        children: [...defaultChildConfig],
      },
      {
        "@type": "@builder.io/sdk:Element",
        component: {
          name: "CarouselItemComponent",
          options: {
            carouselItem: {
              ariaLabel: "Item 2",
              ariaRoleDescription: "Description for Item 2",
            },
          },
        },
        children: [...defaultChildConfig],
      },
      {
        "@type": "@builder.io/sdk:Element",
        component: {
          name: "CarouselItemComponent",
          options: {
            carouselItem: {
              ariaLabel: "Item 3",
              ariaRoleDescription: "Description for Item 3",
            },
          },
        },
        children: [...defaultChildConfig],
      },
      {
        "@type": "@builder.io/sdk:Element",
        component: {
          name: "CarouselItemComponent",
          options: {
            carouselItem: {
              ariaLabel: "Item 4",
              ariaRoleDescription: "Description for Item 4",
            },
          },
        },
        children: [...defaultChildConfig],
      },
      {
        "@type": "@builder.io/sdk:Element",
        component: {
          name: "CarouselItemComponent",
          options: {
            carouselItem: {
              ariaLabel: "Item 5",
              ariaRoleDescription: "Description for Item 5",
            },
            children: [
              {
                "@type": "@builder.io/sdk:Element",
                component: {
                  name: "Text",
                  options: { text: "I am child text block!" },
                },
              },
            ],
          },
        },
        children: [...defaultChildConfig],
      },
      {
        "@type": "@builder.io/sdk:Element",
        component: {
          name: "CarouselItemComponent",
          options: {
            carouselItem: {
              ariaLabel: "Item 6",
              ariaRoleDescription: "Description for Item 6",
            },
            defaultChildren: [
              {
                "@type": "@builder.io/sdk:Element",
                component: {
                  name: "Text",
                  options: { text: "I am child text block!" },
                },
              },
            ],
          },
        },
        children: [...defaultChildConfig],
      },
    ],
    defaultStyles: {
      display: "inherit",
      marginTop: "inherit",
    },
  },
  {
    component: CarouselItemComponent,
    name: "CarouselItemComponent",
    noWrap: true,
    hideFromInsertMenu: true,
    canHaveChildren: true,
    defaultChildren: [
      {
        "@type": "@builder.io/sdk:Element",
        component: {
          name: "Text",
          options: { text: "I am child text block!" },
        },
      },
    ],
    inputs: [
      {
        name: "carouselItem",
        type: "object",
        defaultValue: {
          ariaLabel: "Item 1",
          ariaRoleDescription: "Description for Item 1",
        },
        subFields: [
          {
            name: "ariaLabel",
            type: "string",
            required: true,
          },
          {
            name: "ariaRoleDescription",
            type: "string",
            required: true,
          },
        ],
      },
    ],
  },
  {
    component: ContentComponent,
    name: "Text Content",
    noWrap: true,
    image: "https://img.icons8.com/ios/50/media-queries.png",
    inputs: [
      {
        name: "type",
        type: "string",
        enum: ["visual", "text"],
        defaultValue:"visual",
        required: true,
        hideFromUI:true,
      },
      {
        name: "xs",
        type: "object",
        required: true,
        subFields: contentPlacement,
        defaultValue:contentOptions.xs,        
      },
      {
        name: "sm",
        type: "object",
        required: true,
        subFields: contentPlacement,
        defaultValue:contentOptions.sm
      },
      {
        name: "md",
        type: "object",
        required: true,
        subFields: contentPlacement,
        defaultValue:contentOptions.md
      },
      {
        name: "lg",
        type: "object",
        required: true,
        subFields: contentPlacement,
        defaultValue:contentOptions.lg
      },
      {
        name: "xl",
        type: "object",
        required: true,
        subFields: contentPlacement,
        defaultValue:contentOptions.xl
      },
    ],
  },
  {
    component: ContentComponent,
    name: "Visual Content",
    noWrap: true,
    image: "https://img.icons8.com/ios/50/media-queries.png",
    defaults: {},

    inputs: [
      {
        name: "type",
        type: "string",
        enum: ["visual", "text"],
        defaultValue:"visual",
        required: true,
        hideFromUI:true,
      },
      {
        name: "xs",
        type: "object",
        required: true,
        subFields: contentPlacement,
        defaultValue:contentOptions.xs
      },
      {
        name: "sm",
        type: "object",
        required: true,
        subFields: contentPlacement,
        defaultValue:contentOptions.sm
      },
      {
        name: "md",
        type: "object",
        required: true,
        subFields: contentPlacement,
        defaultValue:contentOptions.md
      },
      {
        name: "lg",
        type: "object",
        required: true,
        subFields: contentPlacement,
        defaultValue:contentOptions.lg
      },
      {
        name: "xl",
        type: "object",
        required: true,
        subFields: contentPlacement,
        defaultValue:contentOptions.xl
      },
    ],
  },
  {
    component: SectionComponent,
    name: "Footer",
    image: "https://img.icons8.com/ios/50/document-footer.png",
    noWrap: true,
    canHaveChildren: true,
    childRequirements: {
      message: "You can only put Text or Image Content in a Footer",
      query: {
        "component.name": { $in: ["Text Content", "Image Content"] },
      },
    },
    defaultChildren: [
      {
        "@type": "@builder.io/sdk:Element",
        component: {
          name: "Text Content",
          options: { ...contentOptions },
        },
        children: [...defaultChildConfig],
      },
    ],
    inputs: [
      {
        name: "id",
        type: "string",
        required: true,
        defaultValue: "Section-1",
      },
      {
        name: "tag",
        type: "string",
        hideFromUI: true,
        defaultValue: "footer",
      },
    ],
  },
  {
    component: SectionComponent,
    name: "Header",
    image: "https://img.icons8.com/ios/50/document-header.png",
    noWrap: true,
    canHaveChildren: true,
    childRequirements: {
      message: "You can only put Text or Image Content in a Header",
      query: {
        "component.name": { $in: ["Text Content", "Image Content"] },
      },
    },
    defaultChildren: [
      {
        "@type": "@builder.io/sdk:Element",
        component: {
          name: "Text Content",
          options: { ...contentOptions },
        },
        children: [...defaultChildConfig],
      },
    ],
    inputs: [
      {
        name: "id",
        type: "string",
        required: true,
        defaultValue: "Header-1",
      },
      {
        name: "tag",
        type: "string",
        hideFromUI: true,
        defaultValue: "header",
      },
    ],
  },
  {
    component: MainComponent,
    name: "MainComponent",
    image: "https://img.icons8.com/ios/50/single-page-mode.png",
    noWrap: true,
    canHaveChildren: true,
  },
  {
    component: SectionComponent,
    name: "Section",
    image: "https://img.icons8.com/ios/50/width.png",
    noWrap: true,
    canHaveChildren: true,
    childRequirements: {
      message: "You can only put Text or Image Content in a Section",
      query: {
        "component.name": { $in: ["Text Content", "Image Content"] },
      },
    },
    defaultChildren: [
      {
        "@type": "@builder.io/sdk:Element",
        component: {
          name: "Text Content",
          options: { ...contentOptions },
        },
        children: [...defaultChildConfig],
      },
    ],
    inputs: [
      {
        name: "id",
        type: "string",
        required: true,
        defaultValue: "Section-1",
      },
      {
        name: "tag",
        type: "string",
        hideFromUI: true,
        defaultValue: "section",
      },
    ],
  },
];
