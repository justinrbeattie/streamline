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

const defaultCarouselChildConfig: BuilderElement[] = [
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
    friendlyName: "Column Start",
    type: "number",
    onChange:
      "options.get('colStart') + options.get('colSpan') > 14 ? options.set('colSpan', (14 - options.get('colStart'))): '';",
    helperText:
      "Column starting point from left. Column 0 and 14 is the Gutter.",
    min: 0,
    max: 13,
  },
  {
    name: "colSpan",
    friendlyName: "Column Span",
    type: "number",
    onChange:
      "options.get('colStart') + options.get('colSpan') > 14 ? options.set('colStart', (14 - options.get('colSpan'))): '';",
    helperText: "Number of Columns this component spans.",
    min: 1,
    max: 14,
  },
  {
    name: "rowStart",
    type: "number",
    defaultValue: 1,
  },
  {
    name: "rowSpan",
    type: "number",
    defaultValue: 1,
    showIf: 'parent.get("autoHeight") === false',
    
  },
];

const contentOptions: any = {
  emulatedBreakpoint: "Off",
  autoHeight: true,
  xs: {
    hidden: false,
    colStart: 0,
    colSpan: 14,
    rowStart: 1,
    rowSpan: 4,
  },
  sm: {
    hidden: false,
    colStart: 1,
    colSpan: 12,
    rowStart: 1,
    rowSpan: 4,
  },

  md: {
    hidden: false,
    colStart: 1,
    colSpan: 10,
    rowStart: 1,
    rowSpan: 4,
  },

  lg: {
    hidden: false,
    colStart: 1,
    colSpan: 8,
    rowStart: 1,
    rowSpan: 3,
  },

  xl: {
    hidden: false,
    colStart: 1,
    colSpan: 6,
    rowStart: 1,
    rowSpan: 6,
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
        children: [...defaultCarouselChildConfig],
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
        children: [...defaultCarouselChildConfig],
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
        children: [...defaultCarouselChildConfig],
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
        children: [...defaultCarouselChildConfig],
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
        children: [...defaultCarouselChildConfig],
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
        children: [...defaultCarouselChildConfig],
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
    name: "Content",
    canHaveChildren: true,
    noWrap: true,
    image: "https://img.icons8.com/ios/50/media-queries.png",
    inputs: [
      {
        name: "emulatedBreakpoint",
        friendlyName: "Breakpoints",
        helperText: "Test your content at different screen sizes.",
        type: "string",
        defaultValue: "Off",
        enum: ["Off", "xs", "sm", "md", "lg", "xl"],
      },
      {
        name: "autoHeight",
        type: "boolean",
        defaultValue: false,
      },
      {
        name: "background",
        type: "boolean",
        defaultValue: false,
      },
      {
        name: "layer",
        helperText: "Move content to front or back",
        type: "number",
        defaultValue: 0,
        min: -5,
        max: 5,
      },
      {
        name: "xs",
        type: "object",
        required: true,
        subFields: contentPlacement,
        defaultValue: contentOptions.xs,
        showIf:
          'options.get("emulatedBreakpoint") === "Off" || options.get("emulatedBreakpoint") == "xs"',
      },
      {
        name: "sm",
        type: "object",
        required: true,
        subFields: contentPlacement,
        defaultValue: contentOptions.sm,
        showIf:
          'options.get("emulatedBreakpoint") === "Off" || options.get("emulatedBreakpoint") == "sm"',
      },
      {
        name: "md",
        type: "object",
        required: true,
        subFields: contentPlacement,
        defaultValue: contentOptions.md,
        showIf:
          'options.get("emulatedBreakpoint") === "Off" || options.get("emulatedBreakpoint") == "md"',
      },
      {
        name: "lg",
        type: "object",
        required: true,
        subFields: contentPlacement,
        defaultValue: contentOptions.lg,
        showIf:
          'options.get("emulatedBreakpoint") === "Off" || options.get("emulatedBreakpoint") == "lg"',
      },
      {
        name: "xl",
        type: "object",
        required: true,
        subFields: contentPlacement,
        defaultValue: contentOptions.xl,
        showIf:
          'options.get("emulatedBreakpoint") === "Off" || options.get("emulatedBreakpoint") == "xl"',
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
        "component.name": { $in: ["Content"] },
      },
    },
    defaultChildren: [
      {
        "@type": "@builder.io/sdk:Element",
        component: {
          name: "Content",
          options: { ...contentOptions },
        },
      },
    ],
    inputs: [
      {
        name: "emulatedBreakpoint",
        friendlyName: "Breakpoints",
        helperText: "Test your content at different screen sizes.",
        type: "string",
        defaultValue: "Off",
        enum: ["Off", "xs", "sm", "md", "lg", "xl"],
      },
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
        "component.name": { $in: ["Content"] },
      },
    },
    defaultChildren: [
      {
        "@type": "@builder.io/sdk:Element",
        component: {
          name: "Content",
          options: { ...contentOptions },
        },
      },
    ],
    inputs: [
      {
        name: "emulatedBreakpoint",
        friendlyName: "Breakpoints",
        helperText: "Test your content at different screen sizes.",
        type: "string",
        defaultValue: "Off",
        enum: ["Off", "xs", "sm", "md", "lg", "xl"],
      },
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
      message: "You can only put Content in a Section",
      query: {
        "component.name": { $in: ["Content"] },
      },
    },
    defaultChildren: [
      {
        "@type": "@builder.io/sdk:Element",
        component: {
          name: "Content",
          options: { ...contentOptions },
        },
      },
    ],
    inputs: [
      {
        name: "emulatedBreakpoint",
        friendlyName: "Breakpoints",
        helperText: "Test your content at different screen sizes.",
        type: "string",
        defaultValue: "Off",
        enum: ["Off", "xs", "sm", "md", "lg", "xl"],
      },
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
  }
];
