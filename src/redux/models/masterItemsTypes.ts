export interface ListAllMasterItemsTypes {
  id: number;
  name: string;
}

export interface ListAllMasterItemsState {
  masterItemTypes: ListAllMasterItemsTypes[]; // An array of vouchers
  loading: boolean;
  error: string | null;
}

export const initialListAllMasterItemstate: ListAllMasterItemsState = {
  masterItemTypes: [],
  loading: false,
  error: null,
};

// Define the response structure for the API
export interface AddMasterItemsTypeType {
  statusCode: number;
  succeeded: boolean;
  message: string;
  errors: string | null;
  data: {
    id: number;
    name: string;
  };
}

// Define the payload type
export interface AddMasterItemTypePayload {
  name: string;
}

// Define the response structure for the delete API
export interface DeleteMasterItemTypeResponse {
  statusCode: number;
  succeeded: boolean;
  message: string;
  errors: string | null;
  data: boolean;
}

// Define the payload type
export interface DeleteMasterItemTypePayload {
  id: number;
}

export interface ListAllItemsTypes {
  name: string;
  id: number;
}

export interface ListAllItemsState {
  itemTypes: ListAllItemsTypes[]; // An array of vouchers
  loading: boolean;
  error: string | null;
}

export const initialListAllItemstate: ListAllItemsState = {
  itemTypes: [],
  loading: false,
  error: null,
};

export interface ListSingleItemsTypes {}

export interface ListSingleItemsState {
  singleItemTypes: ListSingleItemsTypes;
  loading: boolean;
  error: string | null;
}

export const initialListSingleItemstate: ListSingleItemsState = {
  singleItemTypes: {},
  loading: false,
  error: null,
};

export interface AddSingleItemsTypes {}
export interface UpdateSingleItemsTypes {}

export interface AllBatchStatusReport {}

export interface AllBatchStatusReportState {
  batchStatusReports: AllBatchStatusReport[]; // An array of vouchers
  loading: boolean;
  error: string | null;
}

export const initialAllBatchStatusReportstate: AllBatchStatusReportState = {
  batchStatusReports: [],
  loading: false,
  error: null,
};

export interface AllStockCustomers {}

export interface AllStockCustomersState {
  allStockCustomers: AllStockCustomers[]; // An array of vouchers
  loading: boolean;
  error: string | null;
}

export const initialAllStockCustomersstate: AllStockCustomersState = {
  allStockCustomers: [],
  loading: false,
  error: null,
};

export interface CylinderStatus {}

export interface CylinderStatusState {
  cylinderStatus: CylinderStatus[]; // An array of vouchers
  loading: boolean;
  error: string | null;
}

export const initialCylinderStatusstate: CylinderStatusState = {
  cylinderStatus: [],
  loading: false,
  error: null,
};

export interface CylinderHistory {}

export interface CylinderHistoryState {
  cylinderHistory: CylinderHistory; // An array of vouchers
  loading: boolean;
  error: string | null;
}

export const initialCylinderHistorystate: CylinderHistoryState = {
  cylinderHistory: {},
  loading: false,
  error: null,
};

export interface MasterBatch {}

export interface MasterBatchState {
  masterBatch: MasterBatch; // An array of vouchers
  loading: boolean;
  error: string | null;
}

export const initialMasterBatchstate: MasterBatchState = {
  masterBatch: [],
  loading: false,
  error: null,
};

export interface SingleMasterBatch {}

export interface SingleMasterBatchState {
  singleMasterBatch: SingleMasterBatch; // An array of vouchers
  loading: boolean;
  error: string | null;
}

export const initialSingleMasterBatchstate: SingleMasterBatchState = {
  singleMasterBatch: {},
  loading: false,
  error: null,
};
