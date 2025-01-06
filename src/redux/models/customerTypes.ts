// // Customer types and states
export interface Customer {
  id: number;
  customerCode: string;
  phone: string;
  cnic: string;
  cnicExpiryDate: string;
  cnicIssueDate: string | null;
  name: string;
  email: string;
}

export interface CustomerState {
  customers: Customer[];
  loading: boolean;
  error: string | null;
}

export const initialCustomerState: CustomerState = {
  customers: [],
  loading: false,
  error: null,
};

// // Security Deposit types and states
export interface SecurityDeposit {
  id: number;
  customerCode: string;
  phone: string;
  cnic: string;
  cnicExpiryDate: string;
  cnicIssueDate: string | null;
  name: string;
  email: string;
}

export interface SecurityDepositState {
  securityDeposit: SecurityDeposit[];
  loading: boolean;
  error: string | null;
}

export const initialSecurityDepositState: SecurityDepositState = {
  securityDeposit: [],
  loading: false,
  error: null,
};

// // Payments types and states
export interface PaymentTypes {
  id: number;
  paymentMethod: string;
  updatedBy: string;
  updatedOn: string;
}

export interface PaymentTypestState {
  paymentTypes: PaymentTypes[];
  loading: boolean;
  error: string | null;
}

export const initialPaymentTypesState: PaymentTypestState = {
  paymentTypes: [],
  loading: false,
  error: null,
};

export interface WalletTypes {
  customerId: number;
  amount: number;
  merchantTransactionId: string;
  message: string;
}
// // Customer Order Log types and states
export interface CustomerOrderLog {
  id: number;
  paymentMethod: string;
  updatedBy: string;
  updatedOn: string;
  orderLog: string;
}

export interface CustomerOrderLogState {
  customerOrderLog: CustomerOrderLog[];
  loading: boolean;
  error: string | null;
}

export const initialCustomerOrderLogState: CustomerOrderLogState = {
  customerOrderLog: [],
  loading: false,
  error: null,
};

// Order Delivery types and states
export interface OrderDelivery {
  id: number;
}

export interface OrderDeliveryState {
  orderDelivery: OrderDelivery[];
  loading: boolean;
  error: string | null;
}

// Initial state for Order Delivery
export const initialOrderDeliveryState: OrderDeliveryState = {
  orderDelivery: [],
  loading: false,
  error: null,
};

// Contacted Person List types and states
export interface ContactedPersonsList {}

export interface ContactedPersonsListState {
  contactedPerson: ContactedPersonsList[];
  loading: boolean;
  error: string | null;
}

// Initial state for DriversList
export const initialContactedPersonsListState: ContactedPersonsListState = {
  contactedPerson: [],
  loading: false,
  error: null,
};

// All Cities List types and states
export interface AllCitiesList {
  id: number;
  name: string;
  address: string;
  city: string;
  province: string;
  latitude: string;
  longitude: string;
  objectType: string | null;
  parentID: number;
  type: string;
}

export interface AllCitiesListState {
  allCities: AllCitiesList[];
  loading: boolean;
  error: string | null;
}

// Initial state for DriversList
export const initialAllCitiesListState: AllCitiesListState = {
  allCities: [],
  loading: false,
  error: null,
};

// DriversList types and states
export interface DriversList {
  // id: number;
}

export interface DriversListState {
  driver: DriversList[];
  loading: boolean;
  error: string | null;
}

// Initial state for DriversList
export const initialDriversListState: DriversListState = {
  driver: [],
  loading: false,
  error: null,
};

// VehiclesList types and states
export interface VehiclesList {
  // id: number;
}

export interface VehiclesListState {
  vehicles: VehiclesList[];
  loading: boolean;
  error: string | null;
}

// Initial state for DriversList
export const initialVehiclesListState: VehiclesListState = {
  vehicles: [],
  loading: false,
  error: null,
};

export interface OrderDeliveryTypes {
  id: number;
}

export interface submitOrderDeliveryTypes {
  // id: number;
}

// Coustomer Consignment Details types and states
export interface CustomerConsignmentDetails {
  // id: number;
}

export interface CustomerConsignmentDetailsState {
  consignment: {};
  loading: boolean;
  error: string | null;
}

// Initial state for Coustomer Consignment
export const initialCustomerConsignmentDetailsState: CustomerConsignmentDetailsState = {
  consignment: {},
  loading: false,
  error: null,
};

// Coustomer Consignment View Details Finished
export interface CustomerConsignmentViewDetailsFinished {
  // id: number;
}

// Coustomer Consignment View Details Finished
export interface CustomerConsignmentCylinderBackToWarehouse {
  // id: number;
}

// Coustomer Consignment Update Order Assignment Consignment
export interface CustomerConsignmentUpdateOrderAssignmentConsignment {
  // id: number;
}

// Customer Order Location
export interface OrderLocation {
  id: number;
  name: string;
}

export interface OrderLocationState {
  orderLocations: OrderLocation[];
  loading: boolean;
  error: string | null;
}

export const initialOrderLocationState: OrderLocationState = {
  orderLocations: [],
  loading: false,
  error: null,
};

// Customer Order Location
export interface MapLocationOrders {
  orderId: number;
  orderAtLat: string;
  orderAtLong: string;
}

export interface MapLocationOrdersState {
  maporders: MapLocationOrders[];
  loading: boolean;
  error: string | null;
}

export const initialMapLocationOrdersState: MapLocationOrdersState = {
  maporders: [],
  loading: false,
  error: null,
};
export interface WarningCustomerOrder {
  userType: string;
  targetNamespace: string;
  description: string;
  tags: string;
  title: string;
  messageToCustomer: string;
  userInfos: UserInfo[];
}

export interface UserInfo {
  userId: number;
  phoneNumber: string;
  fcmToken: string;
}

export interface WarningCustomerCreateOrder {}
export interface RegionalPricing {}

export interface ConsignmentRouteApiResponse {
  statusCode: number;
  succeeded: boolean;
  message: string;
  errors: null | string[];
  data: ConsignmentRouteDetails;
}

export interface ConsignmentRouteDetails {
  customerConsignmentId: number;
  actualPath: string;
}

export interface ConsignmentRouteState {
  details: ConsignmentRouteDetails | null;
  loading: boolean;
  error: string | null;
}

export const initialConsignmentRouteState: ConsignmentRouteState = {
  details: null,
  loading: false,
  error: null,
};
