import { $, t } from "~/lib/templateBuilder";
import { spacingY } from "../blocks";

export function title() {
  return $.with($.lookup(".", "event"), [
    $.if(
      "bookingApproval",
      t.h3(
        {
          style: {
            color: "#00419C",
            "font-size": "18px",
            "font-weight": 700,
            margin: 0,
          },
        },
        "Hotel Confirmation",
      ),
    ),
    $.if("adminRequest", [
      t.h3(
        {
          style: {
            margin: 0,
            color: "#003180",
            "font-size": "16px",
            "font-weight": 700,
          },
        },
        "Hotel Request",
      ),
      spacingY(8),
      t.p(
        {
          style: {
            margin: 0,
            color: "#bf1a0d",
            "font-size": "12px",
            "font-weight": 500,
          },
        },
        "Ends ",
        $.var("requestEndsAt"),
      ),
    ]),
  ]);
}
