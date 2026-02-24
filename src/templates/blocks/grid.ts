import { mapChildren, t, type Attributes } from "~/lib/templateBuilder";
import { spacingX, spacingY, type Spacing } from "./spacing";
import { td, tr } from "./wrappers";

interface GridRowAttributes extends Attributes {
  gap?: Spacing;
}

export function gridRow(
  attributes?: GridRowAttributes | null,
  ...children: any[]
) {
  const { gap, style, ...attrs } = attributes || {};
  children = mapChildren(children, (child) => [
    td(null, child),
    ...(gap ? [spacingX(gap)] : []),
  ]);
  if (gap) {
    const last = children.pop();
    if (last?.attributes?.["x-area"] !== "spacing-x") children.push(last);
  }

  return t.table(
    {
      "x-area": "grid-row",
      width: "100%",
      align: "center",
      border: 0,
      style: { "border-collapse": "collapse", ...style },
      ...attrs,
    },
    t.tbody(null, t.tr(null, children)),
  );
}

interface GridColAttributes extends Attributes {
  gap?: number;
}

export function gridCol(
  attributes?: GridColAttributes | null,
  ...children: any[]
) {
  const { gap, style, ...attrs } = attributes || {};
  children = mapChildren(children, (child) => [
    tr(null, child),
    ...(gap ? [spacingY(gap)] : []),
  ]);
  if (gap) {
    const last = children.pop();
    if (last?.attributes?.["x-area"] !== "spacing-y") children.push(last);
  }

  return t.table(
    {
      "x-area": "grid-col",
      width: "100%",
      align: "center",
      border: 0,
      style: { "border-collapse": "collapse", ...style },
      ...attrs,
    },
    t.tbody(null, children),
  );
}
