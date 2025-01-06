//@ts-nocheck
import {
  combineReducers,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  CashReceivableApiResponse,
  CheckAdminWalletApiResponse,
  ConsignmentDetailsApiResponse,
  CustomApiResponse,
  initialCashReceivableState,
  initialCheckAdminWalletState,
  initialConsignmentDetailsState,
  initialReceiveCashState,
  MainData,
  ReceiveCashApiResponse,
  AccountsState,
  initialAccountsState,
  initialBankAccountLogsState,
  BankAccountLog,
  initialInHandBankAccountLogsState,
  GetInHandBankAccountLogsResponse,
} from "../models/cashManagementTypes";
import {
  fetchAllAccountsService,
  fetchCashReceivablesService,
  fetchCheckAdminWallet as fetchCheckAdminWalletService,
  fetchConsignmentDetailsService,
  fetchReceiveCashService,
  fetchReceivedConsignmentsService,
  fetchAllBankAccountLogService,
  fetchAllInhandBankAccountService,
} from "../services/cashManagementService";

const initialReceiveCosignmentState: CustomApiResponse = {
  loading: false,
  statusCode: 0,
  succeeded: false,
  message: "",
  data: {} as MainData,
};

const initialState: CustomApiResponse = {
  loading: false,
  statusCode: 0,
  succeeded: false,
  message: "",
  data: [] as AccountsState[],
};

