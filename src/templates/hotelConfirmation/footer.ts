import { $, t } from "~/lib/templateBuilder";
import { box } from "../blocks/box";
import { gridCol } from "../blocks/grid";

export function footer() {
  return [
    box(
      {
        style: { "background-color": "#003180", "max-width": "512px" },
        padding: { top: 32, bottom: 32, start: 32, end: 32 },
      },
      gridCol(
        { gap: 20 },
        box(
          { width: null },
          t.img({
            src: $.with(
              $.lookup(".", "scope"),
              $.if(
                "B2B",
                "https://cdn.flyakeed.com/flyakeed-emails/hotel-confirmation/footer-logo-corp.svg",
                "https://cdn.flyakeed.com/flyakeed-emails/hotel-confirmation/footer-logo.svg",
              ),
            ),
            height: 36,
            alt: "footer-logo",
          }),
        ),
        t.p(
          {
            style: {
              margin: 0,
              color: "#8adcff",
              "font-size": "10px",
              "font-weight": 500,
              "text-align": "center",
            },
          },
          $.if(
            "contactInfo",
            $.var("contactInfo"),
            "+966 920 000 091  Riyadh, Saudi Arabia",
          ),
        ),
      ),
    ),
    $.with(
      $.lookup(".", "scope"),
      $.if(
        "B2C",
        t.p(
          {
            style: {
              margin: 0,
              color: "#477199",
              "font-size": "12px",
              "font-weight": 500,
              "text-align": "center",
            },
          },
          "If you did not request this booking, please ignore this email",
        ),
      ),
    ),
  ];
}
