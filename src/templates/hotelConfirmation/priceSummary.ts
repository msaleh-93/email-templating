import { $, t } from "~/lib/templateBuilder";
import { dividerH, gridCol, gridRow, spacingY } from "../blocks";
import { borderedBox } from "./borderedBox";

export function priceSummary() {
  return $.with("priceSummary", [
    spacingY(16),
    borderedBox(
      gridCol(
        null,
        gridCol(
          null,
          $.each("details", [
            t.tr(
              {
                style: { color: $.if("subtracted", "#079235", "#212f4a") },
              },
              t.td(
                { style: { padding: 0 } },
                t.h3(
                  {
                    style: {
                      margin: 0,
                      "font-size": "12px",
                      "font-weight": 500,
                      "text-align": "start",
                    },
                  },
                  $.var("label"),
                  $.if(
                    "atProperty",
                    t.span(
                      {
                        style: {
                          "padding-inline-start": "6px",
                          color: "#67788f",
                          "font-size": "12px",
                          "font-weight": 500,
                          "font-style": "italic",
                          "text-align": "start",
                        },
                      },
                      "at property",
                    ),
                  ),
                ),
              ),
              t.td(
                { style: { padding: 0, "min-width": "72px" } },
                t.p(
                  {
                    style: {
                      margin: 0,
                      "font-size": "12px",
                      "font-weight": 500,
                      "text-align": "end",
                    },
                  },
                  t.img({
                    src: $.if(
                      "currencyIconSrc",
                      $.var("currencyIconSrc"),
                      "https://cdn.flyakeed.com/flyakeed-emails/hotel-confirmation/sar.svg",
                    ),
                    height: 11,
                    alt: $.if("currency", $.var("currency"), "SAR"),
                    style: {
                      filter: $.if(
                        "subtracted",
                        "invert(42%) sepia(93%) saturate(6462%) hue-rotate(139deg) brightness(99%) contrast(94%)",
                        "none",
                      ),
                    },
                  }),
                  $.var("value"),
                ),
              ),
            ),
            spacingY(8),
          ]),
        ),
        spacingY(4),
        dividerH(),
        spacingY(10),
        gridRow(
          { gap: 16 },
          gridCol(
            { gap: 4 },
            t.h3(
              {
                style: {
                  margin: 0,
                  color: "#212f4a",
                  "font-size": "12px",
                  "font-weight": 500,
                  "text-align": "start",
                },
              },
              "Total Price",
            ),
            t.p(
              {
                style: {
                  margin: 0,
                  color: "#4a668c",
                  "font-size": "10px",
                  "font-weight": 500,
                  "text-align": "start",
                },
              },
              "Includes VAT and Fees",
            ),
          ),
          t.p(
            {
              style: {
                margin: 0,
                color: "#212f4a",
                "font-size": "14px",
                "font-weight": 600,
                "text-align": "end",
              },
            },
            t.img({
              src: $.if(
                "currencyIconSrc",
                $.var("currencyIconSrc"),
                "https://cdn.flyakeed.com/flyakeed-emails/hotel-confirmation/sar.svg",
              ),
              height: 11,
              alt: $.if("currency", $.var("currency"), "SAR"),
            }),
            $.var("totalPrice"),
          ),
        ),
      ),
    ),
    spacingY(12),
    t.p(
      {
        style: {
          margin: 0,
          color: "#4a668c",
          "font-size": "10px",
          "font-weight": 400,
          "font-style": "italic",
          "text-align": "start",
          "line-height": "145.4%",
        },
      },
      "* The taxes are tax recovery charges paid to vendors (e.g., hotels); for details, please see our Terms of Use. Service fees are retained as compensation in servicing your booking and may include fees charged by vendors.",
    ),
  ]);
}
