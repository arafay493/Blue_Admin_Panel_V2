import {
  combineReducers,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  GetAllMenusApiResponse,
  GetAllUserTypeApiResponse,
  GetMenusByUserTypeApiResponse,
  initialGetAllMenusState,
  initialGetAllUserTypesState,
  initialGetMenusByUserTypeState,
} from "../models/menuTypes";
import {
  GetAllMenusService,
  GetAllUserTypesService,
  GetMenusByUserTypeIdService,
} from "../services/menuServices";

const getAllMenusSlice = createSlice({
  name: "getAllMenus",
  initialState: initialGetAllMenusState,
  reducers: {
    fetchGetAllMenusStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchGetAllMenusSuccess(
      state,
      action: PayloadAction<GetAllMenusApiResponse>
    ) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchGetAllMenusFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const getAllUserTypesSlice = createSlice({
  name: "getAllUserTypes",
  initialState: initialGetAllUserTypesState,
  reducers: {
    fetchGetAllUserTypesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchGetAllUserTypesSuccess(
      state,
      action: PayloadAction<GetAllUserTypeApiResponse>
    ) {
      state.loading = false;
      state.userTypes = action.payload.data;
    },
    fetchGetAllUserTypesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const getMenusByUserTypeSlice = createSlice({
  name: "getMenusByUserType",
  initialState: initialGetMenusByUserTypeState,
  reducers: {
    fetchGetMenusByUserTypeStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchGetMenusByUserTypeSuccess(
      state,
      action: PayloadAction<GetMenusByUserTypeApiResponse>
    ) {
      state.loading = false;
      state.datas = action.payload.data;
    },
    fetchGetMenusByUserTypeFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchGetMenusByUserTypeFormStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchGetMenusByUserTypeFormSuccess(
      state,
      action: PayloadAction<GetMenusByUserTypeApiResponse>
    ) {
      state.loading = false;
      state.form = action.payload.data;
    },
    fetchGetMenusByUserTypeFormFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchGetAllMenusStart,
  fetchGetAllMenusSuccess,
  fetchGetAllMenusFailure,
} = getAllMenusSlice.actions;

export const {
  fetchGetAllUserTypesStart,
  fetchGetAllUserTypesSuccess,
  fetchGetAllUserTypesFailure,
} = getAllUserTypesSlice.actions;

export const {
  fetchGetMenusByUserTypeStart,
  fetchGetMenusByUserTypeSuccess,
  fetchGetMenusByUserTypeFailure,
} = getMenusByUserTypeSlice.actions;

export const {
  fetchGetMenusByUserTypeFormStart,
  fetchGetMenusByUserTypeFormSuccess,
  fetchGetMenusByUserTypeFormFailure,
} = getMenusByUserTypeSlice.actions;

export const fetchGetAllMenusThunk = createAsyncThunk<void, void>(
  "getAllMenus/fetchGetAllMenus",
  async (_, { dispatch }) => {
    try {
      dispatch(fetchGetAllMenusStart());
      const menus: GetAllMenusApiResponse = await GetAllMenusService();
      dispatch(fetchGetAllMenusSuccess(menus));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch menus data";
      dispatch(fetchGetAllMenusFailure(errorMessage));
    }
  }
);

export const fetchGetAllUserTypesThunk = createAsyncThunk<void, void>(
  "getAllUserTypes/fetchGetAllUserTypes",
  async (_, { dispatch }) => {
    try {
      dispatch(fetchGetAllUserTypesStart());
      const userTypes: GetAllUserTypeApiResponse = await GetAllUserTypesService();
      dispatch(fetchGetAllUserTypesSuccess(userTypes));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch user types data";
      dispatch(fetchGetAllUserTypesFailure(errorMessage));
    }
  }
);

export const fetchGetMenusByUserTypeThunk = createAsyncThunk<void, number>(
  "getMenusByUserType/fetchGetMenusByUserType",
  async (userTypeId, { dispatch }) => {
    try {
      dispatch(fetchGetMenusByUserTypeStart());
      const menusByUserType: GetMenusByUserTypeApiResponse = await GetMenusByUserTypeIdService(
        userTypeId
      );
      dispatch(fetchGetMenusByUserTypeSuccess(menusByUserType));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch menus by user type";
      dispatch(fetchGetMenusByUserTypeFailure(errorMessage));
    }
  }
);
export const fetchGetMenusByUserTypeFormThunk = createAsyncThunk<void, number>(
  "getMenusByUserType/fetchGetMenusByUserType",
  async (userTypeId, { dispatch }) => {
    try {
      dispatch(fetchGetMenusByUserTypeFormStart());
      const menusByUserType: GetMenusByUserTypeApiResponse = await GetMenusByUserTypeIdService(
        userTypeId
      );
      dispatch(fetchGetMenusByUserTypeFormSuccess(menusByUserType));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch menus by user type";
      dispatch(fetchGetMenusByUserTypeFormFailure(errorMessage));
    }
  }
);

const menuReducer = combineReducers({
  getAllMenus: getAllMenusSlice.reducer,
  getAllUserTypes: getAllUserTypesSlice.reducer,
  getMenusByUserType: getMenusByUserTypeSlice.reducer,
});

export default menuReducer;
