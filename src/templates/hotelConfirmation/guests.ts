import { $, t } from "~/lib/templateBuilder";
import { gridCol, spacingY } from "../blocks";

export function guests() {
  return gridCol(
    null,
    $.each("guests", [
      spacingY(10),
      t.tr(
        null,
        t.td(
          { style: { padding: 0 } },
          t.p(
            {
              style: {
                margin: 0,
                color: "#003180",
                "font-size": "12px",
                "font-weight": 700,
                "text-align": "start",
              },
            },
            $.var("name"),
          ),
        ),
        t.td(
          { style: { padding: 0 } },
          t.p(
            {
              style: {
                margin: 0,
                color: "#92a3ba",
                "font-size": "12px",
                "font-weight": 500,
                "text-align": "end",
              },
            },
            $.var("type"),
          ),
        ),
      ),
    ]),
  );
}
