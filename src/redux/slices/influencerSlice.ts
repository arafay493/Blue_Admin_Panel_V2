// @ts-nocheck
import {
  createSlice,
  PayloadAction,
  combineReducers,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import {
  initialListAllApprovedInfluencerstate,
  initialListAllPendingInfluencerstate,
  initialListAllReferrer,
  initialListAllReferrerDashboardDetails,
  initialListAllRejectedInfluencerstate,
  ListAllApprovedInfluencersTypes,
  ListAllPendingInfluencersTypes,
  ListAllReferrerState,
  ListAllRejectedInfluencersTypes,
  Referrer,
  ReferrerDashboardDetails,
} from "../models/influencerTypes";
import {
  ListAllApprovedInfluencers,
  ListAllPendingInfluencers,
  ListAllReferrers,
  ListAllReferrersDashboardDetails,
  ListAllRejectedInfluencers,
} from "../services/influencerService";

const PendingInfluencerSlice = createSlice({
  name: "PendingInfluencerSlice",
  initialState: initialListAllPendingInfluencerstate,
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess(
      state,
      action: PayloadAction<ListAllPendingInfluencersTypes[]>
    ) {
      state.loading = false;
      state.pendingInfluencers = action.payload;
    },
    fetchFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const ApprovedInfluencerSlice = createSlice({
  name: "ApprovedInfluencerSlice",
  initialState: initialListAllApprovedInfluencerstate,
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess(
      state,
      action: PayloadAction<ListAllApprovedInfluencersTypes[]>
    ) {
      state.loading = false;
      state.approvedInfluencers = action.payload;
    },
    fetchFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const RejectedInfluencerSlice = createSlice({
  name: "RejectedInfluencerSlice",
  initialState: initialListAllRejectedInfluencerstate,
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess(
      state,
      action: PayloadAction<ListAllRejectedInfluencersTypes[]>
    ) {
      state.loading = false;
      state.rejectedInfluencers = action.payload;
    },
    fetchFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const ReferrerSlice = createSlice({
  name: "ReferrerSlice",
  initialState: initialListAllReferrer,
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess(state, action: PayloadAction<Referrer[]>) {
      state.loading = false;
      state.referrer = action.payload;
    },
    fetchFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const listAllReferrerDashboardSlice = createSlice({
  name: "listAllReferrerDashboard",
  initialState: initialListAllReferrerDashboardDetails,
  reducers: {
    fetchReferrerDashboardStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchReferrerDashboardSuccess(
      state,
      action: PayloadAction<ReferrerDashboardDetails[]>
    ) {
      state.loading = false;
      state.referrerDetails = action.payload;
    },
    fetchReferrerDashboardFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const influencerReducer = combineReducers({
  pendingInfluencers: PendingInfluencerSlice.reducer,
  approvedInfluencers: ApprovedInfluencerSlice.reducer,
  rejectedInfluencers: RejectedInfluencerSlice.reducer,
  ReferrerInfluencer: ReferrerSlice.reducer,
  referrerDashboard: listAllReferrerDashboardSlice.reducer,
  // Add more slices here for other entities
});
export default influencerReducer;

// Async Thunks for fetching data
export const fetchAllPendingInfluencer = createAsyncThunk(
  "Batch/fetchAllBatchStatusReport",
  async (_, { dispatch }) => {
    dispatch(PendingInfluencerSlice.actions.fetchStart());
    try {
      const res = await ListAllPendingInfluencers();
      dispatch(PendingInfluencerSlice.actions.fetchSuccess(res));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch Pending Influencers";
      dispatch(PendingInfluencerSlice.actions.fetchFailure(errorMessage));
    }
  }
);

// Async Thunks for fetching data
export const fetchAllApprovedInfluencer = createAsyncThunk(
  "Batch/fetchAllBatchStatusReport",
  async (_, { dispatch }) => {
    dispatch(ApprovedInfluencerSlice.actions.fetchStart());
    try {
      const res = await ListAllApprovedInfluencers();
      dispatch(ApprovedInfluencerSlice.actions.fetchSuccess(res));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch Approved Influencers";
      dispatch(ApprovedInfluencerSlice.actions.fetchFailure(errorMessage));
    }
  }
);

// Async Thunks for fetching data
export const fetchAllRejectedInfluencer = createAsyncThunk(
  "Batch/fetchAllBatchStatusReport",
  async (_, { dispatch }) => {
    dispatch(RejectedInfluencerSlice.actions.fetchStart());
    try {
      const res = await ListAllRejectedInfluencers();
      dispatch(RejectedInfluencerSlice.actions.fetchSuccess(res));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch Rejected Influencers";
      dispatch(RejectedInfluencerSlice.actions.fetchFailure(errorMessage));
    }
  }
);

// Async Thunks for fetching data
export const fetchAllReferrer = createAsyncThunk(
  "Batch/fetchAllReferrer",
  async (_, { dispatch }) => {
    dispatch(ReferrerSlice.actions.fetchStart());
    try {
      const res = await ListAllReferrers();
      dispatch(ReferrerSlice.actions.fetchSuccess(res));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch Referrers";
      dispatch(ReferrerSlice.actions.fetchFailure(errorMessage));
    }
  }
);

export const fetchReferrerDashboard = createAsyncThunk(
  "Batch/fetchReferrerDashboard",
  async (influencerId: number, { dispatch }) => {
    dispatch(
      listAllReferrerDashboardSlice.actions.fetchReferrerDashboardStart()
    );
    try {
      const res = await ListAllReferrersDashboardDetails(influencerId);

      dispatch(
        listAllReferrerDashboardSlice.actions.fetchReferrerDashboardSuccess(res)
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch Referrer Dashboard";
      dispatch(
        listAllReferrerDashboardSlice.actions.fetchReferrerDashboardFailure(
          errorMessage
        )
      );
    }
  }
);
