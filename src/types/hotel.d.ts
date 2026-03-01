export type HotelEmail = {
  language: string;
  title: string;
  rtl?: boolean | null;
  homepageLink?: string | null;
  contactUsLink?: string | null;
  issueDate?: string | null;
  issueId?: string | null;
  hcn?: string | null;
  guests: Guest[];
  name: string;
  rooms: Room[];
  address: string;
  mapLink: string;
  phoneNumber?: string | null;
  checkIn: DateTime;
  checkOut: DateTime;
  cancellationPolicy?: string | null;
  checkInPolicy?: string | null;
  specialInstructions?: string | null;
  priceSummary: PriceSummary;
  dueAtProperty?: DueAtProperty | null;
  contactInfo?: string | null;
} & (
  | B2BAdminRequest
  | B2BAutoApprove
  | B2BAutoReject
  | B2BBookingApproval
  | B2BBookingRejection
  | B2CBookingApproval
);

interface B2BAdminRequest extends B2BScope, AdminRequestEvent {}
interface B2BAutoApprove extends B2BScope, AutoApproveEvent {}
interface B2BAutoReject extends B2BScope, AutoRejectEvent {}
interface B2BBookingApproval extends B2BScope, BookingApprovalEvent {}
interface B2BBookingRejection extends B2BScope, BookingRejectionEvent {}
interface B2CBookingApproval extends B2CScope, BookingApprovalEvent {}

interface B2BScope {
  scope: "B2B";
  B2B: B2B;
}

interface B2CScope {
  scope: "B2C";
  B2C: B2C;
}
interface AdminRequestEvent {
  event: "adminRequest";
  adminRequest: AdminRequest;
  autoApprove?: AutoApprove | null;
  autoReject?: AutoReject | null;
  bookingApproval?: BookingApproval | null;
  bookingRejection?: BookingRejection | null;
}

interface AutoApproveEvent {
  event: "autoApprove";
  adminRequest?: AdminRequest | null;
  autoApprove: AutoApprove;
  autoReject?: AutoReject | null;
  bookingApproval?: BookingApproval | null;
  bookingRejection?: BookingRejection | null;
}

interface AutoRejectEvent {
  event: "autoReject";
  adminRequest?: AdminRequest | null;
  autoApprove?: AutoApprove | null;
  autoReject: AutoReject;
  bookingApproval?: BookingApproval | null;
  bookingRejection?: BookingRejection | null;
}

interface BookingApprovalEvent {
  event: "bookingApproval";
  adminRequest?: AdminRequest | null;
  autoApprove?: AutoApprove | null;
  autoReject?: AutoReject | null;
  bookingApproval: BookingApproval;
  bookingRejection?: BookingRejection | null;
}

interface BookingRejectionEvent {
  event: "bookingRejection";
  adminRequest?: AdminRequest | null;
  autoApprove?: AutoApprove | null;
  autoReject?: AutoReject | null;
  bookingApproval?: BookingApproval | null;
  bookingRejection: BookingRejection;
}

interface B2B {
  B2B: true;
  policyViolations?: PolicyViolation[] | null;
  employeeNote?: string | null;
}

interface B2C {
  B2C: true;
}

interface AdminRequest {
  adminRequest: true;
  requestEndsAt: string;
  approvalLink: string;
  rejectionLink: string;
  requestedVia: string;
  purpose: string;
  tag: string;
}

interface AutoApprove {
  autoApprove: true;
  requestId?: string | null;
}

interface AutoReject {
  autoReject: true;
  requestId?: string | null;
  reason?: string | null;
}

interface BookingApproval {
  bookingApproval: true;
  approvedAt?: string | null;
  approvedBy?: string | null;
}

interface BookingRejection {
  bookingRejection: true;
  reason: string;
  rejectedAt: string;
}

interface PolicyViolation {
  number: number;
  value: string;
}

interface Guest {
  name: string;
  type: string;
}

interface Room {
  name: string;
  nights: Count;
  adults: Count;
  children?: Count | null;
  description?: string | null;
}

interface Count {
  value: number;
  plural?: boolean | null;
}

interface DateTime {
  date: string;
  time: string;
}

interface PriceSummary {
  totalPrice: string;
  currencyIconSrc?: string | null;
  currency?: string | null;
  details: PriceDetails[];
}

interface PriceDetails {
  label: string;
  value: string;
  atProperty?: boolean | null;
  subtracted?: boolean | null;
}

interface DueAtProperty {
  original?: {
    price: string;
    currency: string;
    currencyIconSrc?: string | null;
  };
  target: {
    price: string;
    currency?: string;
    currencyIconSrc?: string | null;
  } | null;
}
