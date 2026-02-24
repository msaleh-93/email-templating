export type HotelEmail = {
  language: string;
  rtl?: boolean | null;
  homepageLink?: string | null;
  contactUsLink?: string | null;
  guests: Guest[];
  name: string;
  rooms: Room[];
  address: string;
  checkIn: DateTime;
  checkOut: DateTime;
  cancellationPolicy?: string | null;
  checkInPolicy?: string | null;
  specialInstructions?: string | null;
  priceSummary: PriceSummary;
  dueAtProperty?: boolean | null;
  contactInfo?: string | null;
} & (B2CBookingApproval | B2BAdminRequest);

interface B2CBookingApproval extends B2CScope, BookingApprovalEvent {}
interface B2BAdminRequest extends B2BScope, AdminRequestEvent {}

interface B2BScope {
  scope: "B2B";
  B2B: B2B;
}

interface B2CScope {
  scope: "B2C";
  B2C: B2C;
}

interface BookingApprovalEvent {
  event: "bookingApproval";
  adminRequest?: AdminRequest | null;
  bookingApproval: BookingApproval;
}

interface AdminRequestEvent {
  event: "adminRequest";
  adminRequest: AdminRequest;
  bookingApproval?: BookingApproval | null;
}

interface B2B {
  B2B: true;
  policyViolations?: PolicyViolation[] | null;
  employeeNode?: string | null;
  requestedVia: string;
  purpose: string;
  tag: string;
}

interface B2C {
  B2C: true;
}

interface AdminRequest {
  adminRequest: true;
  hcn?: string | null;
  requestEndsAt: string;
  requestPreviewLink: string;
  approvalLink: string;
  rejectionLink: string;
}

interface BookingApproval {
  bookingApproval: true;
  hcn?: string | null;
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
