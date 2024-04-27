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
import { CustomStylesComponent } from "./design/custom-styles/custom-styles";
import { LayoutComponent } from "./design/layout/layout";
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

const contentResponsiveStyles: any = {
    large: {
      display: "flex",
      "--cols": "col 1 / span 6",
      "--rows": "content",
      "--layer": "var(--layer-1)",
    },
    medium: { display: "flex", "--cols": "col 1 / span 7" },
    small: { display: "flex", "--cols": "col 1 / span 12" },
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
    defaults: {responsiveStyles:{...contentResponsiveStyles}},
  },
  {
    component: CustomStylesComponent,
    name: "Styles",
    canHaveChildren: true,
    noWrap: true,
    image: "https://img.icons8.com/ios/50/css.png",
    inputs: [
      {
        name: "styles",
        type: "code",
        required: true,
        defaultValue: "/* Write your CSS Code Here */",
      }]
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
    defaults: {responsiveStyles:{
      large: {
        "--palette-hue": "inherit",
        "--palette-chroma": "inherit",
      } as any,
    }},
    defaultChildren: [
      {
        "@type": "@builder.io/sdk:Element",
        component: {
          name: "Content",
        },
        responsiveStyles:{...contentResponsiveStyles}
      },
    ],
    inputs: [
      {
        name: "id",
        friendlyName: "Id",
        type: "string",
        required: true,
        defaultValue: "Section-1",
      },
      {
        name: "tag",
        type: "string",
        defaultValue: "section",
        enum: ["header", "section", "footer"],
      },
    ],
  },
  {
    component: LayoutComponent,
    name: "Layout",
    image: "https://img.icons8.com/ios/50/template.png",
    noWrap: true,
    canHaveChildren:true,
    inputs: [
      {
        name: "layout",
        type: "string",
        enum: [
          { label: "1x Column", value: "1fr" },
          { label: "2x Even Columns", value: "1fr 1fr" },
          { label: "1x 1/4 + 1x 3/4 Columns", value: "3fr 9fr" },
          { label: "1x 3/4 + 1x 1/4 Columns", value: "9fr 3fr" },
          { label: "1x 1/3 + 1x 2/3 Columns", value: "4fr 8fr" },
          { label: "1x 2/3 + 1x 1/1 Columns", value: "8fr 4fr" },
          { label: "1x 5/12 + 1x 7/12 Columns", value: "5fr 7fr" },
          { label: "1x 7/12 + 1x 5/12 Columns", value: "7fr 5fr" },
          { label: "3x Even Columns", value: "1fr 1fr 1fr" },
          { label: "4x Even Columns", value: "1fr 1fr 1fr 1fr" },
        ],
        defaultValue: "1fr 1fr",
      },
      {
        name: "layoutExtend",
        friendlyName:"Extend Layout to Edge",
        type: "string",
        enum: [
          { label: "None", value: "" },
          { label: "Extend layout to left", value: "extend-left" },
          { label: "Extend layout to right", value: "extend-right" },
          { label: "Extend layout to horizontal edges", value: "extend-horizontal" },
          { label: "Extend layout to top", value: "extend-top" },
          { label: "Extend layout to bottom", value: "extend-bottom" },
          { label: "Extend layout to vertical edges", value: "extend-vertical" },
          { label: "Extend layout to all edges", value: "extend-all" }
        ],
        defaultValue: "1fr 1fr",
      },
    ]
    }
];
