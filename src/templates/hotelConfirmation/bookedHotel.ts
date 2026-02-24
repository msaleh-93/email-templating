import { $, t } from "~/lib/templateBuilder";
import { gridRow } from "../blocks";

export function bookedHotel() {
  return gridRow(
    { gap: 8 },
    t.td(
      { style: { padding: 0 }, width: 32 },
      t.img({
        src: "https://cdn.flyakeed.com/flyakeed-emails/images/Hotel.svg",
        height: 26,
        alt: "Hotel",
      }),
    ),
    t.h4(
      {
        style: {
          margin: 0,
          color: "#003180",
          "font-size": "14px",
          "font-weight": 700,
          "text-align": "start",
        },
      },
      $.var("name"),
    ),
  );
}
