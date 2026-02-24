import { $, t } from "~/lib/templateBuilder";
import { spacingX, spacingY } from "../blocks";
import { grayBox } from "./grayBox";

export function phoneNumber() {
  return $.if("phoneNumber", [
    spacingY(8),
    grayBox(
      t.td(
        { style: { padding: 0, "max-width": "16px" }, width: 16 },
        t.img({
          src: "https://cdn.flyakeed.com/flyakeed-emails/hotel-confirmation/phone.svg",
          height: 15,
          alt: "phone",
        }),
      ),
      spacingX(6),
      t.p(
        {
          style: {
            margin: 0,
            color: "#3a4f6d",
            "font-size": "12px",
            "font-weight": 500,
            "text-align": "start",
            "line-height": "145.4%",
          },
        },
        $.var("phoneNumber"),
      ),
    ),
  ]);
}
