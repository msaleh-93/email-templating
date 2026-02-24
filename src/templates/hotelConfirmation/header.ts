import { $, t } from "~/lib/templateBuilder";
import { gridRow } from "../blocks/grid";

export function header() {
  return gridRow(
    { gap: "100%", height: 72 },
    t.a(
      {
        href: $.if(
          "homepageLink",
          $.var("homepageLink"),
          "https://flyakeed.com",
        ),
        target: "_blank",
      },
      t.img({
        src: $.with(
          $.lookup(".", "scope"),
          $.if(
            "B2B",
            "https://cdn.flyakeed.com/flyakeed-emails/flight-confirmation/header-logo-corp.svg",
            "https://cdn.flyakeed.com/flyakeed-emails/flight-confirmation/header-logo.svg",
          ),
        ),
        alt: "flyakeed-logo",
        height: 24,
      }),
    ),
    /*
<td style="min-width: 72px; padding: 0;">
  <table width="100%" align="center" border="0"
    style="border-collapse: collapse;">
    <tbody>
      <tr>
        <td style="padding: 0;">
          <p
            style="margin: 0; font-size: 12px; font-weight: 500; text-align: end; color: #496997;">
            {{issueDate}}
          </p>
        </td>
      </tr>
      <tr height="4">
        <td style="padding: 0;"></td>
      </tr>
      <tr> 
        <td style="padding: 0;">
          <p
            style="margin: 0; font-size: 12px; font-weight: 500; text-align: end; color: #496997;">
            ID:{{issueId}}
          </p>
        </td>
      </tr>
      <tr height="4">
        <td style="padding: 0;"></td>
      </tr>
    </tbody>
  </table>
</td>
*/
    t.td({ style: { "min-width": "72px", padding: 0 } }),
  );
}
