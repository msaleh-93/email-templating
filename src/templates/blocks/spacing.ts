import { t } from "~/lib/templateBuilder";

export type Spacing =
  | number
  | `${number}%`
  | { value: `${number}%`; min?: number; max?: number };

export function spacingX(size: Spacing) {
  let width, min, max;
  if (typeof size === "object") {
    width = size.value;
    min = size.min;
    max = size.max;
  } else {
    width = size;
    if (typeof size === "number") min = max = size;
  }

  return t.td({
    "x-area": "spacing-x",
    width,
    style: {
      padding: 0,
      "min-width": `${typeof min === "number" ? min : width}px`,
      "max-width": `${typeof max === "number" ? max : width}px`,
    },
  });
}

export function spacingY(size: number) {
  return t.tr(
    { "x-area": "spacing-y", height: size },
    t.td({ style: { padding: 0 } }),
  );
}

export function dividerH() {
  return t.tr(
    { "x-area": "divider-h" },
    t.td({
      width: "100%",
      height: 1,
      style: { height: "1px", padding: 0, "background-color": "#C2CAD6" },
    }),
  );
}
