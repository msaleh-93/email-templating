import { t } from "~/lib/templateBuilder";
import { gridRow } from "../blocks";

export function contactUs() {
  return gridRow(
    { gap: 6, width: null },
    t.img({
      src: "https://cdn.flyakeed.com/flyakeed-emails/flight-confirmation/call.svg",
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
  );
}
