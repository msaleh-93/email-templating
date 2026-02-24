import { $, t } from "~/lib/templateBuilder";
import { gridCol, gridRow } from "../blocks/grid";

export function header() {
  return gridRow(
    { gap: "100%", height: 72 },
    t.a(
      {
        href: $.if(
          "homepageLink",
          $.var("homepageLink"),
          "https://flyakeed.com",
        ),
        target: "_blank",
      },
      t.img({
        src: $.with(
          $.lookup(".", "scope"),
          $.if(
            "B2B",
            "https://cdn.flyakeed.com/flyakeed-emails/hotel-confirmation/header-logo-corp.svg",
            "https://cdn.flyakeed.com/flyakeed-emails/hotel-confirmation/header-logo.svg",
          ),
        ),
        alt: "flyakeed-logo",
        height: 24,
      }),
    ),
    gridCol(
      { gap: 4, style: { "min-width": "128px" } },
      t.p(
        {
          style: {
            margin: 0,
            color: "#496997",
            "font-size": "12px",
            "font-weight": 500,
            "text-align": "end",
          },
        },
        $.var("issueDate"),
      ),
      $.if(
        "issueId",
        t.p(
          {
            style: {
              margin: 0,
              color: "#496997",
              "font-size": "12px",
              "font-weight": 500,
              "text-align": "end",
            },
          },
          "Akeed# ",
          $.var("issueId"),
        ),
      ),
    ),
  );
}
