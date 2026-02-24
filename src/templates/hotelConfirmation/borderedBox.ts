import { box } from "../blocks";

export function borderedBox(...children: any[]) {
  return box(
    {
      style: {
        "border-collapse": "initial",
        "border-radius": "8px",
        border: "1px solid #cccccc",
      },
      padding: { top: 10, bottom: 10, start: 14, end: 14 },
    },
    children,
  );
}
