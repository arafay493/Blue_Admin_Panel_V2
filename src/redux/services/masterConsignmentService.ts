// @ts-nocheck
import axiosInstance from "../axios";
import {
  AddStockInOutPayload,
  AddStockInOutResponse,
  CreateMasterConsignmentTypes,
  FetchStockDetailsResponseType,
  ListAllContractorsTypes,
  ListAllLocationTypes,
  ListAllMasterConsinmentTypes,
  ListAllStockInOutTypes,
  ListAllStockTypes,
  ListAllVehiclesTypes,
  UpdateMasterConsignmentTypes,
  UpdateStockStatusPayload,
  UpdateStockStatusResponse,
} from "../models/masterConsignmentTypes";

// ? List All locations
export const ListAllLocationsService = async (): Promise<
  ListAllLocationTypes
> => {
  const response = await axiosInstance.get<{
    data: ListAllLocationTypes;
  }>(`/StockInOut/ListAllLocations`);
  return response.data;
};

// ? List All Contractors
export const ListAllContractorsService = async (): Promise<
  ListAllContractorsTypes
> => {
  const response = await axiosInstance.get<{
    data: ListAllContractorsTypes;
  }>(`/StockInOut/ListAllContractors`);
  return response.data;
};

// ? List All Drivers
export const ListAllDriversService = async (
  payload: string
): Promise<ListAllVehiclesTypes> => {
  const response = await axiosInstance.get<{
    data: ListAllVehiclesTypes;
  }>(`/StockInOut/ListAllDrivers/${payload}`);
  return response.data;
};

// ? List All Vehicles
export const ListAllVehiclesService = async (
  payload: string
): Promise<ListAllVehiclesTypes> => {
  const response = await axiosInstance.get<{
    data: ListAllVehiclesTypes;
  }>(`/StockInOut/ListAllVehicles/${payload}`);
  return response.data;
};

// ? update List Single Items Types
export const CreateMasterConsignmentService = async (
  payload: any
): Promise<CreateMasterConsignmentTypes> => {
  return axiosInstance
    .post<{ data: CreateMasterConsignmentTypes }>(
      `/StockInOut/CreateMasterConsignment`,
      payload
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const UpdateMasterConsignmentService = async (
  payload: any
): Promise<UpdateMasterConsignmentTypes> => {
  return axiosInstance
    .post<{ data: UpdateMasterConsignmentTypes }>(
      `/StockInOut/UpdateSubConsignment`,
      payload
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const AddStockInOutService = async (
  payload: AddStockInOutPayload
): Promise<AddStockInOutResponse> => {
  return axiosInstance
    .post<{ data: AddStockInOutResponse }>(`/StockInOut/Add`, payload)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

// ? List All Master Consignment List
export const ListAllMasterConsignment = async (): Promise<
  ListAllMasterConsinmentTypes
> => {
  const response = await axiosInstance.get<{
    data: ListAllMasterConsinmentTypes;
  }>(`/StockInOut/ListAllMasterConsignment`);
  return response.data.data;
};

export const ListAllStockInOut = async (): Promise<ListAllStockInOutTypes> => {
  const response = await axiosInstance.get<{
    data: ListAllStockInOutTypes;
  }>(`/StockInOut/ListAll`);
  return response.data.data;
};

// ? Update Stock Status
export const UpdateStockStatusService = (
  payload: UpdateStockStatusPayload
): Promise<UpdateStockStatusResponse> => {
  return axiosInstance
    .post<UpdateStockStatusResponse>("/StockInOut/UpdateStockStatus", payload)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(
        error.response?.data?.message || "Failed to update stock status."
      );
    });
};

export const fetchStockDetailsByID = (
  id: string
): Promise<FetchStockDetailsResponseType> => {
  return axiosInstance
    .get<{ data: FetchStockDetailsResponseType }>(`/StockInOut/Get/${id}`)
    .then((response) => response.data.data)
    .catch((error) => {
      throw new Error(
        error.response?.data?.message || "Failed to fetch stock details."
      );
    });
};

// ? List All Stock Types
export const ListAllStockTypesService = async (): Promise<
  ListAllStockTypes[]
> => {
  const response = await axiosInstance.get<{
    data: ListAllStockTypes | ListAllStockTypes[];
  }>(`/StockInOut/ListAllStockTypes`);

  const data = response.data;
  return Array.isArray(data) ? data : [data];
};
