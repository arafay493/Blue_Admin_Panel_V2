export interface ListAllLocationTypes {
  // id: number;
  // name: string;
}

export interface ListAllLocationState {
  allLocation: ListAllLocationTypes; // An array of vouchers
  loading: boolean;
  error: string | null;
}

export const initialListAllLocationstate: ListAllLocationState = {
  allLocation: [],
  loading: false,
  error: null,
};

export interface ListAllContractorsTypes {
  // id: number;
  // name: string;
}

export interface ListAllContractorState {
  allContractors: ListAllContractorsTypes;
  loading: boolean;
  error: string | null;
}

export const initialListAllContractorsstate: ListAllContractorState = {
  allContractors: [],
  loading: false,
  error: null,
};

export interface ListAllVehiclesTypes {
  // id: number;
  // name: string;
}

export interface ListAllVehiclesState {
  allVehicles: ListAllVehiclesTypes; // An array of vouchers
  loading: boolean;
  error: string | null;
}

export const initialListAllVehiclesstate: ListAllVehiclesState = {
  allVehicles: [],
  loading: false,
  error: null,
};

export interface ListAllDriversTypes {
  // id: number;
  // name: string;
}

export interface ListAllDriversState {
  allDrivers: ListAllDriversTypes; // An array of vouchers
  loading: boolean;
  error: string | null;
}

export const initialListAllDriversstate: ListAllDriversState = {
  allDrivers: [],
  loading: false,
  error: null,
};

export interface CreateMasterConsignmentTypes {
  // id: number;
  // name: string;
}

export interface UpdateMasterConsignmentTypes {
  // id: number;
  // name: string;
}

export interface ListAllMasterConsinmentTypes {
  id: number;
  driverID: string;
  vehicleRegNo: string;
  mainLocId: number;
  status: string;
  tranDate: string;
  contractorCode: string;
  remarks: string | null;
  transDate: string;
  subStockDocs: SubStockDoc[];
}

export interface SubStockDoc {
  contractorCode: string;
  driverID: number;
  fromLocId: number;
  id: number;
  itemStatusWill: string;
  locId: number;
  remarks: string;
  status: string;
  tranDate: string;
  transType: string;
  type: string;
  vehicleRegNo: string;
  lines?: Line[];
}

export interface Line {
  amount: number;
  id: number;
  itemId: number;
  lineDetails: any[];
  locId: number;
  qty: number;
  stockId: number;
}

export interface ListAllMasterConsinmentTypesState {
  allMasterConsignment: ListAllMasterConsinmentTypes[];
  loading: boolean;
  error: string | null;
}

export const initialListAllMasterConsinmentTypesstate: ListAllMasterConsinmentTypesState = {
  allMasterConsignment: [],
  loading: false,
  error: null,
};

export interface UpdateStockStatusPayload {
  driverID: string;
  stockID: number;
  status: string;
}

export interface UpdateStockStatusResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data?: {
    driverID: string;
    stockID: number;
    status: string;
    updatedAt: string;
  };
}

// Define the type for each line detail
interface LineDetail {
  at: string;
  barCode: string;
  expDate: string;
  id: number;
  inDate: string;
  locId: number;
  location: string;
  lotNumber: string;
  mnfDate: string;
  mnfSerial: string;
  status: string;
  warrantyEndDate: string;
  warrantyStartDate: string;
}

interface LineItem {
  amount: number;
  id: number;
  itemId: number;
  lineDetails: LineDetail[];
}

export interface FetchStockDetailsResponseType {
  contractorCode: string;
  driverID: number;
  fromLocId: number;
  id: number;
  itemStatusWill: string;
  lines: LineItem[];
  locId: number;
  qty: number;
  stockId: number;
}

export interface ListAllFetchStockDetailsTypesState {
  stockDetails: FetchStockDetailsResponseType[];
  loading: boolean;
  error: string | null;
}

export const initialListAllFetchStockDetailsTypesstate: ListAllFetchStockDetailsTypesState = {
  stockDetails: [],
  loading: false,
  error: null,
};

export interface ListAllStockTypes {
  key: string;
  value: string;
}

export interface ListAllStockTypesState {
  stockTypes: ListAllStockTypes[];
  loading: boolean;
  error: string | null;
}

export const initialListAllStockstate: ListAllStockTypesState = {
  stockTypes: [],
  loading: false,
  error: null,
};

export interface ListAllStockInOutTypes {
  id: number;
  tranDate: string;
  type: string;
  remarks: string;
}

export interface ListAllStockInOutTypesState {
  stockInOutTypes: ListAllStockInOutTypes[];
  loading: boolean;
  error: string | null;
}

export const initialListAllStockInOutstate: ListAllStockInOutTypesState = {
  stockInOutTypes: [],
  loading: false,
  error: null,
};

export interface AddStockInOutPayload {
  id: number;
  tranDate: string;
  type: string;
  remarks: string;
  itemStatusWill: string;
  contractorCode: string;
  driverID: number;
  vehicleRegNo: string;
  status: string;
  locId: number;
  fromLocId: number;
  transType: string;
  lines: {
    id: number;
    stockId: number;
    itemId: number;
    qty: number;
    amount: number;
    locId: number;
    lineDetails: {
      id: number;
      barCode: string;
      locId: number;
      mnfSerial: string;
      lotNumber: string;
      expDate: string;
      mnfDate: string;
      inDate: string;
      warrantyStartDate: string;
      warrantyEndDate: string;
      location: string;
      status: string;
      at: string;
    }[];
  }[];
}

export interface AddStockInOutResponse {
  // Define response fields based on the actual response
}
