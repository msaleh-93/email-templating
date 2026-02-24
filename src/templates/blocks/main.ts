import { box } from "./box";
import { gridCol } from "./grid";

export function main(...children: any[]) {
  return box(
    {
      style: { "background-color": "#ffffff", "max-width": "512px" },
      padding: { bottom: 32, start: SIDE_SPACING, end: SIDE_SPACING },
      "x-area": "main",
    },
    gridCol(null, children),
  );
}

const SIDE_SPACING = { value: "6.25%", min: 16, max: 32 } as const;
