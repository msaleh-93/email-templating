import { $, t } from "~/lib/templateBuilder";
import { box } from "./box";
import { gridCol } from "./grid";

export function doc(...children: any[]) {
  return t.html(
    {
      "x-area": "doc",
      lang: $.var("language"),
      dir: $.if("rtl", "rtl", "ltr"),
      xmlns: "urn:schemas-microsoft-com:vml",
      "xmlns:o": "urn:schemas-microsoft-com:office:office",
    },
    t.head(
      null,
      t.meta({ charset: "utf-8" }),
      t.meta({ "http:equiv": "X-UA-Compatible", content: "IE=edge" }),
      t.meta({
        name: "viewport",
        content: "width=device-width, initial-scale=1, user-scalable=yes",
      }),
      t.meta({
        name: "format-detection",
        content: "telephone=no, date=no, address=no, email=no, url=no",
      }),
      t.meta({ name: "x-apple-disable-message-reformatting" }),
      t.meta({ name: "color-scheme", content: "light" }),
      t.meta({ name: "supported-color-schemes", content: "light" }),
      t.title(null, $.var("title")),
      "<!--[if mso]>",
      t.noscript(
        null,
        t.xml!(
          null,
          t.o!(
            null,
            t.OfficeDocumentSettings!(
              null,
              t.o!(null, t.PixelsPerInch!(null, "96")),
            ),
          ),
        ),
      ),
      "<![endif]-->",
      t.style(
        null,
        `:root {
      color-scheme: light;
      supported-color-schemes: light;
    }

    ul {
      padding: 0 0 0 16px;
      margin: 0;
    }

    @media screen and (min-width: 512px) {
      .side-by-side {
        display: inline-block;
      }

      .mobile-only {
        display: none;
      }
    }

    @media screen and (max-width: 512px) {
        .desktop-only {
          display: none;
        }
    }`,
      ),
    ),
    t.body(
      {
        "xml:lang": $.var("language"),
        style: {
          "background-color": "#cce6ff",
          "text-align": "center",
          "font-family": "inter, system-ui, sans-serif",
          "font-size": "16px",
          padding: 0,
          margin: 0,
        },
      },
      box(
        {
          padding: { top: 48, bottom: 48, start: 8, end: 8 },
          lang: $.var("language"),
          dir: $.if("rtl", "rtl", "ltr"),
          role: "presentation",
          "aria-roledescription": "email",
          "aria-label": $.var("subjectLine"),
        },
        gridCol({ gap: 16 }, children),
      ),
    ),
  );
}
