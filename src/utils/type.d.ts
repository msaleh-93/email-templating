export type NewRootObject = {
  language: string;
  rtl?: boolean;
  headerLogoSrc: string;
  footerLogoSrc: string;
  plainIconSrc: string;
  clockIconSrc: string;
  callIconSrc: string;
  homepageLink?: string;
  contactUsLink: string;
  subjectLine: string;
  issueDate: string;
  issueId: string;
  steps: (Flight | Layover)[];
  passengersSummary: string;
  passengers: Passenger[];
  contactInfo: string;
} & Trip &
  (B2CTripApproval | B2BAdminRequest | B2BTripApproval | B2BTripRejection);

interface B2CTripApproval extends B2CScope, TripApprovalEvent {}

interface B2BAdminRequest extends B2BScope, AdminRequestEvent {}

interface B2BTripApproval extends B2BScope, TripApprovalEvent {}

interface B2BTripRejection extends B2BScope, TripRejectionEvent {}

interface AdminRequestEvent {
  event: "adminRequest";
  adminRequest: AdminRequest;
  tripApproval?: TripApproval | null;
  tripRejection?: TripRejection | null;
}

interface TripApprovalEvent {
  event: "tripApproval";
  adminRequest?: AdminRequest | null;
  tripApproval: TripApproval;
  tripRejection?: TripRejection | null;
}

interface TripRejectionEvent {
  event: "tripRejection";
  adminRequest?: AdminRequest | null;
  tripApproval?: TripApproval | null;
  tripRejection: TripRejection;
}

interface B2BScope {
  scope: "B2B";
  B2B: B2B;
}

interface B2CScope {
  scope: "B2C";
  B2C: B2C;
}

interface B2B {
  B2B: true;
  headerLogoSrc?: string;
  footerLogoSrc?: string;
  policyViolations: PolicyViolation[];
  requestedVia: string;
  purpose: string;
  tag: string;
}

interface B2C {
  B2C: true;
  receiptId: string;
  paymentMethod: string;
}

interface AdminRequest {
  adminRequest: true;
  requestEndsAt: string;
  requestPreviewLink: string;
  approvalLink: string;
  rejectionLink: string;
  priceSummary: PriceSummary;
}

interface TripApproval {
  tripApproval: true;
  iconSrc: string;
  pnr: string;
  priceSummary: PriceSummary;
}

interface TripRejection extends Pick<PriceSummary, "totalPrice" | "currency"> {
  tripRejection: true;
  reason: string;
  reBookingLink: string;
  priceSummary?: false;
}

interface PriceSummary {
  basePrice: string;
  serviceFee: string;
  vat: string;
  totalPrice: string;
  currency: string;
}

type Trip =
  | {
      trip: "multiCityTrip";
      multiCityTrip: MultiCityTrip;
      roundTrip?: RoundTrip | null;
      oneWayTrip?: OneWayTrip | null;
    }
  | {
      trip: "roundTrip";
      multiCityTrip?: MultiCityTrip | null;
      roundTrip: RoundTrip;
      oneWayTrip?: OneWayTrip | null;
    }
  | {
      trip: "oneWayTrip";
      multiCityTrip?: MultiCityTrip | null;
      roundTrip?: RoundTrip | null;
      oneWayTrip: OneWayTrip;
    };

interface MultiCityTrip {
  multiCityTrip: true;
  steps: (Flight | Layover)[];
}

interface RoundTrip {
  roundTrip: true;
  steps: (Flight | Layover)[];
  arrowRightIconSrc: string;
  hotelBannerImageSrc: string;
  hotelBookingLink: string;
  hotelCity: string;
}

interface OneWayTrip {
  oneWayTrip: true;
  steps: (Flight | Layover)[];
}

interface PolicyViolation {
  number: number;
  value: string;
}

interface Passenger {
  imageSrc?: string | null;
  label: string;
  name: string;
  grade: string;
  team: string;
}

interface Flight {
  isFlight: true;
  isLayover?: false;
  airline: string;
  plain: string;
  class: string;
  departure: Destination;
  arrival: Destination;
  duration: string;
}

interface Layover {
  isLayover: true;
  isFlight?: false;
  duration: string;
  location: string;
}

interface Destination {
  city: string;
  airport: string;
  date: string;
  time: string;
}
