import {
  combineReducers,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  UserType,
  initialUserTypeState,
  Otp,
  initialOtpState,
  UserList,
  initialUserListState,
  RegionManagement,
  initialRegionManagementState,
  AddUserTypeList,
  initialAddUserTypeListState,
  UserWarehouse,
  initialUserWarehouseState,
} from "../models/administratorTypes";
import {
  fetchAllUserType,
  fetchAllOTPs,
  fetchAllUsers,
  fetchAllAreaManagement,
  fetchAllUserTypeList,
  fetchUserWarehouse as fetchUserWarehouseService,
} from "../services/administratorService";

// UserType Slice
const userTypeSlice = createSlice({
  name: "userType",
  initialState: initialUserTypeState,
  reducers: {
    fetchUserTypeStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUserTypeSuccess(state, action: PayloadAction<UserType[]>) {
      state.loading = false;
      state.userType = action.payload;
    },
    fetchUserTypeFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// OTP Slice
const otpSlice = createSlice({
  name: "otp",
  initialState: initialOtpState,
  reducers: {
    fetchOTPStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchOTPSuccess(state, action: PayloadAction<Otp[]>) {
      state.loading = false;
      state.otp = action.payload;
    },
    fetchOTPFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// User List Slice
const userListSlice = createSlice({
  name: "userList",
  initialState: initialUserListState,
  reducers: {
    fetchUserListStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUserListSuccess(state, action: PayloadAction<UserList[]>) {
      state.loading = false;
      state.userList = action.payload;
    },
    fetchUserListFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// User List Slice
const RegionManagementSlice = createSlice({
  name: "RegionManagement",
  initialState: initialRegionManagementState,
  reducers: {
    fetchRegionManagementStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchRegionManagementSuccess(
      state,
      action: PayloadAction<RegionManagement[]>
    ) {
      state.loading = false;
      state.regionManagements = action.payload;
    },
    fetchRegionManagementFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// UserType Slice
const userTypeListSlice = createSlice({
  name: "userType",
  initialState: initialAddUserTypeListState,
  reducers: {
    fetchUserTypeListStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUserTypeListSuccess(state, action: PayloadAction<AddUserTypeList[]>) {
      state.loading = false;
      state.addUserTypeList = action.payload;
    },
    fetchUserTypeListFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// User Warehouse Slice
const userWarehouseSlice = createSlice({
  name: "userWarehouse",
  initialState: initialUserWarehouseState,
  reducers: {
    fetchUserWarehouseStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUserWarehouseSuccess(state, action: PayloadAction<UserWarehouse[]>) {
      state.loading = false;
      state.userWarehouses = action.payload;
    },
    fetchUserWarehouseFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Combine Reducers
const administratorReducer = combineReducers({
  userType: userTypeSlice.reducer,
  otp: otpSlice.reducer,
  userList: userListSlice.reducer,
  RegionManagement: RegionManagementSlice.reducer,
  userTypeList: userTypeListSlice.reducer,
  userWarehouse: userWarehouseSlice.reducer,
});

export default administratorReducer;

export const fetchUserType = createAsyncThunk(
  "userType/fetchUserType",
  async (_, { dispatch }) => {
    dispatch(userTypeSlice.actions.fetchUserTypeStart());
    try {
      const userType = await fetchAllUserType();
      dispatch(userTypeSlice.actions.fetchUserTypeSuccess(userType));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch customers";
      dispatch(userTypeSlice.actions.fetchUserTypeFailure(errorMessage));
    }
  }
);

export const fetchOTPType = createAsyncThunk(
  "otp/fetchotpType",
  async (_, { dispatch }) => {
    dispatch(otpSlice.actions.fetchOTPStart());
    try {
      const otp = await fetchAllOTPs();
      dispatch(otpSlice.actions.fetchOTPSuccess(otp));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to otps";
      dispatch(otpSlice.actions.fetchOTPFailure(errorMessage));
    }
  }
);

export const fetchUserList = createAsyncThunk(
  "userList/fetchUserList",
  async (_, { dispatch }) => {
    dispatch(userListSlice.actions.fetchUserListStart());
    try {
      const userList = await fetchAllUsers();
      dispatch(userListSlice.actions.fetchUserListSuccess(userList));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to otps";
      dispatch(userListSlice.actions.fetchUserListFailure(errorMessage));
    }
  }
);

export const fetchRegionManagement = createAsyncThunk(
  "regionManagement/fetchRegionManagement",
  async (_, { dispatch }) => {
    dispatch(RegionManagementSlice.actions.fetchRegionManagementStart());
    try {
      const regionManagement = await fetchAllAreaManagement();
      dispatch(
        RegionManagementSlice.actions.fetchRegionManagementSuccess(
          regionManagement
        )
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to otps";
      dispatch(
        RegionManagementSlice.actions.fetchRegionManagementFailure(errorMessage)
      );
    }
  }
);

export const fetchUserListType = createAsyncThunk(
  "userType/fetchUsertypeList",
  async (_, { dispatch }) => {
    dispatch(userTypeListSlice.actions.fetchUserTypeListStart());
    try {
      const userTypeList = await fetchAllUserTypeList();
      dispatch(
        userTypeListSlice.actions.fetchUserTypeListSuccess(userTypeList)
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to otps";
      dispatch(
        userTypeListSlice.actions.fetchUserTypeListFailure(errorMessage)
      );
    }
  }
);

export const {
  fetchUserWarehouseStart,
  fetchUserWarehouseSuccess,
  fetchUserWarehouseFailure,
} = userWarehouseSlice.actions;

export const fetchUserWarehouseThunk = createAsyncThunk(
  "userWarehouse/fetchUserWarehouse",
  async (_, { dispatch }) => {
    dispatch(fetchUserWarehouseStart());
    try {
      const warehouses = await fetchUserWarehouseService();
      dispatch(fetchUserWarehouseSuccess(warehouses));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch user warehouses";
      dispatch(fetchUserWarehouseFailure(errorMessage));
    }
  }
);
