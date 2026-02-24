import { box } from "../blocks";

export function grayBox(...children: any[]) {
  return box(
    {
      style: { "background-color": "#ecf1f8", "border-radius": "8px" },
      padding: { top: 12, bottom: 12, start: 12, end: 12 },
    },
    children,
  );
}
