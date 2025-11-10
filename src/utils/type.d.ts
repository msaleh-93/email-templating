export type RootObject = {
  language: string;
  rtl: boolean;
  headerLogoSrc: string;
  footerLogoSrc: string;
  plainIconSrc: string;
  callIconSrc: string;
  homepageLink: string;
  contactUsLink: string;
  subjectLine: string;
  issueDate: string;
  issueId: string;
  steps: (Flight | Layover)[];
  passengersSummary: string;
  passengers: Passenger[];
  basePrice: string;
  serviceFee: string;
  vat: string;
  totalPrice: string;
  currency: string;
  contactInfo: string;
} & (
  | (CorpBooking & (RequestEmail | ConfirmationEmail))
  | ({ corpBooking?: false } & ConfirmationEmail)
) &
  (
    | { multiCity: true; roundTrip?: false }
    | ({ multiCity?: false } & (RoundTrip | { roundTrip?: false }))
  );

interface RoundTrip {
  roundTrip: true;
  arrowRightIconSrc: string;
  hotelBannerImageSrc: string;
  hotelBookingLink: string;
  hotelCity: string;
}

interface CorpBooking {
  corpBooking: true;
  policyViolations: PolicyViolation[];
  requestedVia: string;
  purpose: string;
  tag: string;
}

interface RequestEmail {
  adminEmail: true;
  requestEndsAt: string;
  pendingRequestLink: string;
  approvalLink: string;
  rejectionLink: string;
}

type ConfirmationEmail = { adminEmail?: false; pnr: string } & (
  | { approved: true; approvalIconSrc: string }
  | { approved: false; rejectionIconSrc: string }
);

interface PolicyViolation {
  number: number;
  value: string;
}

interface Passenger {
  imageSrc?: string | null;
  label: string;
  name: string;
  seat: string;
  role: string;
}

interface Flight {
  isFlight: true;
  isLayover?: false;
  airline: string;
  plain: string;
  class: string;
  departure: FlightEvent;
  arrival: FlightEvent;
  duration: string;
}

interface Layover {
  isLayover: true;
  isFlight?: false;
  duration: string;
  location: string;
}

interface FlightEvent {
  city: string;
  airport: string;
  date: string;
  time: string;
}
