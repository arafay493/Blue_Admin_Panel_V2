// @ts-nocheck
import {
  createSlice,
  PayloadAction,
  combineReducers,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import {
  fetchAllCustomers,
  fetchAllOrderReports,
  fetchAllTransactions,
  fetchAllRegionalPricing,
  fetchAllFeedbackList,
  fetchAllCustomerlogList,
  fetchAllAdminWarningCustomerList,
  fetchAllWarningCustomerList,
  fetchAllCustomerOrderList,
  fetchAllSecurityDepositList,
  fetchAlPaymentTypesList,
  fetchAllCustomerOrderlogList,
  fetchAllStockTransferList,
  fetchAllContactedPersonsList,
  fetchAllCitiesList,
  fetchAllDriversList,
  fetchAllVehiclesList,
  customerConsignmentDetails,
  fetchAllOrderStatus,
  fetchAllOrderLocations,
  fetchConsignmentRouteDetails,
} from "../services/customerService";
import {
  Customer,
  initialCustomerState,
  SecurityDeposit,
  initialSecurityDepositState,
  PaymentTypes,
  initialPaymentTypesState,
  initialCustomerOrderLogState,
  CustomerOrderLog,
  OrderDelivery,
  initialOrderDeliveryState,
  initialContactedPersonsListState,
  ContactedPersonsList,
  initialAllCitiesListState,
  AllCitiesList,
  initialDriversListState,
  DriversList,
  initialVehiclesListState,
  VehiclesList,
  initialCustomerConsignmentDetailsState,
  CustomerConsignmentDetails,
  initialOrderLocationState,
  OrderLocation,
  MapLocationOrders,
  initialMapLocationOrdersState,
  ConsignmentRouteDetails,
  initialConsignmentRouteState,
} from "../models/customerTypes";
import { RootState } from "../store"; // Import RootState to access global state

// Transaction types and states
export interface Transaction {
  id: string;
  customerId: number;
  amount: number;
  preTransactionDate: string;
  postTransactionDate: string | null;
  status: boolean;
  merchantTransactionId: string;
}

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialTransactionState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
};

// Order types and states
export interface Order {
  id: number;
  customerCode: string;
}

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialOrderState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

// Regional pricing types and states
export interface RegPricing {
  currentPriceId: string;
  price: number;
  city: string;
  province: string;
  gstTax: number;
  discount: number;
  deliveryCharges: number;
  securityDeposit: number;
  updatedBy: string;
  updatedOn: string;
}

interface RegPricingState {
  regPricing: RegPricing[];
  loading: boolean;
  error: string | null;
}

const initialRegPricingState: RegPricingState = {
  regPricing: [],
  loading: false,
  error: null,
};

// Feedback types and states
export interface FeedBack {
  id: number;
}

interface FeedBackState {
  feedbacks: FeedBack[];
  loading: boolean;
  error: string | null;
}

const initialFeedackState: FeedBackState = {
  feedbacks: [],
  loading: false,
  error: null,
};

// Customer Log types and states
export interface CustomerLog {
  id: number;
}

interface CustomerLogState {
  logs: CustomerLog[];
  loading: boolean;
  error: string | null;
}

// Initial state for customer logs
const initialCustomerLogState: CustomerLogState = {
  logs: [],
  loading: false,
  error: null,
};

//Admin Warning Customer types and states
export interface AdminWarningCustomer {
  id: number;
}

interface AdminWarningCustomerState {
  adminWarningCustomers: AdminWarningCustomer[];
  loading: boolean;
  error: string | null;
}

// Initial state for customer logs
const initialAdminWarningCustomerState: AdminWarningCustomerState = {
  adminWarningCustomers: [],
  loading: false,
  error: null,
};

// Warning Customers types and states
export interface WarningCustomer {
  id: number;
}

interface WarningCustomerState {
  warningCustomers: WarningCustomer[];
  loading: boolean;
  error: string | null;
}

// Initial state for customer logs
const initialWarningCustomerState: WarningCustomerState = {
  warningCustomers: [],
  loading: false,
  error: null,
};

// Warning Customers types and states
export interface CustomerOrder {
  id: number;
}

interface CustomerOrderState {
  customerOrders: CustomerOrder[];
  loading: boolean;
  error: string | null;
}

