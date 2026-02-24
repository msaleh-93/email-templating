import { $, t } from "~/lib/templateBuilder";
import { box, gridRow } from "../blocks";

export function contactUs() {
  return box(
    { width: null },
    t.a(
      {
        width: 128,
        style: { "text-decoration": "none", "min-width": "128px" },
        href: $.if(
          "contactUsLink",
          $.var("contactUsLink"),
          "https://flyakeed.com/contact.html",
        ),
        target: "_blank",
      },
      gridRow(
        { gap: 6 },
        t.img({
          src: "https://cdn.flyakeed.com/flyakeed-emails/hotel-confirmation/call.svg",
          height: 20,
          alt: "call",
        }),
        t.p(
          {
            style: {
              margin: 0,
              color: "#196dfb",
              "font-size": "14px",
              "font-weight": 700,
            },
          },
          "Need Help?",
        ),
      ),
    ),
  );
}
