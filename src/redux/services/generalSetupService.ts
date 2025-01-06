import axiosInstance from "../axios";
import {
  LocationList,
  LocationType,
  Contractor,
  Driver,
  ContractorById,
  Vehicle,
  Holiday,
  LocationByIDType,
} from "../models/generalSetupTypes";

export const addPaymentMethod = (
  paymentMethod: string,
  updatedOn: Date,
  updatedBy: string
) => {
  return axiosInstance
    .post<{ message: string; statusCode: number }>("/paymentMethods/Add", {
      paymentMethod,
      updatedOn,
      updatedBy,
    })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(
        error.response?.data?.message || "Failed to add payment method."
      );
    });
};

//add location
export const addLocation = (
  id: number,
  name: string,
  type: string,
  address: string,
  longitude: string,
  latitude: string,
  cityId: number,
  city: string,
  province: string,
  objectType: string | null,
  parentID: number | null
) => {
  return axiosInstance
    .post("/Location/Add", {
      id,
      name,
      type,
      address,
      longitude,
      latitude,
      cityId,
      city,
      province,
      objectType,
      parentID,
    })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response?.data || "Failed to add location.");
    });
};

//update location
export const updateLocation = (
  id: number,
  name: string,
  type: string,
  address: string,
  longitude: string,
  latitude: string,
  city: string,
  province: string,
  objectType: string | null,
  parentID: number
) => {
  return axiosInstance
    .post("/Location/Update", {
      id,
      name,
      type,
      address,
      longitude,
      latitude,
      city,
      province,
      objectType,
      parentID,
    })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(
        error.response?.data?.message || "Failed to update location."
      );
    });
};

//Location list
export const fetchAllLocations = async (): Promise<LocationList[]> => {
  const response = await axiosInstance.get<{ data: LocationList[] }>(
    "/Location/ListAll"
  );
  return response.data.data;
};

//Location list
export const fetchAllLocationsByID = async (
  id: number
): Promise<LocationByIDType[]> => {
  const response = await axiosInstance.get<{ data: LocationByIDType[] }>(
    `/Location/Get/${id}`
  );
  return response.data.data;
};

//Location list types
export const fetchAllLocationsTypes = async (): Promise<LocationType[]> => {
  const response = await axiosInstance.get<{ data: LocationType[] }>(
    "/Location/ListAllLocationTypes"
  );
  return response.data.data;
};

//Location list types
export const fetchAllContractors = async (
  WarehouseId: number | null
): Promise<Contractor[]> => {
  const response = await axiosInstance.get<{ data: Contractor[] }>(
    WarehouseId
      ? `/User/ListAllContrctors?WarehouseId=${WarehouseId}`
      : `/User/ListAllContrctors`
  );
  return response.data.data || [];
};

//get all drivers
export const fetchAllDrivers = async (
  contractorCode: string
): Promise<Driver[]> => {
  const response = await axiosInstance.get<{ data: Driver[] }>(
    `/User/ListAllDrivers/${contractorCode}`
  );
  return response.data.data;
};

//get all contractor by Id
export const fetchAllContractorById = async (
  code: string
): Promise<ContractorById[]> => {
  const response = await axiosInstance.get<{ data: ContractorById[] }>(
    `/User/GetContractorByCode/${code}`
  );
  return response.data.data;
};

//get vehicle list

export const fetchAllVehicleList = async (
  WarehouseId: number | null
): Promise<Vehicle[]> => {
  const response = await axiosInstance.get<{ data: Vehicle[] }>(
    WarehouseId
      ? `/Vehicle/ListAllByWarehouse?WarehouseId=${WarehouseId}`
      : `/Vehicle/ListAllByWarehouse`
  );
  return response.data.data;
};

// Fetch All Holidays
export const fetchAllHolidays = async (): Promise<Holiday[]> => {
  const response = await axiosInstance.get<{ data: Holiday[] }>(
    "/AreaCoverageManagement/ListAllHolidays"
  );
  return response.data.data;
};

export const updateVehicle = (
  regNo: string,
  contractorCode: string,
  capacity: string,
  contactPersonId: number,
  objectType: string
): Promise<string> => {
  return axiosInstance
    .post<{ message: string }>("/Vehicle/Update", {
      regNo,
      contractorCode,
      capacity,
      contactPersonId,
      objectType,
    })
    .then((response) => response.data.message)
    .catch((error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update vehicle";
      return Promise.reject(new Error(errorMessage));
    });
};

// Add Contractor Service
export const addContractor = (
  userID: string,
  name: string,
  code: string,
  password: string,
  mobile: string,
  mobile2: string,
  phone: string,
  email: string,
  isActive: boolean,
  warehousesId: number[]
): Promise<{ statusCode: number; message: string }> => {
  return axiosInstance
    .post<{ statusCode: number; message: string }>("/User/AddContractor", {
      id: 0,
      userID,
      name,
      code,
      password,
      mobile,
      mobile2,
      phone,
      email,
      isActive,
      warehousesId,
    })
    .then((response) => response.data)
    .catch((error) => {
      const errorMessage =
        error.response?.message ||
        error.response?.data?.message ||
        error.message ||
        "Failed to add contractor";
      return Promise.reject(new Error(errorMessage));
    });
};

