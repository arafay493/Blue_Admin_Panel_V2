// Interfaces for CheckAdminWallet API response

export interface CashDetails {
  gasPrice: number;
  securityDeposit: number;
  deliveryCharges: number;
  urgentDeliveryCharges: number;
  tax: number;
  discount: number;
}

export interface CheckAdminWalletData {
  totalCash: number;
  stockId: number[];
  cashDetails: CashDetails;
}

export interface CheckAdminWalletApiResponse {
  statusCode: number;
  succeeded: boolean;
  message: string;
  errors: string[];
  data: CheckAdminWalletData;
}

export interface CheckAdminWalletState {
  checkAdminWallet: CheckAdminWalletApiResponse | null;
  loading: boolean;
  error: string | null;
}

export const initialCheckAdminWalletState: CheckAdminWalletState = {
  checkAdminWallet: null,
  loading: false,
  error: null,
};

export interface OrdersCashDetails {
  orderId: number;
  isUrgent: boolean;
  qty: number;
  invoiceType: string;
  total: number;
  onlinePaidAmount: number;
  gasPrice: number;
  securityDeposit: number;
  deliveryCharges: number;
  urgentDeliveryCharges: number;
  tax: number;
  discount: number;
}

export interface CashReceiveableData {
  documentId: number;
  totalOrderNumbers: number;
  total: number;
  gasPrice: number;
  onlinePaidAmount: number;
  securityDeposit: number;
  deliveryCharges: number;
  urgentDeliveryCharges: number;
  tax: number;
  discount: number;
  ordersCashDetails: OrdersCashDetails[];
}

export interface CashReceivableApiResponse {
  statusCode: number;
  succeeded: boolean;
  message: string;
  errors: string[];
  data: CashReceiveableData;
}

export interface CashReceivableState {
  cashReceivable: CashReceivableApiResponse | null;
  loading: boolean;
  error: string | null;
}

export const initialCashReceivableState: CashReceivableState = {
  cashReceivable: null,
  loading: false,
  error: null,
};

// Define the structure for individual order details
export interface ConsignmentOrderDetails {
  orderId: number;
  isUrgent: boolean;
  qty: number;
  invoiceType: string;
  total: number;
  onlinePaidAmount: number;
  gasPrice: number;
  securityDeposit: number;
  deliveryCharges: number;
  urgentDeliveryCharges: number;
  tax: number;
  discount: number;
}

// Define the structure for the main consignment data
export interface ConsignmentDetailsData {
  documentId: number;
  totalOrderNumbers: number;
  total: number;
  gasPrice: number;
  onlinePaidAmount: number;
  securityDeposit: number;
  deliveryCharges: number;
  urgentDeliveryCharges: number;
  tax: number;
  discount: number;
  ordersCashDetails: ConsignmentOrderDetails[];
}

// Define the API response structure
export interface ConsignmentDetailsApiResponse {
  statusCode: number;
  succeeded: boolean;
  message: string;
  errors: string[];
  data: ConsignmentDetailsData;
}

// Define the initial state for managing the consignment details in Redux
export interface ConsignmentDetailsState {
  consignmentDetails: ConsignmentDetailsApiResponse | null;
  loading: boolean;
  error: string | null;
}

export const initialConsignmentDetailsState: ConsignmentDetailsState = {
  consignmentDetails: null,
  loading: false,
  error: null,
};
export interface ReceiveCashApiResponse {
  statusCode: number;
  succeeded: boolean;
  message: string;
  errors: string[];
  data: boolean;
}

// Slice State Structure
export interface ReceiveCashState {
  loading: boolean;
  data: boolean | null;
  error: string | null;
  message: string | null;
}

// Initial State
export const initialReceiveCashState: ReceiveCashState = {
  loading: false,
  data: null,
  error: null,
  message: null,
};

// Type for individual order details
export interface OrderCashDetail {
  orderId: number;
  customerId: number;
  customerName: string;
  paymentType: string;
  deliveryDate: string;
  isUrgent: boolean;
  qty: number;
  invoiceType: string;
  total: number;
  onlinePaidAmount: number;
  gasPrice: number;
  securityDeposit: number;
  deliveryCharges: number;
  urgentDeliveryCharges: number;
  tax: number;
  discount: number;
}

