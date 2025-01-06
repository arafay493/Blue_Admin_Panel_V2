import {
  combineReducers,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  initialLocationListState,
  LocationList,
  initialLocationTypeState,
  LocationType,
  Contractor,
  initialContractorState,
  Driver,
  initialDriverState,
  initialContractorByIdState,
  ContractorById,
  Vehicle,
  initialVehicleState,
  Holiday,
  initialHolidayState,
  initialLocationByIDState,
  LocationByIDType,
} from "../models/generalSetupTypes";
import {
  fetchAllLocations,
  fetchAllLocationsTypes,
  fetchAllContractors,
  fetchAllDrivers,
  fetchAllContractorById,
  fetchAllVehicleList,
  fetchAllHolidays,
  fetchAllLocationsByID,
} from "../services/generalSetupService";

// Location Slice
const locationSlice = createSlice({
  name: "location",
  initialState: initialLocationListState,
  reducers: {
    fetchLocationStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchLocationSuccess(state, action: PayloadAction<LocationList[]>) {
      state.loading = false;
      state.locationLists = action.payload; // Populate with the fetched locations
    },
    fetchLocationByIdSuccess(state, action: PayloadAction<LocationList>) {
      state.loading = false;
      state.currentLocation = action.payload; // Set the current location
    },
    fetchLocationFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload; // Handle any error that occurred
    },
  },
});

