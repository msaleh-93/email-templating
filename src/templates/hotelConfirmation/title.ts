import { $, t } from "~/lib/templateBuilder";
import { box, spacingY } from "../blocks";

export function title() {
  return $.with($.lookup(".", "event"), [
    $.if("adminRequest", [
      t.h2(
        {
          style: {
            margin: 0,
            color: "#003180",
            "font-size": "16px",
            "font-weight": 700,
            "text-align": "center",
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
            "text-align": "center",
          },
        },
        "Ends ",
        $.var("requestEndsAt"),
      ),
    ]),
    AUTO_OPTIONS.map(({ key, color, label }) =>
      $.if(key, [
        box(
          {
            width: null,
            padding: { top: 6, bottom: 6, start: 16, end: 16 },
            style: { "background-color": color, "border-radius": "6px" },
          },
          t.p(
            {
              style: {
                margin: 0,
                color: "#ffffff",
                "font-size": "15px",
                "font-weight": 700,
                "text-align": "center",
              },
            },
            label,
          ),
        ),
        spacingY(10),
        t.h3({ style: TITLE_STYLE }, "Hotel Request"),
        spacingY(10),
        t.p(
          {
            style: {
              margin: 0,
              color: "#00419c",
              "font-size": "14px",
              "font-weight": 500,
              "text-align": "center",
            },
          },
          "#",
          $.var("~requestId"),
        ),
      ]),
    ),
    $.if("bookingApproval", t.h2({ style: TITLE_STYLE }, "Hotel Confirmation")),
    $.if("bookingRejection", [
      box(
        { width: null },
        t.img({
          src: "https://cdn.flyakeed.com/flyakeed-emails/hotel-confirmation/ice-cream.png",
          alt: "ice-cream",
          height: 64,
        }),
      ),
      spacingY(10),
      t.h2({ style: TITLE_STYLE }, "Your Booking"),
      spacingY(10),
      t.p(
        {
          style: {
            margin: 0,
            color: "#e50000",
            "font-size": "14px",
            "font-weight": 700,
            "text-align": "center",
          },
        },
        "Has Been Rejected",
      ),
    ]),
  ]);
}

const AUTO_OPTIONS = [
    { key: "autoApprove", color: "#35a53f", label: "Auto-Approved" },
    { key: "autoReject", color: "#b32318", label: "Auto-Reject" },
  ],
  TITLE_STYLE = {
    margin: 0,
    color: "#00419C",
    "font-size": "18px",
    "font-weight": 700,
    "text-align": "center",
  } as const;
