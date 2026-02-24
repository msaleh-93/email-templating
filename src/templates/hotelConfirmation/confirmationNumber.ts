import { $, t } from "~/lib/templateBuilder";
import { box, td } from "../blocks";

export function confirmationNumber() {
  return $.with(
    $.lookup(".", "event"),
    $.unless(
      "bookingRejection",
      $.if(
        "hcn",
        box(
          {
            style: { ...BOX_STYLE, "background-color": "#0099ff" },
            padding: PADDING,
          },
          td(
            { width: 64 },
            t.p(
              {
                style: {
                  margin: 0,
                  color: "#c0ffff",
                  "font-size": "11px",
                  "font-weight": 600,
                  "text-align": "start",
                },
              },
              "Booking#",
            ),
          ),
          t.h4(
            {
              style: {
                margin: 0,
                color: "#ffffff",
                "font-size": "16px",
                "font-weight": 700,
              },
            },
            $.var("hcn"),
          ),
          td({ width: 64 }),
        ),
        box(
          { style: BOX_STYLE, padding: PADDING },
          t.p(
            { style: P_STYLE },
            "Your confirmation number will be provided 24 hours before check-in.",
          ),
        ),
      ),
      box(
        { style: BOX_STYLE, padding: PADDING },
        t.p(
          { style: P_STYLE },
          "Greetings, An admin has rejected your Hotel booking on ",
          $.var("rejectedAt"),
        ),
      ),
    ),
  );
}

const PADDING = { top: 10, bottom: 10, start: 16, end: 16 } as const,
  BOX_STYLE = {
    "background-color": "#eaeef3",
    "border-radius": "6px",
  } as const,
  P_STYLE = {
    margin: 0,
    color: "#394f6c",
    "font-size": "12px",
    "font-weight": 500,
  } as const;
