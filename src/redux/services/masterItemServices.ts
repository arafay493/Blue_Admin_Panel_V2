import axiosInstance from "../axios";
import {
  AddMasterItemsTypeType,
  AddMasterItemTypePayload,
  AddSingleItemsTypes,
  AllBatchStatusReport,
  AllStockCustomers,
  CylinderHistory,
  CylinderStatus,
  DeleteMasterItemTypePayload,
  DeleteMasterItemTypeResponse,
  ListAllItemsTypes,
  ListAllMasterItemsState,
  ListAllMasterItemsTypes,
  ListSingleItemsTypes,
  MasterBatch,
  SingleMasterBatch,
  UpdateSingleItemsTypes,
} from "../models/masterItemsTypes";
import { updateStatusFunction } from "../utils/updateStatus";

// ? List All Master Items Types
export const ListAllMasterItemTypesService = async (): Promise<
  ListAllMasterItemsState[]
> => {
  const response = await axiosInstance.get<{
    data: ListAllMasterItemsState[];
  }>(`/Item/ListAllItemTypes`);

  return response.data.data;
};

// ? Add Master Item Type
export const AddMasterItemType = (
  payload: AddMasterItemTypePayload
): Promise<AddMasterItemsTypeType> => {
  return axiosInstance
    .post<{ data: AddMasterItemsTypeType }>(`/Item/AddItemType`, payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error?.response;
    });
};

// ? Delete Master Item Type
export const DeleteMasterItemType = (
  payload: DeleteMasterItemTypePayload
): Promise<DeleteMasterItemTypeResponse> => {
  return axiosInstance
    .delete<{ data: DeleteMasterItemTypeResponse }>(
      `/Item/DeleteItemType/${payload.id}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error?.response;
    });
};

// ? List All Items Types
export const ListAllItemTypesService = async (): Promise<
  ListAllItemsTypes[]
> => {
  const response = await axiosInstance.get<{
    data: ListAllItemsTypes[];
  }>(`/Item/ListAll`);
  return response.data.data;
};

// ? List Single Items Types
export const ListSingleItemTypesService = async (
  payload: any
): Promise<ListSingleItemsTypes> => {
  const response = await axiosInstance.get<{
    data: ListSingleItemsTypes;
  }>(`/Item/Get/${payload}`);
  return response.data.data;
};

// ? update List Single Items Types
export const UpdateSingleItemTypesService = async (
  payload: any
): Promise<UpdateSingleItemsTypes> => {
  return axiosInstance
    .post<{ data: UpdateSingleItemsTypes }>(`/Item/Update`, payload)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

// ? Add List Items Types
export const AddItemTypesService = async (
  payload: any
): Promise<AddSingleItemsTypes> => {
  return axiosInstance
    .post<{ data: AddSingleItemsTypes }>(`/Item/Add`, payload)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

// ? List All Items Types
export const ListAllBatchStatusReport = async (): Promise<
  AllBatchStatusReport[]
> => {
  const response = await axiosInstance.get<{
    data: AllBatchStatusReport[];
  }>(`/Batch/GetOverallBatchesStatusIncludingDropCylinders`);
  return response.data.data;
};

// ? List All Cylinder Status
export const fetchAllCylinderStatus = async (
  cityId: number | null
): Promise<CylinderStatus[]> => {
  try {
    const response = await axiosInstance.get<{
      data: CylinderStatus[];
    }>(
      cityId
        ? `/CylinderStatus/ListAllCylinderStatusCityWise?CityId=${cityId}`
        : `/CylinderStatus/ListAllCylinderStatus`
    );

    // Apply transformation function
    const data = updateStatusFunction(
      response.data.data,
      "status",
      "invoiceType"
    );

    return data || [];
  } catch (error) {
    console.error("Error fetching cylinder status:", error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch data");
  }
};

// ? List All Cylinder Status
export const fetchCylinderHistory = async (
  barcode: string
): Promise<CylinderHistory> => {
  const response = await axiosInstance.get<{
    data: CylinderHistory;
  }>(
    `/CylinderStatus/GetCylinderHistory?barCode=${barcode}&lastCount=10000&skipRecords=0`
  );
  return response.data.data;
};

// ? List All Stock Customers
export const ListAllStockCustomers = async (): Promise<AllStockCustomers[]> => {
  const response = await axiosInstance.get<{
    data: AllStockCustomers[];
  }>(`/StockTransferToCustomerManagement/ListAllCylinderStatus`);
  return response.data.data;
};

// ? List All Master Batch
export const fetchMasterBatch = async (): Promise<MasterBatch> => {
  const response = await axiosInstance.get<{
    data: MasterBatch;
  }>(`/Batch/ListAll`);
  return response.data.data;
};

// ? Fetch Single Master Batch
export const fetchSingleMasterBatch = async (
  id: any
): Promise<SingleMasterBatch> => {
  const response = await axiosInstance.get<{
    data: SingleMasterBatch;
  }>(`/Batch/Get/${id}`);
  return response.data.data;
};
