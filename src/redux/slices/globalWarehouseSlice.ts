import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalWarehouseState {
  selectedWarehouseId: number | null;
  selectedCityId: number | null;
}

// Load initial state from localStorage
const loadState = (): GlobalWarehouseState => {
  try {
    const serializedState = localStorage.getItem('globalWarehouse');
    if (serializedState === null) {
      return {
        selectedWarehouseId: null,
        selectedCityId: null,
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      selectedWarehouseId: null,
      selectedCityId: null,
    };
  }
};

const initialState: GlobalWarehouseState = loadState();

export const globalWarehouseSlice = createSlice({
  name: "globalWarehouse",
  initialState,
  reducers: {
    setSelectedWarehouse(state, action: PayloadAction<number | null>) {
      state.selectedWarehouseId = action.payload;
      // Save to localStorage
      localStorage.setItem('globalWarehouse', JSON.stringify(state));
    },
    setSelectedCityId(state, action: PayloadAction<number | null>) {
      state.selectedCityId = action.payload;
      // Save to localStorage
      localStorage.setItem('globalWarehouse', JSON.stringify(state));
    },
  },
});

// Export the action creators
export const {
  setSelectedWarehouse,
  setSelectedCityId,
} = globalWarehouseSlice.actions;

// Export the reducer
export default globalWarehouseSlice.reducer;
