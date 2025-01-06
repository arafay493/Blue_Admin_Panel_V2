import {
  createSlice,
  PayloadAction,
  combineReducers,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import {
  AllBatchStatusReport,
  CylinderHistory,
  CylinderStatus,
  initialAllBatchStatusReportstate,
  initialCylinderHistorystate,
  initialCylinderStatusstate,
  initialListAllItemstate,
  initialListAllMasterItemstate,
  initialListSingleItemstate,
  initialMasterBatchstate,
  ListAllItemsTypes,
  ListAllMasterItemsTypes,
  ListSingleItemsTypes,
  MasterBatch,
} from "../models/masterItemsTypes";
import {
  fetchAllCylinderStatus,
  fetchCylinderHistory,
  fetchMasterBatch,
  ListAllBatchStatusReport,
  ListAllItemTypesService,
  ListAllMasterItemTypesService,
  ListSingleItemTypesService,
} from "../services/masterItemServices";

const listAllMasterItemsSlice = createSlice({
  name: "listAllMasterItemsSlice",
  initialState: initialListAllMasterItemstate,
  reducers: {
    fetchAllMasterItemTypesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAllMasterItemTypesSuccess(
      state,
      action: PayloadAction<ListAllMasterItemsTypes[]>
    ) {
      state.loading = false;
      state.masterItemTypes = action.payload;
    },
    fetchAllMasterItemTypesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const listAllItemsSlice = createSlice({
  name: "listAllItemsSlice",
  initialState: initialListAllItemstate,
  reducers: {
    fetchAllItemTypesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAllItemTypesSuccess(
      state,
      action: PayloadAction<ListAllItemsTypes[]>
    ) {
      state.loading = false;
      state.itemTypes = action.payload;
    },
    fetchAllItemTypesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const listSingleItemsSlice = createSlice({
  name: "listSingleItemsSlice",
  initialState: initialListSingleItemstate,
  reducers: {
    fetchSingleItemTypesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSingleItemTypesSuccess(
      state,
      action: PayloadAction<ListSingleItemsTypes>
    ) {
      state.loading = false;
      state.singleItemTypes = action.payload;
    },
    fetchSingleItemTypesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const batchStatusReportSlice = createSlice({
  name: "batchStatusReportSlice",
  initialState: initialAllBatchStatusReportstate,
  reducers: {
    fetchBatchStatusReportStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchBatchStatusReportSuccess(
      state,
      action: PayloadAction<AllBatchStatusReport[]>
    ) {
      state.loading = false;
      state.batchStatusReports = action.payload;
    },
    fetchBatchStatusReportFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const CylinderStatusSlice = createSlice({
  name: "CylinderStatusSlice",
  initialState: initialCylinderStatusstate,
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess(state, action: PayloadAction<CylinderStatus[]>) {
      state.loading = false;
      state.cylinderStatus = action.payload;
    },
    fetchFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const CylinderHistorySlice = createSlice({
  name: "CylinderHistorySlice",
  initialState: initialCylinderHistorystate,
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess(state, action: PayloadAction<CylinderHistory>) {
      state.loading = false;
      state.cylinderHistory = action.payload;
    },
    fetchFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const MasterBatchSlice = createSlice({
  name: "MasterBatchSlice",
  initialState: initialMasterBatchstate,
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess(state, action: PayloadAction<MasterBatch>) {
      state.loading = false;
      state.masterBatch = action.payload;
    },
    fetchFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const rootReducer = combineReducers({
  masterItemTypes: listAllMasterItemsSlice.reducer,
  itemTypes: listAllItemsSlice.reducer,
  singleItemTypes: listSingleItemsSlice.reducer,
  batchStatus: batchStatusReportSlice.reducer,
  cylinderStatus: CylinderStatusSlice.reducer,
  cylinderHistory: CylinderHistorySlice.reducer,
  masterBatch: MasterBatchSlice.reducer,
  // Add more slices here for other entities
});

export default rootReducer;

// Async Thunks for fetching data
export const fetchAllMasterItemTypes = createAsyncThunk(
  "masterItems/fetchAllMasterItemTypes",
  async (_, { dispatch }) => {
    dispatch(listAllMasterItemsSlice.actions.fetchAllMasterItemTypesStart());
    try {
      const itemTypes: any = await ListAllMasterItemTypesService();
      dispatch(
        listAllMasterItemsSlice.actions.fetchAllMasterItemTypesSuccess(
          itemTypes
        )
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch Master Item Types";
      dispatch(
        listAllMasterItemsSlice.actions.fetchAllMasterItemTypesFailure(
          errorMessage
        )
      );
    }
  }
);

// Async Thunks for fetching data
export const fetchAllItemTypes = createAsyncThunk(
  "Items/fetchAllItemTypes",
  async (_, { dispatch }) => {
    dispatch(listAllItemsSlice.actions.fetchAllItemTypesStart());
    try {
      const itemTypes = await ListAllItemTypesService();
      dispatch(listAllItemsSlice.actions.fetchAllItemTypesSuccess(itemTypes));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch Item Types";
      dispatch(
        listAllItemsSlice.actions.fetchAllItemTypesFailure(errorMessage)
      );
    }
  }
);

// Async Thunks for fetching data
export const fetchSingleItemTypes = createAsyncThunk(
  "Items/fetchSingleItemTypes",
  async (id: number, { dispatch }) => {
    dispatch(listSingleItemsSlice.actions.fetchSingleItemTypesStart());
    try {
      const itemTypes = await ListSingleItemTypesService(id);
      dispatch(
        listSingleItemsSlice.actions.fetchSingleItemTypesSuccess(itemTypes)
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch Single Item Types";
      dispatch(
        listSingleItemsSlice.actions.fetchSingleItemTypesFailure(errorMessage)
      );
    }
  }
);

// Async Thunks for fetching data
export const fetchAllBatchStatusReport = createAsyncThunk(
  "Batch/fetchAllBatchStatusReport",
  async (_, { dispatch }) => {
    dispatch(batchStatusReportSlice.actions.fetchBatchStatusReportStart());
    try {
      const itemTypes = await ListAllBatchStatusReport();
      dispatch(
        batchStatusReportSlice.actions.fetchBatchStatusReportSuccess(itemTypes)
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch Batch Status Reports";
      dispatch(
        batchStatusReportSlice.actions.fetchBatchStatusReportFailure(
          errorMessage
        )
      );
    }
  }
);

// Async Thunks for fetching data
export const fetchAllCylinderStatusReports = createAsyncThunk(
  "Batch/fetchAllBatchStatusReport",
  async (cityId: number | null, { dispatch }) => {
    dispatch(CylinderStatusSlice.actions.fetchStart());
    try {
      const itemTypes = await fetchAllCylinderStatus(cityId);
      dispatch(CylinderStatusSlice.actions.fetchSuccess(itemTypes));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch Cylinder Status Reports";
      dispatch(CylinderStatusSlice.actions.fetchFailure(errorMessage));
    }
  }
);

// Async Thunks for fetching data
export const fetchCylinderHistoryReports = createAsyncThunk(
  "Batch/fetchAllBatchStatusReport",
  async (barcode: string, { dispatch }) => {
    dispatch(CylinderHistorySlice.actions.fetchStart());
    try {
      const res = await fetchCylinderHistory(barcode);
      dispatch(CylinderHistorySlice.actions.fetchSuccess(res));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch Cylinder History Reports";
      dispatch(CylinderHistorySlice.actions.fetchFailure(errorMessage));
    }
  }
);

// Async Thunks for fetching data
export const fetchMasterBatchReports = createAsyncThunk(
  "Batch/fetchAllBatchStatusReport",
  async (_, { dispatch }) => {
    dispatch(MasterBatchSlice.actions.fetchStart());
    try {
      const res = await fetchMasterBatch();
      dispatch(MasterBatchSlice.actions.fetchSuccess(res));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch Master Batch Reports";
      dispatch(MasterBatchSlice.actions.fetchFailure(errorMessage));
    }
  }
);