// Location Type Slice
const locationByIDSlice = createSlice({
  name: "locationByID",
  initialState: initialLocationByIDState,
  reducers: {
    fetchLocationByIDStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchLocationByIDSuccess(state, action: PayloadAction<LocationByIDType[]>) {
      state.loading = false;
      state.locationByID = action.payload;
    },
    fetchLocationByIDFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Location Type Slice
const locationTypeSlice = createSlice({
  name: "locationType",
  initialState: initialLocationTypeState,
  reducers: {
    fetchLocationTypeStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchLocationTypeSuccess(state, action: PayloadAction<LocationType[]>) {
      state.loading = false;
      state.locationTypes = action.payload;
    },
    fetchLocationTypeFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Contractor Slice
const contractorSlice = createSlice({
  name: "contractor",
  initialState: initialContractorState,
  reducers: {
    fetchContractorStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchContractorSuccess(state, action: PayloadAction<Contractor[]>) {
      state.loading = false;
      state.contractors = action.payload;
    },
    fetchContractorFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Contractor Slice
const driverSlice = createSlice({
  name: "driver",
  initialState: initialDriverState,
  reducers: {
    fetchDriverStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDriverSuccess(state, action: PayloadAction<Driver[]>) {
      state.loading = false;
      state.drivers = action.payload;
    },
    fetchDriverFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Contractor Slice
const contractorByIdSlice = createSlice({
  name: "contractorById",
  initialState: initialContractorByIdState,
  reducers: {
    fetchcontractorByIdStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchcontractorByIdSuccess(state, action: PayloadAction<ContractorById[]>) {
      state.loading = false;
      state.contractorById = action.payload;
    },
    fetchcontractorByIdFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Vehicle Slice
const vehicleSlice = createSlice({
  name: "vehicle",
  initialState: initialVehicleState,
  reducers: {
    fetchVehicleStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchVehicleSuccess(state, action: PayloadAction<Vehicle[]>) {
      state.loading = false;
      state.vehicles = action.payload;
    },
    fetchVehicleFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Holiday Slice
const holidaySlice = createSlice({
  name: "holiday",
  initialState: initialHolidayState,
  reducers: {
    fetchHolidayStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchHolidaySuccess(state, action: PayloadAction<Holiday[]>) {
      state.loading = false;
      state.holidays = action.payload;
    },
    fetchHolidayFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Combine Reducers
const generalSetupReducer = combineReducers({
  location: locationSlice.reducer,
  locationType: locationTypeSlice.reducer,
  contractor: contractorSlice.reducer,
  driver: driverSlice.reducer,
  contractorById: contractorByIdSlice.reducer,
  vehcile: vehicleSlice.reducer,
  holiday: holidaySlice.reducer,
  locationByID: locationByIDSlice.reducer,
});

export default generalSetupReducer;

// Async Thunks for fetching data
export const fetchLocation = createAsyncThunk(
  "location/fetchLocations",
  async (_, { dispatch }) => {
    dispatch(locationSlice.actions.fetchLocationStart());
    try {
      const locations = await fetchAllLocations();
      dispatch(locationSlice.actions.fetchLocationSuccess(locations));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch locations";
      dispatch(locationSlice.actions.fetchLocationFailure(errorMessage));
    }
  }
);

// Async Thunks for fetching data
export const fetchLocationType = createAsyncThunk(
  "location/fetchLocationType",
  async (_, { dispatch }) => {
    dispatch(locationTypeSlice.actions.fetchLocationTypeStart());
    try {
      const locationsType = await fetchAllLocationsTypes();
      dispatch(
        locationTypeSlice.actions.fetchLocationTypeSuccess(locationsType)
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch locations types";
      dispatch(
        locationTypeSlice.actions.fetchLocationTypeFailure(errorMessage)
      );
    }
  }
);

// Async Thunks for fetching data
export const fetchContractor = createAsyncThunk(
  "contractor/fetchContractor",
  async (WarehouseId: number | null, { dispatch }) => {
    dispatch(contractorSlice.actions.fetchContractorStart());
    try {
      const contractor = await fetchAllContractors(WarehouseId);
      dispatch(contractorSlice.actions.fetchContractorSuccess(contractor));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch contractors";
      dispatch(contractorSlice.actions.fetchContractorFailure(errorMessage));
    }
  }
);

// Async Thunks for fetching data
export const fetchDriver = createAsyncThunk(
  "driver/fetchDriver",
  async (contractorCode: string, { dispatch }) => {
    dispatch(driverSlice.actions.fetchDriverStart());
    try {
      const drivers = await fetchAllDrivers(contractorCode);
      dispatch(driverSlice.actions.fetchDriverSuccess(drivers));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch drivers";
      dispatch(driverSlice.actions.fetchDriverFailure(errorMessage));
    }
  }
);

// Async Thunks for fetching data
export const fetchContractorById = createAsyncThunk(
  "contractorById/fetchcontractorById",
  async (code: string, { dispatch }) => {
    dispatch(contractorByIdSlice.actions.fetchcontractorByIdStart());
    try {
      const contractorById = await fetchAllContractorById(code);
      dispatch(
        contractorByIdSlice.actions.fetchcontractorByIdSuccess(contractorById)
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch contractor by Id";
      dispatch(
        contractorByIdSlice.actions.fetchcontractorByIdFailure(errorMessage)
      );
    }
  }
);

// Async Thunks for fetching data
export const fetchVehcile = createAsyncThunk(
  "vehicle/fetchVehicle",
  async (WarehouseId: number | null, { dispatch }) => {
    dispatch(vehicleSlice.actions.fetchVehicleStart());
    try {
      const vehicle = await fetchAllVehicleList(WarehouseId);
      dispatch(vehicleSlice.actions.fetchVehicleSuccess(vehicle));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch vehicle";
      dispatch(vehicleSlice.actions.fetchVehicleFailure(errorMessage));
    }
  }
);

export const fetchHolidays = createAsyncThunk(
  "holiday/fetchHolidays",
  async (_, { dispatch }) => {
    dispatch(holidaySlice.actions.fetchHolidayStart());
    try {
      const holidays = await fetchAllHolidays();
      dispatch(holidaySlice.actions.fetchHolidaySuccess(holidays));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch holidays";
      dispatch(holidaySlice.actions.fetchHolidayFailure(errorMessage));
    }
  }
);

// Async Thunk for fetching a single location by ID
export const fetchLocationById = createAsyncThunk(
  "location/fetchLocationById",
  async (id: number, { dispatch }) => {
    dispatch(locationByIDSlice.actions.fetchLocationByIDStart());
    try {
      const locationData = await fetchAllLocationsByID(id); // Assuming this fetches a single location
      dispatch(
        locationByIDSlice.actions.fetchLocationByIDSuccess(locationData)
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch location by ID";
      dispatch(
        locationByIDSlice.actions.fetchLocationByIDFailure(errorMessage)
      );
    }
  }
);
