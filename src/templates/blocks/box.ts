import { flatten, t, type Attributes } from "~/lib/templateBuilder";
import { spacingX, spacingY, type Spacing } from "./spacing";
import { td } from "./wrappers";

interface BoxAttributes extends Attributes {
  padding?: { top?: number; bottom?: number; start?: Spacing; end?: Spacing };
}

export function box(attributes?: BoxAttributes | null, ...children: any[]) {
  const { padding, style, ...attrs } = attributes || {};
  const iterator = flatten(children);
  children = [];
  let child;
  for (child of iterator) children.push(td(null, child));

  return t.table(
    {
      "x-area": "box",
      width: "100%",
      align: "center",
      border: 0,
      style: { "border-collapse": "collapse", ...style },
      ...attrs,
    },
    t.tbody(
      null,
      padding?.top ? spacingY(padding.top) : null,
      t.tr(
        null,
        padding?.start ? spacingX(padding.start) : null,
        children,
        padding?.end ? spacingX(padding.end) : null,
      ),
      padding?.bottom ? spacingY(padding.bottom) : null,
    ),
  );
}
