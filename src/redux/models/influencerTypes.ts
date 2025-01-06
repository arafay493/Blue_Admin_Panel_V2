export interface ListAllPendingInfluencersTypes {
  // id: number;
  // name: string;
}

export interface ListAllPendingInfluencersState {
  pendingInfluencers: ListAllPendingInfluencersTypes[]; // An array of vouchers
  loading: boolean;
  error: string | null;
}

export const initialListAllPendingInfluencerstate: ListAllPendingInfluencersState = {
  pendingInfluencers: [],
  loading: false,
  error: null,
};

export interface ListAllApprovedInfluencersTypes {
  // id: number;
  // name: string;
}

export interface ListAllApprovedInfluencersState {
  approvedInfluencers: ListAllApprovedInfluencersTypes[]; // An array of vouchers
  loading: boolean;
  error: string | null;
}

export const initialListAllApprovedInfluencerstate: ListAllApprovedInfluencersState = {
  approvedInfluencers: [],
  loading: false,
  error: null,
};

export interface ListAllRejectedInfluencersTypes {
  // id: number;
  // name: string;
}

export interface ListAllRejectedInfluencersState {
  rejectedInfluencers: ListAllRejectedInfluencersTypes[]; // An array of vouchers
  loading: boolean;
  error: string | null;
}

export const initialListAllRejectedInfluencerstate: ListAllRejectedInfluencersState = {
  rejectedInfluencers: [],
  loading: false,
  error: null,
};
export interface ListAllReferrerTypes {
  // id: number;
  // name: string;
}

export interface RemoveInfluencersTypes {
  // id: number;
  // name: string;
}

export interface ApproveInfluencersTypes {
  // id: number;
  // name: string;
}

export interface RejectInfluencersTypes {
  // id: number;
  // name: string;
}

// File: types/ResponseTypes.ts

// Define the structure for the data object
export interface Data {
  id: number;
  name: string;
  email: string;
  phone: string;
  cnic: string;
  cnicIssueDate: string;
  cnicExpiryDate: string;
}

// Define the structure for the full response
export interface ApiResponse {
  statusCode: number;
  succeeded: boolean;
  message: string;
  errors: string[]; // Array of strings for error messages
  data: Data; // Nested object of type Data
}

// Example usage
export const response: ApiResponse = {
  statusCode: 0,
  succeeded: true,
  message: "Success",
  errors: [],
  data: {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    cnic: "12345-6789012-3",
    cnicIssueDate: "2020-01-01",
    cnicExpiryDate: "2030-01-01",
  },
};
export interface Referrer {
  id: number;
  name: string;
  email: string;
  phone: string;
  cnic: string;
  cnicIssueDate: string;
  cnicExpiryDate: string;
}

export interface ListAllReferrerState {
  referrer: Referrer[];
  loading: boolean;
  error: string | null;
}

export const initialListAllReferrer: ListAllReferrerState = {
  referrer: [],
  loading: false,
  error: null,
};

export interface Customer {
  customerId: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  cnic: string;
  cnicIssueDate: string;
  cnicExpiryDate: string;
}

export interface ReferrerDashboardDetails {
  signUps: number;
  ordersPlaced: number;
  ordersCompleted: number;
  influencerDashboardCustomerList: Customer[];
}

export interface ListAllReferrerDashboardState {
  referrerDetails: ReferrerDashboardDetails;
  loading: boolean;
  error: string | null;
}

export const initialListAllReferrerDashboardDetails: ListAllReferrerDashboardState = {
  referrerDetails: {
    signUps: 0,
    ordersPlaced: 0,
    ordersCompleted: 0,
    influencerDashboardCustomerList: [],
  },
  loading: false,
  error: null,
};