// Add Driver Service
export const addDriver = (
  contractorCode: string,
  contactPersonId: string,
  name: string,
  userID: string,
  email: string,
  password: string,
  cnic: string,
  driverType: string,
  cnicExpiry: string,
  licNo: string,
  licExpiry: string,
  mobile: string,
  mobile2: string,
  phone: string,
  address: string,
  isActive: boolean = true
): Promise<{ message: string }> => {
  return axiosInstance
    .post<{ message: string }>("/User/AddDriver", {
      contractorCode,
      contactPersonId,
      name,
      userID,
      email,
      password,
      cnic,
      driverType,
      cnicexpiry: cnicExpiry,
      licNo,
      licExpiry,
      mobile,
      mobile2,
      phone,
      address,
      isActive,
    })
    .then((response) => response.data)
    .catch((error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to add driver";
      return Promise.reject(new Error(errorMessage));
    });
};

// Add Vehicle Service
export const addVehicle = (
  regNo: string,
  contractorCode: string,
  contactPersonId: number,
  capacity: string,
  objectType: string
): Promise<{ message: string; statusCode: number }> => {
  return axiosInstance
    .post<{ message: string; statusCode: number }>("/Vehicle/Add", {
      regNo,
      contractorCode,
      contactPersonId,
      capacity,
      objectType,
    })
    .then((response) => {
      if (response.data.statusCode !== 200) {
        return Promise.reject(
          new Error(response.data.message || "Failed to add vehicle")
        );
      }
      return response.data;
    })
    .catch((error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to add vehicle";
      return Promise.reject(new Error(errorMessage));
    });
};

// Add Holiday Service
export const addHoliday = (
  holidayDate: string,
  dayInWeek: string,
  cityIds: number[]
): Promise<string> => {
  return axiosInstance
    .post<{ message: string }>(
      "/AreaCoverageManagement/AddHolidayInMultipleAreas",
      {
        holidayDate,
        dayInWeek,
        cityIds,
      }
    )
    .then((response) => response.data.message)
    .catch((error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to add holiday";
      return Promise.reject(new Error(errorMessage));
    });
};

// Update Driver Service
export interface UpdateDriverResponse {
  message: string;
}

export const updateDriver = (
  id: string,
  userID: string,
  name: string,
  password: string,
  isActive: boolean,
  mobile: string,
  phone: string,
  email: string,
  contractorCode: string,
  contactPersonId: number,
  mobile2: string,
  cnic: string,
  cnicExpiry: string,
  licNo: string,
  licExpiry: string,
  address: string,
  driverType: string
): Promise<UpdateDriverResponse> => {
  return axiosInstance
    .post<UpdateDriverResponse>("/User/UpdateDriver", {
      id,
      userID,
      name,
      password,
      isActive,
      mobile,
      phone,
      email,
      contractorCode,
      contactPersonId,
      mobile2,
      cnic,
      cnicexpiry: cnicExpiry,
      licNo,
      licExpiry,
      address,
      driverType,
    })
    .then((response) => response.data)
    .catch((error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update driver";
      return Promise.reject(new Error(errorMessage));
    });
};

// Update the type definition to include `statusCode`
export interface UpdateContractorResponse {
  statusCode: number;
  message: string;
}

export const updateContractor = (
  id: string,
  name: string,
  email: string,
  userID: string,
  mobile: string,
  mobile2: string,
  phone: string,
  code: string,
  password: string,
  isActive: boolean
): Promise<UpdateContractorResponse> => {
  return axiosInstance
    .post<UpdateContractorResponse>("/User/UpdateContractor", {
      id,
      name,
      email,
      userID,
      mobile,
      mobile2,
      phone,
      code,
      password,
      isActive,
    })
    .then((response) => response.data)
    .catch((error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update contractor";
      return Promise.reject(new Error(errorMessage));
    });
};

// Add Contact Person Service
export const addContactPerson = (
  userID: string,
  name: string,
  password: string,
  isActive: boolean = true,
  mobile: string,
  mobile2: string,
  phone: string,
  email: string,
  contractorCode: string,
  address: string,
  latitude: string,
  longitude: string,
  city: string,
  province: string,
  warehousesId: number[],
  drivers: any[] = []
): Promise<{ statusCode: number; message: string }> => {
  return axiosInstance
    .post<{ statusCode: number; message: string }>("/User/AddContactPerson", {
      id: 0,
      userID,
      name,
      password,
      isActive,
      mobile,
      mobile2,
      phone,
      email,
      contractorCode,
      address,
      latitude,
      longitude,
      city,
      province,
      warehousesId,
      drivers,
    })
    .then((response) => response.data)
    .catch((error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to add contact person";
      return Promise.reject(new Error(errorMessage));
    });
};
