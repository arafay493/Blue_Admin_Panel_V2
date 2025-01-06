// Import necessary modules and services
import {
  createSlice,
  PayloadAction,
  combineReducers,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import {
  DiscountAndVouchersTypes,
  initialDiscountAndVoucherState,
  initialSingleDiscountVoucherState,
  initialVoucherTypeState, 
  SingleDiscountVoucherTypes,
  VoucherType,
} from "../models/discountAndVouchersTypes";
import {
  fetchDiscountedVouchersListService,
  fetchSingleDiscountVoucherService,
  fetchVoucherTypesService, // Add service for voucher types
} from "../services/discountAndVouchersService";

// Slice for Discount Vouchers
const discountAndVoucherSlice = createSlice({
  name: "discountAndVoucher",
  initialState: initialDiscountAndVoucherState,
  reducers: {
    fetchVouchersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchVouchersSuccess(
      state,
      action: PayloadAction<DiscountAndVouchersTypes[]>
    ) {
      state.loading = false;
      state.vouchers = action.payload;
    },
    fetchVouchersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Slice for Single Discounted Voucher
const singleDiscountedVoucherSlice = createSlice({
  name: "singleDiscountedVoucher",
  initialState: initialSingleDiscountVoucherState,
  reducers: {
    fetchSingleVouchersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSingleVouchersSuccess(
      state,
      action: PayloadAction<SingleDiscountVoucherTypes>
    ) {
      state.loading = false;
      state.singleVoucher = action.payload;
    },
    fetchSingleVouchersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Slice for Voucher Types
const voucherTypesSlice = createSlice({
  name: "voucherTypes",
  initialState: initialVoucherTypeState,
  reducers: {
    fetchVoucherTypesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchVoucherTypesSuccess(state, action: PayloadAction<VoucherType[]>) {
      state.loading = false;
      state.voucherTypes = action.payload;
    },
    fetchVoucherTypesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Combine all slices into rootReducer
const rootReducer = combineReducers({
  vouchers: discountAndVoucherSlice.reducer,
  singleVoucher: singleDiscountedVoucherSlice.reducer,
  voucherTypes: voucherTypesSlice.reducer, // Include voucher types slice
});

export default rootReducer;

// Async Thunks for fetching Discounted Vouchers
export const fetchDiscountedVouchers = createAsyncThunk(
  "discountAndVouchers/fetchDiscountedVouchers",
  async (_, { dispatch }) => {
    dispatch(discountAndVoucherSlice.actions.fetchVouchersStart());
    try {
      const vouchers = await fetchDiscountedVouchersListService();
      dispatch(discountAndVoucherSlice.actions.fetchVouchersSuccess(vouchers));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch discounted Vouchers";
      dispatch(
        discountAndVoucherSlice.actions.fetchVouchersFailure(errorMessage)
      );
    }
  }
);

// Async Thunks for fetching Single Discounted Voucher
export const fetchSingleDiscountedVouchers = createAsyncThunk(
  "discountAndVouchers/fetchSingleDiscountedVouchers",
  async (id: number, { dispatch }) => {
    dispatch(singleDiscountedVoucherSlice.actions.fetchSingleVouchersStart());
    try {
      const voucher = await fetchSingleDiscountVoucherService(id);
      dispatch(
        singleDiscountedVoucherSlice.actions.fetchSingleVouchersSuccess(voucher)
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch Single discounted Vouchers";
      dispatch(
        singleDiscountedVoucherSlice.actions.fetchSingleVouchersFailure(
          errorMessage
        )
      );
    }
  }
);

// Async Thunk for fetching Voucher Types
export const fetchVoucherTypes = createAsyncThunk(
  "voucherTypes/fetchVoucherTypes",
  async (_, { dispatch }) => {
    dispatch(voucherTypesSlice.actions.fetchVoucherTypesStart());
    try {
      const types = await fetchVoucherTypesService();
      dispatch(voucherTypesSlice.actions.fetchVoucherTypesSuccess(types));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch Voucher Types";
      dispatch(
        voucherTypesSlice.actions.fetchVoucherTypesFailure(errorMessage)
      );
    }
  }
);
