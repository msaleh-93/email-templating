import { $, t } from "~/lib/templateBuilder";
import { gridCol, gridRow, spacingY } from "../blocks";

export function rooms() {
  return gridCol(
    null,
    $.each("rooms", [
      t.h4(
        {
          style: {
            margin: 0,
            color: "#0f4096",
            "font-size": "12px",
            "font-weight": 700,
            "text-align": "start",
          },
        },
        $.var("name"),
      ),
      spacingY(4),
      gridRow(
        null,
        $.with(
          "nights",
          t.td(
            { style: { padding: 0, "max-width": "64px" }, width: 64 },
            t.p(
              {
                style: {
                  margin: 0,
                  color: "#0763df",
                  "font-size": "12px",
                  "font-weight": 600,
                  "text-align": "start",
                },
              },
              t.span(null, $.var("value"), " "),
              $.if("plural", "Nights", "Night"),
            ),
          ),
        ),
        $.with(
          "adults",
          t.td(
            { style: { padding: 0, "max-width": "56px" }, width: 56 },
            t.p(
              {
                style: {
                  margin: 0,
                  color: "#496997",
                  "font-size": "12px",
                  "font-weight": 500,
                  "text-align": "start",
                },
              },
              t.span(null, $.var("value"), " "),
              $.if("plural", "Adults", "Adult"),
            ),
          ),
        ),
        t.td(
          { style: { padding: 0 } },
          $.with(
            "children",
            t.p(
              {
                style: {
                  margin: 0,
                  color: "#496997",
                  "font-size": "12px",
                  "font-weight": 500,
                  "text-align": "start",
                },
              },
              t.span(null, $.var("value"), " "),
              $.if("plural", "Children", "Child"),
            ),
          ),
        ),
      ),
      spacingY(4),
      t.p(
        {
          style: {
            margin: 0,
            color: "#3d526e",
            "font-size": "12px",
            "font-weight": 500,
            "text-align": "start",
          },
        },
        $.var("{description}"),
      ),
      spacingY(10),
    ]),
    t.p(
      {
        style: {
          margin: 0,
          color: "#67788f",
          "font-size": "10px",
          "font-weight": 400,
          "font-style": "italic",
          "text-align": "start",
          "line-height": "145.4%",
        },
      },
      "Bed type is not guaranteed. Your selected bed type is treated as a request only and may be honored based on availability at check-in.",
    ),
  );
}