const checkAdminWalletSlice = createSlice({
  name: "checkAdminWallet",
  initialState: initialCheckAdminWalletState,
  reducers: {
    fetchCheckAdminWalletStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCheckAdminWalletSuccess(
      state,
      action: PayloadAction<CheckAdminWalletApiResponse>
    ) {
      state.loading = false;
      state.checkAdminWallet = action.payload;
    },
    fetchCheckAdminWalletFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const cashReceivableSlice = createSlice({
  name: "cashReceivable",
  initialState: initialCashReceivableState,
  reducers: {
    fetchCashReceivablesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCashReceivablesSuccess(
      state,
      action: PayloadAction<CashReceivableApiResponse>
    ) {
      state.loading = false;
      state.cashReceivable = action.payload;
    },
    fetchCashReceivablesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const consignmentDetailsSlice = createSlice({
  name: "consignmentDetails",
  initialState: initialConsignmentDetailsState,
  reducers: {
    fetchConsignmentDetailsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchConsignmentDetailsSuccess(
      state,
      action: PayloadAction<ConsignmentDetailsApiResponse>
    ) {
      state.loading = false;
      state.consignmentDetails = action.payload;
    },
    fetchConsignmentDetailsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const receiveCashSlice = createSlice({
  name: "receiveCash",
  initialState: initialReceiveCashState,
  reducers: {
    fetchReceiveCashStart(state) {
      state.loading = true;
      state.error = null;
      state.message = "";
    },
    fetchReceiveCashSuccess(
      state,
      action: PayloadAction<{ data: boolean; message: string }>
    ) {
      state.loading = false;
      state.data = action.payload.data;
      state.message = action.payload.message;
    },
    fetchReceiveCashFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const receivedConsignmentSlice = createSlice({
  name: "receiveCash",
  initialState: initialReceiveCosignmentState,
  reducers: {
    fetchReceiveConsignmentStart(state) {
      state.loading = true;
      state.message = "";
    },
    fetchReceiveConsignmentSuccess(
      state,
      action: PayloadAction<{ data: MainData; message: string }>
    ) {
      state.loading = false;
      state.data = action.payload.data;
      state.message = action.payload.message;
    },
    fetchReceiveConsignmentFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.message = action.payload;
    },
  },
});

const accountsSlice = createSlice({
  name: "accounts",
  initialState: initialAccountsState,
  reducers: {
    fetchAccountsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAccountsSuccess(state, action: PayloadAction<Account[]>) {
      state.loading = false;
      state.accounts = action.payload;
    },
    fetchAccountsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const bankAccountLogsSlice = createSlice({
  name: "bankAccountLogs",
  initialState: initialBankAccountLogsState,
  reducers: {
    fetchBankAccountLogsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchBankAccountLogsSuccess(
      state,
      action: PayloadAction<BankAccountLog[]>
    ) {
      state.loading = false;
      state.logs = action.payload;
    },
    fetchBankAccountLogsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const inhandLogsSlice = createSlice({
  name: "inhandLogs",
  initialState: initialInHandBankAccountLogsState,
  reducers: {
    fetchinhandLogsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchinhandLogsSuccess(
      state,
      action: PayloadAction<GetInHandBankAccountLogsResponse>
    ) {
      state.loading = false;
      state.logs = action.payload;
    },
    fetchinhandLogsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCheckAdminWalletStart,
  fetchCheckAdminWalletSuccess,
  fetchCheckAdminWalletFailure,
} = checkAdminWalletSlice.actions;

export const {
  fetchCashReceivablesStart,
  fetchCashReceivablesSuccess,
  fetchCashReceivablesFailure,
} = cashReceivableSlice.actions;

export const {
  fetchConsignmentDetailsStart,
  fetchConsignmentDetailsSuccess,
  fetchConsignmentDetailsFailure,
} = consignmentDetailsSlice.actions;

export const {
  fetchReceiveCashStart,
  fetchReceiveCashSuccess,
  fetchReceiveCashFailure,
} = receiveCashSlice.actions;

export const {
  fetchReceiveConsignmentStart,
  fetchReceiveConsignmentSuccess,
  fetchReceiveConsignmentFailure,
} = receivedConsignmentSlice.actions;

export const {
  fetchAccountsStart,
  fetchAccountsSuccess,
  fetchAccountsFailure,
} = accountsSlice.actions;

export const {
  fetchBankAccountLogsStart,
  fetchBankAccountLogsSuccess,
  fetchBankAccountLogsFailure,
} = bankAccountLogsSlice.actions;

export const {
  fetchinhandLogsStart,
  fetchinhandLogsSuccess,
  fetchinhandLogsFailure,
} = inhandLogsSlice.actions;

export const fetchInhandSlice = createAsyncThunk<void, number>(
  "inHandBankAccountLogs/fetchInHandBankAccountLogs",
  async (warehouseId, { dispatch }) => {
    try {
      dispatch(fetchinhandLogsStart());
      const inhandlogs: GetInHandBankAccountLogsResponse = await fetchAllInhandBankAccountService(
        warehouseId
      );
      dispatch(fetchinhandLogsSuccess(inhandlogs));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch inhand logs ";
      dispatch(fetchinhandLogsFailure(errorMessage));
    }
  }
);

export const fetchCheckAdminWalletSlice = createAsyncThunk<void, void>(
  "checkAdminWallet/fetchCheckAdminWallet",
  async (_, { dispatch }) => {
    try {
      dispatch(fetchCheckAdminWalletStart());
      const checkAdminWallet: CheckAdminWalletApiResponse = await fetchCheckAdminWalletService();
      dispatch(fetchCheckAdminWalletSuccess(checkAdminWallet));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch admin wallet data";
      dispatch(fetchCheckAdminWalletFailure(errorMessage));
    }
  }
);

export const fetchCashReceivables = createAsyncThunk<void, number>(
  "cashReceivable/fetchCashReceivables",
  async (warehouseId, { dispatch }) => {
    try {
      dispatch(fetchCashReceivablesStart());
      const cashReceivable: CashReceivableApiResponse = await fetchCashReceivablesService(
        warehouseId
      );
      dispatch(fetchCashReceivablesSuccess(cashReceivable));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch cash receivables data";
      dispatch(fetchCashReceivablesFailure(errorMessage));
    }
  }
);

export const fetchConsignmentDetails = createAsyncThunk<void, number>(
  "consignmentDetails/fetchConsignmentDetails",
  async (consignmentId, { dispatch }) => {
    try {
      dispatch(fetchConsignmentDetailsStart());
      const consignmentDetails: ConsignmentDetailsApiResponse = await fetchConsignmentDetailsService(
        consignmentId
      );
      dispatch(fetchConsignmentDetailsSuccess(consignmentDetails));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch consignment details";
      dispatch(fetchConsignmentDetailsFailure(errorMessage));
    }
  }
);

export const fetchReceiveCashThunk = createAsyncThunk<void, number>(
  "receiveCash/fetchReceiveCash",
  async (docId, { dispatch }) => {
    try {
      dispatch(fetchReceiveCashStart());
      const response: ReceiveCashApiResponse = await fetchReceiveCashService(
        docId
      );

      dispatch(
        fetchReceiveCashSuccess({
          data: response.data,
          message: response.message,
        })
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to receive cash";
      dispatch(fetchReceiveCashFailure(errorMessage));
    }
  }
);

export const fetchReceiveConsignmentThunk = createAsyncThunk<void, number>(
  "receivedConsignment",
  async (WarehouseId: number | null, { dispatch }) => {
    try {
      dispatch(fetchReceiveConsignmentStart());
      const response: CustomApiResponse = await fetchReceivedConsignmentsService(
        WarehouseId
      );

      dispatch(
        fetchReceiveConsignmentSuccess({
          data: response.data,
          message: response.message,
        })
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to receive cash";
      dispatch(fetchReceiveConsignmentFailure(errorMessage));
    }
  }
);

export const fetchAllAccounts = createAsyncThunk<Account[], void>(
  "accounts/fetchAllAccounts",
  async (_, { dispatch }) => {
    try {
      dispatch(fetchAccountsStart());
      const response = await fetchAllAccountsService();
      dispatch(fetchAccountsSuccess(response.data));
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch accounts";
      dispatch(fetchAccountsFailure(errorMessage));
      return [];
    }
  }
);
export const fetchBankAccountLogsThunk = createAsyncThunk<
  BankAccountLog[],
  void
>("bankAccountLogs/fetchBankAccountLogs", async (_, { dispatch }) => {
  try {
    dispatch(fetchBankAccountLogsStart());
    const response = await fetchAllBankAccountLogService();
    dispatch(fetchBankAccountLogsSuccess(response));
    return response.accounts;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch bank account logs";
    dispatch(fetchBankAccountLogsFailure(errorMessage));
    return [];
  }
});

const cashManagementReducer = combineReducers({
  cashManagement: checkAdminWalletSlice.reducer,
  cashReceivable: cashReceivableSlice.reducer,
  consignmentDetails: consignmentDetailsSlice.reducer,
  receiveCash: receiveCashSlice.reducer,
  receivedConsignment: receivedConsignmentSlice.reducer,
  allAcounts: accountsSlice.reducer,
  bankAccountLogs: bankAccountLogsSlice.reducer,
  inhandbankAccounts: inhandLogsSlice.reducer,
});

export default cashManagementReducer;
