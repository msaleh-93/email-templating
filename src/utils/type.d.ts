export type FlightEmail = {
  language: string;
  rtl?: boolean;
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

interface B2BPendingTrip extends B2BScope, PendingTripEvent {}

interface B2BTripApproval extends B2BScope, TripApprovalEvent {}

interface B2BTripRejection extends B2BScope, TripRejectionEvent {}

interface AdminRequestEvent {
  event: "adminRequest";
  adminRequest: AdminRequest;
  pendingTrip?: PendingTrip | null;
  tripApproval?: TripApproval | null;
  tripRejection?: TripRejection | null;
  priceSummary: PriceSummary;
}

interface PendingTripEvent {
  event: "pendingTrip";
  adminRequest?: AdminRequest | null;
  pendingTrip: PendingTrip;
  tripApproval?: TripApproval | null;
  tripRejection?: TripRejection | null;
  priceSummary: PriceSummary;
}

interface TripApprovalEvent {
  event: "tripApproval";
  adminRequest?: AdminRequest | null;
  pendingTrip?: PendingTrip | null;
  tripApproval: TripApproval;
  tripRejection?: TripRejection | null;
  priceSummary: PriceSummary;
}

interface TripRejectionEvent {
  event: "tripRejection";
  adminRequest?: AdminRequest | null;
  pendingTrip?: PendingTrip | null;
  tripApproval?: TripApproval | null;
  tripRejection: TripRejection;
  priceSummary: Pick<
    PriceSummary,
    "totalPrice" | "currencyIconSrc" | "currency"
  >;
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
}

interface PendingTrip {
  pendingTrip: true;
  requestEndsAt: string;
}

interface TripApproval {
  tripApproval: true;
  pnr: string;
}

interface TripRejection {
  tripRejection: true;
  reason: string;
  reBookingLink: string;
}

interface PriceSummary {
  basePrice: string;
  serviceFee: string;
  vat: string;
  totalPrice: string;
  currencyIconSrc?: string | null;
  currency?: string | null;
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
