// export interface Customer {
//   id: number;
//   customerCode: string;
//   phone: string;
//   cnic: string;
//   cnicExpiryDate: string;
//   cnicIssueDate: string | null;
//   name: string;
//   email: string;
// }

// Discount And Vouchers types and states
export interface DiscountAndVouchersTypes {
  // id: number; // Uncommented, assuming an id field exists
  // name: string; // Example field, you can adjust it to match your actual data
  // discountValue: number; // Example field for discount value
  // expiryDate: string; // Example field for expiry date
}

export interface DiscountAndVouchersState {
  vouchers: DiscountAndVouchersTypes[]; // An array of vouchers
  loading: boolean;
  error: string | null;
}

// Initial state for the discount and voucher slice
export const initialDiscountAndVoucherState: DiscountAndVouchersState = {
  vouchers: [],
  loading: false,
  error: null,
};
// Single Discount Voucher types and states
export interface SingleDiscountVoucherTypes {}

export interface SingleDiscountVoucherState {
  singleVoucher: SingleDiscountVoucherTypes; // An array of vouchers
  loading: boolean;
  error: string | null;
}

// Initial state for the discount and voucher slice
export const initialSingleDiscountVoucherState: SingleDiscountVoucherState = {
  singleVoucher: {},
  loading: false,
  error: null,
};

// Assign Single Discount Voucher types and states
export interface AssignSingleDiscountVoucherTypes {}

// Create Voucher types and states
export interface CreateVoucherTypes {}

// Update Voucher types and states
export interface UpdateVoucherTypes {}

// Delete Voucher types and states
export interface DeleteVoucherTypes {}

export interface VoucherType {
  mainType: string;
  subTypes: string[];
}

export const initialVoucherTypeState = {
  voucherTypes: [] as VoucherType[], // Initially, an empty array of voucher types
  loading: false, // Indicates the loading state for fetching voucher types
  error: null as string | null, // Stores error messages, if any
};
