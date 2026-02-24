import { $, t } from "~/lib/templateBuilder";
import { box, dividerH, gridCol, gridRow, spacingY } from "../blocks";
import { borderedBox } from "./borderedBox";

export function requestDetails() {
  return $.with(
    $.lookup(".", "scope"),
    $.if("B2B", [
      spacingY(16),
      borderedBox(
        gridCol(
          null,
          $.if(
            "policyViolations",
            [
              t.h3(
                {
                  style: {
                    margin: 0,
                    color: "#893606",
                    "font-size": "13px",
                    "font-weight": 600,
                    "text-align": "start",
                  },
                },
                "Request Details",
              ),
              $.each("policyViolations", [
                spacingY(8),
                gridRow(
                  null,
                  t.td(
                    { style: { padding: 0 }, width: 20 },
                    t.p(
                      {
                        style: {
                          margin: 0,
                          width: "14px",
                          height: "14px",
                          "background-color": "#893606",
                          color: "#ffffff",
                          "border-radius": "14px",
                          "font-size": "10px",
                          "font-weight": 500,
                        },
                      },
                      $.var("number"),
                    ),
                  ),
                  t.p(
                    {
                      style: {
                        margin: 0,
                        color: "#893606",
                        "font-size": "12px",
                        "font-weight": 500,
                        "text-align": "start",
                      },
                    },
                    $.var("value"),
                  ),
                ),
              ]),
            ],
            t.h3(
              {
                style: {
                  margin: 0,
                  color: "#079235",
                  "font-size": "12px",
                  "font-weight": 700,
                  "text-align": "start",
                },
              },
              "Business Trip Policy Compliant",
            ),
          ),
          spacingY(16),
          dividerH(),
          spacingY(16),
          $.if("employeeNode", [
            box(
              {
                style: {
                  "background-color": "#f6f9fc",
                  "border-radius": "8px",
                },
                padding: { top: 12, bottom: 12, start: 12, end: 12 },
              },
              gridCol(
                { gap: 4 },
                t.h3(
                  {
                    style: {
                      margin: 0,
                      color: "#3c516e",
                      "font-size": "12px",
                      "font-weight": 700,
                      "text-align": "start",
                    },
                  },
                  "Employee Node",
                ),
                t.p(
                  {
                    style: {
                      margin: 0,
                      color: "#3c516e",
                      "font-size": "12px",
                      "font-weight": 500,
                      "text-align": "start",
                    },
                  },
                  $.var("employeeNode"),
                ),
              ),
            ),
            spacingY(16),
            dividerH(),
          ]),
          t.tr(
            null,
            t.td(
              { style: { padding: 0 } },
              OPTIONS.map(({ key, label }) =>
                t.div(
                  {
                    class: "corp-booking",
                    style: {
                      "min-width": "98px",
                      "padding-inline-end": "32px",
                      "padding-top": "16px",
                    },
                  },
                  t.h4(
                    {
                      style: {
                        margin: 0,
                        "padding-bottom": "4px",
                        color: "#67788f",
                        "font-size": "12px",
                        "font-weight": 500,
                        "text-align": "start",
                      },
                    },
                    label,
                  ),
                  t.h3(
                    {
                      style: {
                        margin: 0,
                        color: "#384e6b",
                        "font-size": "14px",
                        "font-weight": 600,
                        "text-align": "start",
                      },
                    },
                    $.var(key),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    ]),
  );
}

const OPTIONS = [
  { key: "requestedVia", label: "Requested via" },
  { key: "purpose", label: "Purpose" },
  { key: "tag", label: "Tag" },
] as const;
