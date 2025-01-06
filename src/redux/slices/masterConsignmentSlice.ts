import {
  createSlice,
  PayloadAction,
  combineReducers,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import {
  initialListAllContractorsstate,
  initialListAllDriversstate,
  initialListAllLocationstate,
  initialListAllMasterConsinmentTypesstate,
  initialListAllVehiclesstate,
  ListAllContractorsTypes,
  ListAllDriversTypes,
  ListAllLocationTypes,
  ListAllMasterConsinmentTypes,
  ListAllVehiclesTypes,
  FetchStockDetailsResponseType,
  initialListAllFetchStockDetailsTypesstate,
  ListAllStockTypes,
  initialListAllStockstate,
  ListAllStockInOutTypes,
  initialListAllStockInOutstate,
} from "../models/masterConsignmentTypes";
import {
  ListAllContractorsService,
  ListAllDriversService,
  ListAllLocationsService,
  ListAllMasterConsignment,
  ListAllVehiclesService,
  fetchStockDetailsByID,
  ListAllStockTypesService,
  ListAllStockInOut,
} from "../services/masterConsignmentService";

const ListAllLocationSlice = createSlice({
  name: "ListAllLocationSlice",
  initialState: initialListAllLocationstate,
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess(state, action: PayloadAction<ListAllLocationTypes>) {
      state.loading = false;
      state.allLocation = action.payload;
    },
    fetchFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const ListAllStockInOutSlice = createSlice({
  name: "ListAllStockInOutSlice",
  initialState: initialListAllStockInOutstate,
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess(state, action: PayloadAction<ListAllStockInOutTypes[]>) {
      state.loading = false;
      state.stockInOutTypes = action.payload;
    },
    fetchFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const ListAllContractorsSlice = createSlice({
  name: "ListAllContractorsSlice",
  initialState: initialListAllContractorsstate,
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess(state, action: PayloadAction<ListAllContractorsTypes>) {
      state.loading = false;
      state.allContractors = action.payload;
    },
    fetchFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const ListAllDriversSlice = createSlice({
  name: "ListAllDriversSlice",
  initialState: initialListAllDriversstate,
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess(state, action: PayloadAction<ListAllDriversTypes>) {
      state.loading = false;
      state.allDrivers = action.payload;
    },
    fetchFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const ListAllVehiclesSlice = createSlice({
  name: "ListAllVehiclesSlice",
  initialState: initialListAllVehiclesstate,
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess(state, action: PayloadAction<ListAllVehiclesTypes>) {
      state.loading = false;
      state.allVehicles = action.payload;
    },
    fetchFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const ListAllMasterConsignmentSlice = createSlice({
  name: "ListAllMasterConsignmentSlice",
  initialState: initialListAllMasterConsinmentTypesstate,
  reducers: {
    fetchStartMasterConsignmentList(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSuccessMasterConsignmentList(
      state,
      action: PayloadAction<ListAllMasterConsinmentTypes[]>
    ) {
      state.loading = false;
      // Ensure action.payload is an array
      state.allMasterConsignment = Array.isArray(action.payload)
        ? action.payload
        : [action.payload]; // Convert single item to an array if needed
    },
    fetchFailureMasterConsignmentList(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const ListAllStockDetailSlice = createSlice({
  name: "ListAllStockDetailSlice",
  initialState: initialListAllFetchStockDetailsTypesstate,
  reducers: {
    fetchStockDetailStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchStockDetailSuccess(
      state,
      action: PayloadAction<FetchStockDetailsResponseType[]>
    ) {
      state.loading = false;
      state.stockDetails = action.payload;
    },
    fetchStockDetailFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const ListAllStockTypeSlice = createSlice({
  name: "ListAllStockTypeSlice",
  initialState: initialListAllStockstate,
  reducers: {
    fetchStockTypeStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchStockTypeSuccess(state, action: PayloadAction<ListAllStockTypes[]>) {
      state.loading = false;
      state.stockTypes = action.payload;
    },
    fetchStockTypeFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const masterConsignmentReducer = combineReducers({
  allLocations: ListAllLocationSlice.reducer,
  allContractors: ListAllContractorsSlice.reducer,
  allDrivers: ListAllDriversSlice.reducer,
  allVehicles: ListAllVehiclesSlice.reducer,
  allMasterConsignment: ListAllMasterConsignmentSlice.reducer,
  stockdetails: ListAllStockDetailSlice.reducer,
  stockTypes: ListAllStockTypeSlice.reducer,
  stockInOut: ListAllStockInOutSlice.reducer,
});

export default masterConsignmentReducer;

// Async Thunks for fetching data
export const fetchListAllStockInOut = createAsyncThunk(
  "FilledMovement/StockInOut",
  async (_, { dispatch }) => {
    dispatch(ListAllStockInOutSlice.actions.fetchStart());
    try {
      const res: ListAllStockInOutTypes = await ListAllStockInOut();

      const formattedRes = Array.isArray(res) ? res : [res];

      dispatch(ListAllStockInOutSlice.actions.fetchSuccess(formattedRes));
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Failed to fetch Stock In/Out Types";
      dispatch(ListAllStockInOutSlice.actions.fetchFailure(errorMessage));
    }
  }
);

// Async Thunks for fetching data
export const fetchListAllStockTypes = createAsyncThunk(
  "FilledMovmement/StockTypes",
  async (_, { dispatch }) => {
    dispatch(ListAllStockTypeSlice.actions.fetchStockTypeStart());
    try {
      const res = await ListAllStockTypesService();
      dispatch(ListAllStockTypeSlice.actions.fetchStockTypeSuccess(res));
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Failed to fetch Stock Types";
      dispatch(
        ListAllStockTypeSlice.actions.fetchStockTypeFailure(errorMessage)
      );
    }
  }
);

// Async Thunks for fetching data
export const fetchListAllLocations = createAsyncThunk(
  "MasterConsignment/fetchListAllLocations",
  async (_, { dispatch }) => {
    dispatch(ListAllLocationSlice.actions.fetchStart());
    try {
      const res = await ListAllLocationsService();
      dispatch(ListAllLocationSlice.actions.fetchSuccess(res));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch Locations";
      dispatch(ListAllLocationSlice.actions.fetchFailure(errorMessage));
    }
  }
);

// Async Thunks for fetching data
export const fetchAllContractors = createAsyncThunk(
  "MasterConsignment/fetchAllContractors",
  async (_, { dispatch }) => {
    dispatch(ListAllContractorsSlice.actions.fetchStart());
    try {
      const res = await ListAllContractorsService();
      dispatch(ListAllContractorsSlice.actions.fetchSuccess(res));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch Contractors";
      dispatch(ListAllContractorsSlice.actions.fetchFailure(errorMessage));
    }
  }
);

// Async Thunks for fetching data
export const fetchAllDrivers = createAsyncThunk(
  "MasterConsignment/fetchAllDrivers",
  async (payload: string, { dispatch }) => {
    dispatch(ListAllDriversSlice.actions.fetchStart());
    try {
      const res = await ListAllDriversService(payload);
      dispatch(ListAllDriversSlice.actions.fetchSuccess(res));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch Drivers";
      dispatch(ListAllDriversSlice.actions.fetchFailure(errorMessage));
    }
  }
);

// Async Thunks for fetching data
export const fetchAllVehicles = createAsyncThunk(
  "MasterConsignment/fetchAllVehicles",
  async (payload: string, { dispatch }) => {
    dispatch(ListAllVehiclesSlice.actions.fetchStart());
    try {
      const res = await ListAllVehiclesService(payload);
      dispatch(ListAllVehiclesSlice.actions.fetchSuccess(res));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch Vehicles";
      dispatch(ListAllVehiclesSlice.actions.fetchFailure(errorMessage));
    }
  }
);

// Async Thunks for fetching data
export const fetchAllMasterConsignment = createAsyncThunk(
  "MasterConsignment/fetchAllVehicles",
  async (_, { dispatch }) => {
    dispatch(
      ListAllMasterConsignmentSlice.actions.fetchStartMasterConsignmentList()
    );
    try {
      const res = await ListAllMasterConsignment();

      const data = Array.isArray(res) ? res : [res];

      dispatch(
        ListAllMasterConsignmentSlice.actions.fetchSuccessMasterConsignmentList(
          data
        )
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch master consignment";
      dispatch(
        ListAllMasterConsignmentSlice.actions.fetchFailureMasterConsignmentList(
          errorMessage
        )
      );
    }
  }
);

export const fetchStockDetails = createAsyncThunk(
  "MasterConsignment/fetchStockDetails",
  async (id: string, { dispatch }) => {
    dispatch(ListAllStockDetailSlice.actions.fetchStockDetailStart());
    try {
      const res = await fetchStockDetailsByID(id);

      const responseArray = Array.isArray(res) ? res : [res];

      dispatch(
        ListAllStockDetailSlice.actions.fetchStockDetailSuccess(responseArray)
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch stock details";
      dispatch(
        ListAllStockDetailSlice.actions.fetchStockDetailFailure(errorMessage)
      );
    }
  }
);
