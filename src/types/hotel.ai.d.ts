export type HotelEmail = {
  language: string;
  rtl?: boolean;
  homepageLink?: string;
  contactUsLink?: string;
  subjectLine: string;
  issueDate: string;
  issueId: string;
  hotelName: string;
  hotelAddress: string;
  hotelAddressMapLink: string;
  checkInDate: string;
  checkInTime?: string | null;
  checkOutDate: string;
  checkOutTime?: string | null;
  confirmationNumber?: string | null;
  rooms: Room[];
  guestsSummary: string;
  guests: Guest[];
  cancellationPolicy: string;
  checkInPolicies?: string | null;
  specialInstructions?: string | null;
  contactInfo: string;
} & (B2CBooking | B2BBooking);

interface B2CBooking extends B2CScope, BookingEvent {}

interface B2BBooking extends B2BScope, BookingEvent {}

interface BookingEvent {
  event:
    | "bookingConfirmation"
    | "adminRequest"
    | "pendingBooking"
    | "bookingApproval"
    | "bookingRejection";
  adminRequest?: AdminRequest | null;
  pendingBooking?: PendingBooking | null;
  bookingApproval?: BookingApproval | null;
  bookingRejection?: BookingRejection | null;
  priceSummary: PriceSummary;
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
  policyViolations?: PolicyViolation[];
  requestedVia?: string;
  purpose?: string;
  tag?: string;
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

interface PendingBooking {
  pendingBooking: true;
  requestEndsAt: string;
}

interface BookingApproval {
  bookingApproval: true;
}

interface BookingRejection {
  bookingRejection: true;
  reason: string;
  reBookingLink: string;
}

interface PolicyViolation {
  number: number;
  value: string;
}

interface Room {
  roomTitle: string;
  numberOfNights: number;
  numberOfGuests: number;
  roomDescription?: string | null;
}

interface Guest {
  name: string;
  type: string;
}

type PriceSummary = {
  basePrice: string;
  taxAndFees: string;
  discount?: string | null;
  totalPrice: string;
  currencyIconSrc?: string | null;
  currency?: string | null;
  taxDisclaimer: string;
};
