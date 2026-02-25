import { $, t } from "~/lib/templateBuilder";
import { spacingY } from "../blocks";
import { borderedBox } from "./borderedBox";

export function dueAtProperty() {
  return $.with("dueAtProperty", [
    spacingY(16),
    borderedBox(
      t.td(
        { style: { padding: 0 } },
        t.div(
          { class: "corp-booking", style: { "max-width": "320px" } },
          t.h3(
            {
              style: {
                margin: 0,
                color: "#3d526e",
                "font-size": "12px",
                "font-weight": 600,
                "text-align": "start",
              },
            },
            "Due at property",
          ),
          $.if(
            "original",
            t.p(
              {
                style: {
                  margin: 0,
                  "padding-top": "4px",
                  color: "#4a668c",
                  "font-size": "10px",
                  "font-weight": 400,
                  "text-align": "start",
                  "line-height": "145.4%",
                },
              },
              t.span(
                null,
                $.if("target.currency", $.var("target.currency"), "SAR (SAR)"),
              ),
              " amounts due at the property are estimates based on current exchange rates, which may vary at the time of travel. You will pay these amounts in ",
              $.var("original.currency~"),
              ". Your card issuer may charge a foreign transaction fee.",
            ),
          ),
        ),
        t.div(
          { class: "corp-booking" },
          t.p(
            {
              style: {
                margin: 0,
                "padding-top": "4px",
                "font-size": "12px",
                "text-align": "end",
              },
            },
            $.if(
              "original",
              t.span(
                { style: { color: "#4a668c", "font-weight": 500 } },
                "Approx",
              ),
            ),
            $.with(
              "target",
              t.span(
                { style: { color: "#0763df", "font-weight": 700 } },
                t.img({
                  src: $.if(
                    "currencyIconSrc",
                    $.var("currencyIconSrc"),
                    "https://cdn.flyakeed.com/flyakeed-emails/hotel-confirmation/sar.svg",
                  ),
                  height: 11,
                  alt: $.if("currency", $.var("currency"), "SAR"),
                  style: {
                    filter:
                      "invert(28%) sepia(53%) saturate(6026%) hue-rotate(208deg) brightness(92%) contrast(95%)",
                  },
                }),
                $.var("price"),
              ),
            ),
          ),
          $.with(
            "original",
            t.p(
              {
                style: {
                  margin: 0,
                  "padding-top": "4px",
                  color: "#4a668c",
                  "font-size": "12px",
                  "font-weight": 500,
                  "text-align": "end",
                },
              },
              "(",
              $.if(
                "currencyIconSrc",
                t.img({
                  src: $.var("currencyIconSrc"),
                  height: 11,
                  alt: $.var("currency"),
                }),
              ),
              $.var("~price~"),
              ")",
            ),
          ),
        ),
      ),
    ),
  ]);
}
