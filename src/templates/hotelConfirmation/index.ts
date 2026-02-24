import { dividerH, doc, main, spacingY } from "../blocks";
import { actions } from "./actions";
import { address } from "./address";
import { bookedHotel } from "./bookedHotel";
import { checkInOut } from "./checkInOut";
import { confirmationNumber } from "./confirmationNumber";
import { contactUs } from "./contactUs";
import { dueAtProperty } from "./dueAtProperty";
import { footer } from "./footer";
import { guests } from "./guests";
import { header } from "./header";
import { phoneNumber } from "./phoneNumber";
import { policies } from "./policies";
import { priceSummary } from "./priceSummary";
import { requestDetails } from "./requestDetails";
import { rooms } from "./rooms";
import { title } from "./title";

export default { filename: "hotel-booking-confirmation.hbs", template };

function template() {
  return doc(
    main(
      header(),
      dividerH(),
      spacingY(26),
      title(),
      spacingY(16),
      guests(),
      spacingY(14),
      confirmationNumber(),
      spacingY(20),
      bookedHotel(),
      spacingY(16),
      dividerH(),
      spacingY(16),
      rooms(),
      spacingY(30),
      address(),
      phoneNumber(),
      spacingY(8),
      checkInOut(),
      policies(),
      requestDetails(),
      priceSummary(),
      dueAtProperty(),
      actions(),
      spacingY(16),
      contactUs(),
    ),
    footer(),
  );
}
