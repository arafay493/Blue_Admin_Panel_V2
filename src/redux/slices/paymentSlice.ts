import {
  combineReducers,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  CashReceivables,
  initialCashReceivableState,
} from "../models/paymentTypes";
import { fetchAllCashReceivables } from "../services/paymentsService";

// cash receivables Slice
const cashRecSlice = createSlice({
  name: "cashReceivables",
  initialState: initialCashReceivableState,
  reducers: {
    fetchCashReceivableStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCashReceivableSuccess(
      state,
      action: PayloadAction<CashReceivables[]>
    ) {
      state.loading = false;
      state.cashReceivables = action.payload;
    },
    fetchCashReceivableFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Combine Reducers
const cashReceivablesReducer = combineReducers({
  cashRece: cashRecSlice.reducer,
});
export default cashReceivablesReducer;

export const fetchCashReceivables = createAsyncThunk(
  "payment/cashReceivables",
  async (_, { dispatch }) => {
    dispatch(cashRecSlice.actions.fetchCashReceivableStart());
    try {
      const cashRece = await fetchAllCashReceivables();
      dispatch(cashRecSlice.actions.fetchCashReceivableSuccess(cashRece));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch customers";
      dispatch(cashRecSlice.actions.fetchCashReceivableFailure(errorMessage));
    }
  }
);
