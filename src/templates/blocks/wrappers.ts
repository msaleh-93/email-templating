import { t, type Attributes } from "~/lib/templateBuilder";

export function tr(attributes?: Attributes | null, child?: any) {
  return child?.tagName === "tr" ? child : t.tr(attributes, td(null, child));
}

export function td(attributes?: Attributes | null, child?: any) {
  const { style, ...attr } = attributes || {};
  return child?.tagName === "td"
    ? child
    : t.td({ ...attr, style: { padding: 0, ...style } }, child);
}
