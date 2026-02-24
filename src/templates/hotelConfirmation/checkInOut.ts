import { $, t } from "~/lib/templateBuilder";
import { gridCol, gridRow } from "../blocks";
import { grayBox } from "./grayBox";

export function checkInOut() {
  return gridRow(
    { gap: 8 },
    OPTIONS.map(({ key, label }) =>
      grayBox(
        gridCol(
          { gap: 4 },
          t.h4(
            {
              style: {
                margin: 0,
                color: "#384e6b",
                "font-size": "12px",
                "font-weight": 500,
                "text-align": "start",
              },
            },
            label,
          ),
          t.h3(
            {
              style: {
                margin: 0,
                color: "#384e6b",
                "font-size": "14px",
                "font-weight": 700,
                "text-align": "start",
              },
            },
            $.var(`${key}.date`),
          ),
          t.p(
            {
              style: {
                margin: 0,
                color: "#808fa3",
                "font-size": "12px",
                "font-weight": 500,
                "text-align": "start",
              },
            },
            `${label} start time at `,
            $.var(`${key}.time`),
          ),
        ),
      ),
    ),
  );
}

const OPTIONS = [
  { key: "checkIn", label: "Check-in" },
  { key: "checkOut", label: "Check-out" },
];
