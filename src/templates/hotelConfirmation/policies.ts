import { $, t } from "~/lib/templateBuilder";
import { gridCol, spacingY } from "../blocks";
import { grayBox } from "./grayBox";

export function policies() {
  return OPTIONS.flatMap(({ key, label }) =>
    $.if(key, [
      spacingY(8),
      grayBox(
        gridCol(
          { gap: 4 },
          t.h3(
            {
              style: {
                margin: 0,
                color: "#3a4f6d",
                "font-size": "12px",
                "font-weight": 700,
                "text-align": "start",
              },
            },
            label,
          ),
          t.td(
            {
              style: {
                padding: 0,
                color: "#3A4F6D",
                "font-size": "12px",
                "font-weight": 500,
                "text-align": "start",
                "line-height": "145.5%",
              },
            },
            $.var(`{${key}}`),
          ),
        ),
      ),
    ]),
  );
}

const OPTIONS = [
  { key: "cancellationPolicy", label: "Cancellation Policy" },
  { key: "checkInPolicy", label: "Check-in Policy" },
  { key: "specialInstructions", label: "Special Instructions" },
];