// Initial state for customer logs
const initialCustomerOrderState: CustomerOrderState = {
  customerOrders: [],
  loading: false,
  error: null,
};

// Customer Slice
const customerSlice = createSlice({
  name: "customer",
  initialState: initialCustomerState,
  reducers: {
    fetchCustomersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCustomersSuccess(state, action: PayloadAction<Customer[]>) {
      state.loading = false;
      state.customers = action.payload;
    },
    fetchCustomersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Transaction Slice
const transactionSlice = createSlice({
  name: "transaction",
  initialState: initialTransactionState,
  reducers: {
    fetchTransactionsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTransactionsSuccess(state, action: PayloadAction<Transaction[]>) {
      state.loading = false;
      state.transactions = action.payload;
    },
    fetchTransactionsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Order Slice
const orderSlice = createSlice({
  name: "order",
  initialState: initialOrderState,
  reducers: {
    fetchOrdersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchOrdersSuccess(state, action: PayloadAction<Order[]>) {
      state.loading = false;
      state.orders = action.payload;
    },
    fetchOrdersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Regional Pricing Slice
const regPricingSlice = createSlice({
  name: "regPricing",
  initialState: initialRegPricingState,
  reducers: {
    fetchRegPricingStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchRegPricingSuccess(state, action: PayloadAction<RegPricing[]>) {
      state.loading = false;
      state.regPricing = action.payload;
    },
    fetchRegPricingFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Feedback Slice
const feedbackSlice = createSlice({
  name: "feedback",
  initialState: initialFeedackState,
  reducers: {
    fetchFeebackStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchFeebackSuccess(state, action: PayloadAction<FeedBack[]>) {
      state.loading = false;
      state.feedbacks = action.payload;
    },
    fetchFeebackFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Slice for customer logs
const customerLogSlice = createSlice({
  name: "customerLog",
  initialState: initialCustomerLogState,
  reducers: {
    fetchCustomerLogStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCustomerLogSuccess(state, action: PayloadAction<CustomerLog[]>) {
      state.loading = false;
      state.logs = action.payload;
    },
    fetchCustomerLogFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Slice for warning customer
const warningCustomerSlice = createSlice({
  name: "warningCustomer",
  initialState: initialWarningCustomerState,
  reducers: {
    fetchWarningCustomerStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchWarningCustomerSuccess(state, action: PayloadAction<CustomerLog[]>) {
      state.loading = false;
      state.warningCustomers = action.payload;
    },
    fetchWarningCustomerFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Admin Warning Customer Slice
const adminWarningCustomerSlice = createSlice({
  name: "adminWarningCustomer",
  initialState: initialAdminWarningCustomerState,
  reducers: {
    fetchAdminWarningStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAdminWarningSuccess(
      state,
      action: PayloadAction<AdminWarningCustomer[]>
    ) {
      state.loading = false;
      state.adminWarningCustomers = action.payload;
    },
    fetchAdminWarningFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Customer Order Slice
const customerOrderSlice = createSlice({
  name: "customerOrder",
  initialState: initialCustomerOrderState,
  reducers: {
    fetchCustomerOrderStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCustomerOrderSuccess(state, action: PayloadAction<CustomerOrder[]>) {
      state.loading = false;
      state.customerOrders = action.payload;
    },
    fetchCustomerOrderFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Security Desposit Slice
const SecurityDepositSlice = createSlice({
  name: "securityDeposit",
  initialState: initialSecurityDepositState,
  reducers: {
    fetchSecurityDepositStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSecurityDepositSuccess(
      state,
      action: PayloadAction<SecurityDeposit[]>
    ) {
      state.loading = false;
      state.securityDeposit = action.payload;
    },
    fetchSecurityDepositFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Payment Types Slice
const paymentTypesSlice = createSlice({
  name: "paymentTypes",
  initialState: initialPaymentTypesState,
  reducers: {
    fetchPaymentTypesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPaymentTypesSuccess(state, action: PayloadAction<PaymentTypes[]>) {
      state.loading = false;
      state.paymentTypes = action.payload;
    },
    fetchPaymentTypesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Customer Order Log Slice
const customerOrderLogSlice = createSlice({
  name: "customerOrderLog",
  initialState: initialCustomerOrderLogState,
  reducers: {
    fetchCustomerOrderLogStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCustomerOrderLogSuccess(
      state,
      action: PayloadAction<CustomerOrderLog[]>
    ) {
      state.loading = false;
      state.customerOrderLog = action.payload;
    },
    fetchCustomerOrderLogFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Order Delivery Slice
const orderDeliverySlice = createSlice({
  name: "orderDelivery",
  initialState: initialOrderDeliveryState,
  reducers: {
    fetchOrderDeliveryStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchOrderDeliverySuccess(state, action: PayloadAction<OrderDelivery[]>) {
      state.loading = false;
      state.orderDelivery = action.payload;
    },
    fetchOrderDeliveryFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// All Contacted Person Slice
const contactedPersonSlice = createSlice({
  name: "contactedPerson",
  initialState: initialContactedPersonsListState,
  reducers: {
    fetchContactedPersonStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchContactedPersonSuccess(
      state,
      action: PayloadAction<ContactedPersonsList[]>
    ) {
      state.loading = false;
      state.contactedPerson = action.payload;
    },
    fetchContactedPersonFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// All Contacted Person Slice
const allCitiesListSlice = createSlice({
  name: "allCitiesList",
  initialState: initialAllCitiesListState,
  reducers: {
    fetchAllCitiesListStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAllCitiesListSuccess(state, action: PayloadAction<AllCitiesList[]>) {
      state.loading = false;
      state.allCities = action.payload;
    },
    fetchAllCitiesListFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// All Drivers Slice
const allDriversListSlice = createSlice({
  name: "allDriversList",
  initialState: initialDriversListState,
  reducers: {
    fetchAllDriversListStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAllDriversListSuccess(state, action: PayloadAction<DriversList[]>) {
      state.loading = false;
      state.driver = action.payload;
    },
    fetchAllDriversListFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// All Vehicles Slice
const allVehiclesListSlice = createSlice({
  name: "allVehiclesList",
  initialState: initialVehiclesListState,
  reducers: {
    fetchAllVehiclesListStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAllVehiclesListSuccess(state, action: PayloadAction<VehiclesList[]>) {
      state.loading = false;
      state.vehicles = action.payload;
    },
    fetchAllVehiclesListFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Customer Consignment Slice
const CustomerConsignmentDetailsSlice = createSlice({
  name: "CustomerConsignmentDetails",
  initialState: initialCustomerConsignmentDetailsState,
  reducers: {
    fetchCustomerConsignmentDetailsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCustomerConsignmentDetailsSuccess(
      state,
      action: PayloadAction<CustomerConsignmentDetails>
    ) {
      state.loading = false;
      state.consignment = action.payload;
    },
    fetchCustomerConsignmentDetailsFailure(
      state,
      action: PayloadAction<string>
    ) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Customer Consignment Slice
const OrderLoactionSlice = createSlice({
  name: "orderLocation",
  initialState: initialOrderLocationState,
  reducers: {
    fetchOrderLocationStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchOrderLocationSuccess(state, action: PayloadAction<OrderLocation[]>) {
      state.loading = false;
      state.orderLocations = action.payload;
    },
    fetchOrderLocationFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Map Orders Slice
const MapOrdersSlice = createSlice({
  name: "mapLocation",
  initialState: initialMapLocationOrdersState,
  reducers: {
    fetchMapLocationStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchMapLocationSuccess(state, action: PayloadAction<MapLocationOrders[]>) {
      state.loading = false;
      state.maporders = action.payload;
    },
    fetchMapLocationFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const consignmentRouteSlice = createSlice({
  name: "consignmentRoute",
  initialState: initialConsignmentRouteState,
  reducers: {
    fetchConsignmentRouteStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchConsignmentRouteSuccess(
      state,
      action: PayloadAction<ConsignmentRouteDetails>
    ) {
      state.loading = false;
      state.details = action.payload;
    },
    fetchConsignmentRouteFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Combine Reducers
const rootReducer = combineReducers({
  customer: customerSlice.reducer,
  transaction: transactionSlice.reducer,
  order: orderSlice.reducer,
  regPricing: regPricingSlice.reducer,
  feedback: feedbackSlice.reducer,
  customerLog: customerLogSlice.reducer,
  adminWarningCustomer: adminWarningCustomerSlice.reducer,
  warningCustomer: warningCustomerSlice.reducer,
  customerOrder: customerOrderSlice.reducer,
  securityDesposit: SecurityDepositSlice.reducer,
  paymentTypes: paymentTypesSlice.reducer,
  customerOrderLog: customerOrderLogSlice.reducer,
  orderDelivery: orderDeliverySlice.reducer,
  contactedPerson: contactedPersonSlice.reducer,
  allCities: allCitiesListSlice.reducer,
  allDrivers: allDriversListSlice.reducer,
  allVehicles: allVehiclesListSlice.reducer,
  customerConsignmentDetails: CustomerConsignmentDetailsSlice.reducer,
  orderLocation: OrderLoactionSlice.reducer,
  mapOrders: MapOrdersSlice.reducer,
  consignmentRoute: consignmentRouteSlice.reducer,
});

export default rootReducer;

// Async Thunks for fetching data
export const fetchCustomers = createAsyncThunk(
  "customer/fetchCustomers",
  async (cityId: number | null, { dispatch }) => {
    dispatch(customerSlice.actions.fetchCustomersStart());
    try {
      const customers = await fetchAllCustomers(cityId);
      dispatch(customerSlice.actions.fetchCustomersSuccess(customers));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch customers";
      dispatch(customerSlice.actions.fetchCustomersFailure(errorMessage));
    }
  }
);

export const fetchTransactions = createAsyncThunk(
  "transaction/fetchTransactions",
  async (_, { dispatch }) => {
    dispatch(transactionSlice.actions.fetchTransactionsStart());
    try {
      const transactions = await fetchAllTransactions();
      dispatch(transactionSlice.actions.fetchTransactionsSuccess(transactions));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch transactions";
      dispatch(transactionSlice.actions.fetchTransactionsFailure(errorMessage));
    }
  }
);

export const fetchOrderReports = createAsyncThunk(
  "order/fetchOrderReports",
  async (_, { dispatch }) => {
    dispatch(orderSlice.actions.fetchOrdersStart());
    try {
      const orders = await fetchAllOrderReports();
      dispatch(orderSlice.actions.fetchOrdersSuccess(orders));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch orders";
      dispatch(orderSlice.actions.fetchOrdersFailure(errorMessage));
    }
  }
);

export const fetchRegPricing = createAsyncThunk(
  "regPricing/fetchRegPricing",
  async (_, { dispatch }) => {
    dispatch(regPricingSlice.actions.fetchRegPricingStart());
    try {
      const regPricing = await fetchAllRegionalPricing();
      dispatch(regPricingSlice.actions.fetchRegPricingSuccess(regPricing));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch regional Pricing";
      dispatch(regPricingSlice.actions.fetchRegPricingFailure(errorMessage));
    }
  }
);

export const fetchFeedbacks = createAsyncThunk(
  "feedback/fetchFeedbacks",
  async (_, { dispatch }) => {
    dispatch(feedbackSlice.actions.fetchFeebackStart());
    try {
      const feedback = await fetchAllFeedbackList();
      dispatch(feedbackSlice.actions.fetchFeebackSuccess(feedback));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch feedbacks";
      dispatch(feedbackSlice.actions.fetchFeebackFailure(errorMessage));
    }
  }
);

export const fetchCustomerLogs = createAsyncThunk(
  "customerLog/fetchCustomerLogs",
  async (customerId: number, { dispatch }) => {
    dispatch(customerLogSlice.actions.fetchCustomerLogStart());
    try {
      const logs = await fetchAllCustomerlogList(customerId);
      dispatch(customerLogSlice.actions.fetchCustomerLogSuccess(logs));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch customer logs";
      dispatch(customerLogSlice.actions.fetchCustomerLogFailure(errorMessage));
    }
  }
);

export const fetchWarningCustomer = createAsyncThunk(
  "warningCustomer/fetchWarningCustomers",
  async (NumOfDays: number, { dispatch }) => {
    dispatch(warningCustomerSlice.actions.fetchWarningCustomerStart());
    try {
      const warningCustomer = await fetchAllWarningCustomerList(NumOfDays);
      dispatch(
        warningCustomerSlice.actions.fetchWarningCustomerSuccess(
          warningCustomer
        )
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch Warning Customers";
      dispatch(
        warningCustomerSlice.actions.fetchWarningCustomerFailure(errorMessage)
      );
    }
  }
);

export const fetchAdminWarningCustomer = createAsyncThunk(
  "warningCustomer/fetchAdminWarningCustomers",
  async (_, { dispatch }) => {
    dispatch(adminWarningCustomerSlice.actions.fetchAdminWarningStart());
    try {
      const adminWarningCustomer = await fetchAllAdminWarningCustomerList();
      dispatch(
        adminWarningCustomerSlice.actions.fetchAdminWarningSuccess(
          adminWarningCustomer
        )
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch feedbacks";
      dispatch(
        adminWarningCustomerSlice.actions.fetchAdminWarningFailure(errorMessage)
      );
    }
  }
);

export const fetchCustomerOrder = createAsyncThunk(
  "customerOrder/fetchCustomerOrders",
  async (cityId: number | null, { dispatch }) => {
    dispatch(customerOrderSlice.actions.fetchCustomerOrderStart());
    try {
      const customerOrder = await fetchAllCustomerOrderList(cityId);

      dispatch(
        customerOrderSlice.actions.fetchCustomerOrderSuccess(customerOrder)
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch customer orders";
      dispatch(
        customerOrderSlice.actions.fetchCustomerOrderFailure(errorMessage)
      );
    }
  }
);

export const fetchSecurityDeposit = createAsyncThunk(
  "securityDeposit/fetchSecurityDeposit",
  async (_, { dispatch }) => {
    dispatch(SecurityDepositSlice.actions.fetchSecurityDepositStart());
    try {
      const securityDeposit = await fetchAllSecurityDepositList();
      dispatch(
        SecurityDepositSlice.actions.fetchSecurityDepositSuccess(
          securityDeposit
        )
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch feedbacks";
      dispatch(
        SecurityDepositSlice.actions.fetchSecurityDepositFailure(errorMessage)
      );
    }
  }
);

export const fetchPaymentTypes = createAsyncThunk(
  "spaymentTypes/fetchPaymentTypes",
  async (_, { dispatch }) => {
    dispatch(paymentTypesSlice.actions.fetchPaymentTypesStart());
    try {
      const paymentTypes = await fetchAlPaymentTypesList();
      dispatch(
        paymentTypesSlice.actions.fetchPaymentTypesSuccess(paymentTypes)
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch feedbacks";
      dispatch(
        paymentTypesSlice.actions.fetchPaymentTypesFailure(errorMessage)
      );
    }
  }
);

export const fetchCustomerOrderLog = createAsyncThunk(
  "customerOrderLog/fetchCustomerOrderLog",
  async (orderid: number, { dispatch }) => {
    dispatch(customerOrderLogSlice.actions.fetchCustomerOrderLogStart());
    try {
      const customerOrderLog = await fetchAllCustomerOrderlogList(orderid);
      dispatch(
        customerOrderLogSlice.actions.fetchCustomerOrderLogSuccess(
          customerOrderLog
        )
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch Warning Customers";
      dispatch(
        customerOrderLogSlice.actions.fetchCustomerOrderLogFailure(errorMessage)
      );
    }
  }
);

export const fetchOrderDelivery = createAsyncThunk(
  "orderDelivery/fetchOrderDeliveryList",
  async (WarehouseId: number | null, { dispatch }) => {
    dispatch(orderDeliverySlice.actions.fetchOrderDeliveryStart());
    try {
      const customerOrderLog = await fetchAllStockTransferList(WarehouseId);
      dispatch(
        orderDeliverySlice.actions.fetchOrderDeliverySuccess(customerOrderLog)
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch Order Delivery List";
      dispatch(
        orderDeliverySlice.actions.fetchOrderDeliveryFailure(errorMessage)
      );
    }
  }
);

export const fetchContactedPersonList = createAsyncThunk(
  "contactedPerson/fetchContactedPersonList",
  async (WarehouseId: number | null, { dispatch }) => {
    dispatch(contactedPersonSlice.actions.fetchContactedPersonStart());
    try {
      const AllContactedPersons = await fetchAllContactedPersonsList(
        WarehouseId
      );

      dispatch(
        contactedPersonSlice.actions.fetchContactedPersonSuccess(
          AllContactedPersons
        )
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch Contacted Persons List";
      dispatch(
        contactedPersonSlice.actions.fetchContactedPersonFailure(errorMessage)
      );
    }
  }
);

export const fetchCitiesList = createAsyncThunk(
  "allCities/fetchAllCitiesList",
  async (_, { dispatch }) => {
    dispatch(allCitiesListSlice.actions.fetchAllCitiesListStart());
    try {
      const allCities = await fetchAllCitiesList();
      dispatch(allCitiesListSlice.actions.fetchAllCitiesListSuccess(allCities));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch Cities List";
      dispatch(
        allCitiesListSlice.actions.fetchAllCitiesListFailure(errorMessage)
      );
    }
  }
);

export const fetchDriversList = createAsyncThunk(
  "allCities/fetchAllCitiesList",
  async (id: number, { dispatch }) => {
    dispatch(allDriversListSlice.actions.fetchAllDriversListStart());
    try {
      const allDriver = await fetchAllDriversList(id);
      dispatch(
        allDriversListSlice.actions.fetchAllDriversListSuccess(allDriver)
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch Drivers List";
      dispatch(
        allDriversListSlice.actions.fetchAllDriversListFailure(errorMessage)
      );
    }
  }
);

export const fetchVehiclesList = createAsyncThunk(
  "allCities/fetchAllCitiesList",
  async (id: number, { dispatch }) => {
    dispatch(allVehiclesListSlice.actions.fetchAllVehiclesListStart());
    try {
      const allVehicles = await fetchAllVehiclesList(id);
      dispatch(
        allVehiclesListSlice.actions.fetchAllVehiclesListSuccess(allVehicles)
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch Vehicles List";
      dispatch(
        allVehiclesListSlice.actions.fetchAllVehiclesListFailure(errorMessage)
      );
    }
  }
);

export const fetchCustomerConsignmentDetails = createAsyncThunk(
  "allCities/fetchAllCitiesList",
  async (id: number, { dispatch }) => {
    dispatch(
      CustomerConsignmentDetailsSlice.actions.fetchCustomerConsignmentDetailsStart()
    );
    try {
      const customerConsignmentData = await customerConsignmentDetails(id);
      dispatch(
        CustomerConsignmentDetailsSlice.actions.fetchCustomerConsignmentDetailsSuccess(
          customerConsignmentData
        )
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch Coustomer Consignment Data";
      dispatch(
        CustomerConsignmentDetailsSlice.actions.fetchCustomerConsignmentDetailsFailure(
          errorMessage
        )
      );
    }
  }
);

export const fetchOrderLocation = createAsyncThunk(
  "orderLocation/fetchOrderLocations",
  async (_, { dispatch }) => {
    dispatch(OrderLoactionSlice.actions.fetchOrderLocationStart());
    try {
      const orderLocation = await fetchAllOrderStatus();
      dispatch(
        OrderLoactionSlice.actions.fetchOrderLocationSuccess(orderLocation)
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch orderLocation";
      dispatch(
        OrderLoactionSlice.actions.fetchOrderLocationFailure(errorMessage)
      );
    }
  }
);

export const fetchMapLocation = createAsyncThunk(
  "mapLocation/fetchMapLocations",
  async ({ startDate, endDate, status }, { dispatch }) => {
    dispatch(MapOrdersSlice.actions.fetchMapLocationStart());
    try {
      // Call the API with the passed parameters
      const mapLocation = await fetchAllOrderLocations(
        startDate,
        endDate,
        status
      );
      dispatch(MapOrdersSlice.actions.fetchMapLocationSuccess(mapLocation));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch map locations";
      dispatch(MapOrdersSlice.actions.fetchMapLocationFailure(errorMessage));
    }
  }
);

export const fetchConsignmentRouteDetailsThunk = createAsyncThunk(
  "consignmentRoute/fetchConsignmentRouteDetails",
  async (consignmentId: number, { dispatch }) => {
    dispatch(consignmentRouteSlice.actions.fetchConsignmentRouteStart());
    try {
      const response = await fetchConsignmentRouteDetails(consignmentId);
      dispatch(
        consignmentRouteSlice.actions.fetchConsignmentRouteSuccess(response)
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch consignment route details.";
      dispatch(
        consignmentRouteSlice.actions.fetchConsignmentRouteFailure(errorMessage)
      );
    }
  }
);
