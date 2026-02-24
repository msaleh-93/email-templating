import { $, t } from "~/lib/templateBuilder";
import { box, gridRow, spacingY } from "../blocks";

export function actions() {
  return $.with(
    $.lookup(".", "event"),
    $.if("adminRequest", [
      spacingY(32),
      gridRow(
        { width: null, gap: 10 },
        OPTIONS.map(({ key, label, color }) =>
          t.a(
            {
              style: { "text-decoration": "none" },
              target: "_blank",
              href: $.var(key),
            },
            box(
              {
                width: 128,
                height: 37,
                padding: { top: 10, bottom: 10, start: 22, end: 22 },
                style: {
                  "background-color": color,
                  "border-radius": "36px",
                  color: "#ffffff",
                  "font-size": "14px",
                  "font-weight": 700,
                },
              },
              t.p({ style: { margin: 0 } }, label),
            ),
          ),
        ),
      ),
      spacingY(16),
    ]),
  );
}

const OPTIONS = [
  { key: "rejectionLink", label: "Reject", color: "#b32318" },
  { key: "approvalLink", label: "Approve", color: "#079235" },
];
