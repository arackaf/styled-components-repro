type Values = {
  [property: string]: {
    [value: string]: string;
  };
};

// inline-start and inline-end is currently not well supported so we use css variables to override
// @see /css/styles.css
const values: Values = {
  clear: {
    left: "var(--inline-start, inline-start)",
    right: "var(--inline-end, inline-end)",
  },

  float: {
    left: "var(--inline-start, inline-start)",
    right: "var(--inline-end, inline-end)",
  },

  "text-align": {
    left: "start",
    right: "end",
  },
};

type Properties = {
  [property: string]: string;
};

const properties: Properties = {
  // https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties/Margins_borders_padding#mappings_for_margins_borders_and_padding
  "border-bottom": "border-block-end",
  "border-bottom-color": "border-block-end-color",
  "border-bottom-style": "border-block-end-style",
  "border-bottom-width": "border-block-end-width",
  "border-top": "border-block-start",
  "border-top-color": "border-block-start-color",
  "border-top-style": "border-block-start-style",
  "border-top-width": "border-block-start-width",
  "border-right": "border-inline-end",
  "border-right-color": "border-inline-end-color",
  "border-right-style": "border-inline-end-style",
  "border-right-width": "border-inline-end-width",
  "border-left": "border-inline-start",
  "border-left-color": "border-inline-start-color",
  "border-left-style": "border-inline-start-style",
  "border-left-width": "border-inline-start-width",
  "border-top-left-radius": "border-start-start-radius",
  "border-bottom-left-radius": "border-start-end-radius",
  "border-top-right-radius": "border-end-start-radius",
  "border-bottom-right-radius": "border-end-end-radius",
  "margin-bottom": "margin-block-end",
  "margin-top": "margin-block-start",
  "margin-right": "margin-inline-end",
  "margin-left": "margin-inline-start",
  "padding-bottom": "padding-block-end",
  "padding-top": "padding-block-start",
  "padding-right": "padding-inline-end",
  "padding-left": "padding-inline-start",
  // https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties/Floating_and_positioning#mapped_properties_and_values
  top: "inset-block-start",
  bottom: "inset-block-end",
  left: "inset-inline-start",
  right: "inset-inline-end",
  // https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties/Sizing#mappings_for_dimensions
  width: "inline-size",
  height: "block-size",
  "min-width": "min-inline-size",
  "min-height": "min-block-size",
  "max-width": "max-inline-size",
  "max-height": "max-block-size",
};

export function transform(property: string, value: string) {
  return [properties[property] ?? property, values[property]?.[value] ?? value] as const;
}