export interface ReceivingDetails {
  recievedBy: string;
  recievedOn: string;
}

export interface MainData {
  documentId: number;
  totalOrderNumbers: number;
  transferDate: string;
  driverName: string;
  vehicleNo: string;
  total: number;
  gasPrice: number;
  onlinePaidAmount: number;
  securityDeposit: number;
  deliveryCharges: number;
  urgentDeliveryCharges: number;
  tax: number;
  discount: number;
  ordersCashDetails: OrderCashDetail[];
  receivingDetails: ReceivingDetails;
}

export interface CustomApiResponse {
  loading: boolean;
  statusCode: number;
  succeeded: boolean;
  message: string;
  data: MainData[]; // Changed to an array
}
export const initialReceiveCosignmentState: CustomApiResponse = {
  loading: false,
  statusCode: 0,
  succeeded: false,
  message: "",
  data: {} as MainData[],
};

interface Account {
  id: number;
  accountName: string;
  accountType: string;
  glCode: string;
  bankChargesAccount: string;
  bankName: string;
  accountNumber: string;
  iban: string;
  branchCode: string;
  bankAddress: string;
  chartOfAccount: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface GetAllAccountsResponse {
  success: boolean;
  message: string;
  data: Account[];
}

export interface BankDetailsRequest {
  accountName: string;
  accountType: string;
  glCode: string;
  bankChargesAccount: string;
  bankName: string;
  accountNumber: string;
  ibanNumber: string;
  branchCode: string;
  bankAddress: string;
  statusCode: number;
  message: string;
}

export interface BankDetailsResponse {
  success: boolean;
  message: string;
}

// Define the initial state for accounts
export interface AccountsState {
  loading: boolean;
  error: string | null;
  accounts: Account[];
}

export const initialAccountsState: AccountsState = {
  loading: false,
  error: null,
  accounts: [],
};

export type GetAllDepositsResponse = {
  data: {
    id: number;
    at: string; // ISO 8601 date string
    by: string;
    totalAmount: number;
    depositNumber: string;
    baseUrl: string;
    depositAccount: {
      accountId: number;
      accountNumber: string;
      accountType: string;
      accountName: string;
    };
    depositConsignments: {
      consignmentId: number;
      amount: number;
      type: string;
    }[];
  };
};

// Interface for consignment deposit logs
export interface ConsignmentDepositLog {
  consignmentId: number;
  amount: number;
}

// Interface for deposit logs
export interface DepositLog {
  id: number;
  at: string; // ISO date string
  by: string;
  amount: number;
  depositNumber: string;
  consignmentDepositLogsForAccounts: ConsignmentDepositLog[];
}

// Interface for bank account logs
export interface BankAccountLog {
  id: number;
  accountName: string;
  accountType: string;
  accountNumber: string;
  amount: number;
  depositLogs: DepositLog[];
}

// Interface for API response
export interface GetAllAccountsResponse {
  accounts: BankAccountLog[];
  total: number; // Optional: Total number of accounts if applicable
}

export interface BankAccountLogsState {
  loading: boolean;
  error: string | null;
  logs: BankAccountLog[];
}

export const initialBankAccountLogsState: BankAccountLogsState = {
  loading: false,
  error: null,
  logs: [],
};

export interface InRecord {
  securityDeposit: number;
  other: number;
  at: string; // ISO date string
}

export interface OutRecord {
  amount: number;
  type: string;
  at: string; // ISO date string
}

export interface Consignment {
  consignmentId: number;
  inRecord: InRecord;
  outRecords: OutRecord[];
}

export interface InHandBankAccountLogData {
  walletId: number;
  user: string;
  consignments: Consignment[];
}

export interface GetInHandBankAccountLogsResponse {
  statusCode: number;
  succeeded: boolean;
  message: string;
  errors: string[];
  inhandLogs: InHandBankAccountLogData;
}

export interface InHandBankAccountLogsState {
  loading: boolean;
  error: string | null;
  logs: InHandBankAccountLogData | null;
}

export const initialInHandBankAccountLogsState: InHandBankAccountLogsState = {
  loading: false,
  error: null,
  logs: null,
};
