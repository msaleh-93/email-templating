import { $, t } from "~/lib/templateBuilder";
import { box, dividerH, gridCol, gridRow, spacingY } from "../blocks";
import { borderedBox } from "./borderedBox";

export function requestDetails() {
  return $.with(
    $.lookup(".", "event"),
    $.unless("autoApprove", [
      spacingY(16),
      borderedBox(
        gridCol(
          null,
          $.with(
            $.alias("@root.scope", "s"),
            $.with(
              $.lookup("@root", "s"),
              $.if("B2B", [
                $.if(
                  "policyViolations",
                  [
                    t.h3({ style: VIOLATION_TITLE_STYLE }, "Policy Violations"),
                    $.each("policyViolations", [
                      spacingY(6),
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
                                "text-align": "center",
                              },
                            },
                            $.var("number"),
                          ),
                        ),
                        t.p(
                          {
                            style: VIOLATION_P_STYLE,
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
                $.if("employeeNote", [
                  spacingY(16),
                  dividerH(),
                  spacingY(16),
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
                        "Employee Note",
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
                        $.var("employeeNote"),
                      ),
                    ),
                  ),
                ]),
              ]),
            ),
          ),
          $.if("adminRequest", [
            spacingY(16),
            dividerH(),
            t.tr(
              null,
              t.td(
                { style: { padding: 0 } },
                REQUEST_OPTIONS.map(renderOptions),
              ),
            ),
          ]),
          $.if("autoReject", [
            spacingY(16),
            dividerH(),
            spacingY(16),
            t.h3({ style: VIOLATION_TITLE_STYLE }, "Reason of Rejection"),
            spacingY(6),
            t.p(
              { style: VIOLATION_P_STYLE },
              $.if(
                "reason",
                $.var("reason"),
                "Auto-rejected. Booking details did not match the policy tied this account.",
              ),
            ),
          ]),
          $.if("bookingApproval", [
            spacingY(16),
            dividerH(),
            t.tr(
              null,
              t.td(
                { style: { padding: 0 } },
                APPROVAL_OPTIONS.map(renderOptions),
              ),
            ),
          ]),
          $.if("bookingRejection", [
            spacingY(16),
            dividerH(),
            spacingY(16),
            t.h3({ style: VIOLATION_TITLE_STYLE }, "Reason of Rejection"),
            spacingY(6),
            t.p({ style: VIOLATION_P_STYLE }, $.var("reason")),
          ]),
        ),
      ),
    ]),
  );
}

const REQUEST_OPTIONS = [
    { key: "requestedVia", label: "Requested via", spacing: 32 },
    { key: "purpose", label: "Purpose", spacing: 32 },
    { key: "tag", label: "Tag", spacing: 32 },
  ] as const,
  APPROVAL_OPTIONS = [
    { key: "approvedAt", label: "Approved", spacing: 64 },
    { key: "approvedBy", label: "By", spacing: 64 },
  ] as const,
  VIOLATION_TITLE_STYLE = {
    margin: 0,
    color: "#893606",
    "font-size": "13px",
    "font-weight": 600,
    "text-align": "start",
  } as const,
  VIOLATION_P_STYLE = {
    margin: 0,
    color: "#893606",
    "font-size": "12px",
    "font-weight": 500,
    "text-align": "start",
  } as const;

function renderOptions({
  key,
  label,
  spacing,
}: {
  key: string;
  label: string;
  spacing: number;
}) {
  return t.div(
    {
      class: "corp-booking",
      style: {
        "min-width": "98px",
        "padding-inline-end": `${spacing}px`,
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
          "font-size": "13px",
          "font-weight": 600,
          "text-align": "start",
        },
      },
      $.var(key),
    ),
  );
}
