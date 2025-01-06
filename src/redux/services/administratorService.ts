import axiosInstance from "../axios";
import {
  UserType,
  AddUserType,
  Otp,
  UserList,
  RegionManagement,
  AddAreaManagement,
  AddUser,
  AddUserTypeList,
  UserWarehouse,
} from "../models/administratorTypes";

//user Type list
export const fetchAllUserType = async (): Promise<UserType[]> => {
  const response = await axiosInstance.get<{ data: UserType[] }>(
    // "/UserType/ListAll?Fixed=true"
    "/UserType/GetAllUserTypesV2"
  );
  return response.data.data;
};

//All Otps
export const fetchAllOTPs = async (): Promise<Otp[]> => {
  const response = await axiosInstance.get<{ data: Otp[] }>("/OTP/OTPs");
  return response.data.data;
};

//All User List
export const fetchAllUsers = async (): Promise<UserList[]> => {
  const response = await axiosInstance.get<{ data: UserList[] }>(
    "/User/ListAll"
  );
  return response.data.data;
};

export const fetchAllUserTypeList = async (): Promise<AddUserTypeList[]> => {
  const response = await axiosInstance.get<{ data: AddUserTypeList[] }>(
    "/User/ListAllUserTypes"
  );
  return response.data.data;
};

// Updated return type to include statusCode
export const addUserType = (
  userTypeName: string,
  hasAccess: boolean
): Promise<{ message: string; statusCode: number }> => {
  return axiosInstance
    .post<{ message: string; statusCode: number }>("/UserType/AddUserTypeV2", {
      userTypeName, // Include userTypeName
      hasAccess, // Include hasAccess
    })
    .then((response) => response.data) // Return the response data
    .catch((error) => {
      // Catch any errors and return the appropriate error message
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to add user type";
      return Promise.reject(new Error(errorMessage)); // Reject the promise with a meaningful error message
    });
};

//All Areas List
export const fetchAllAreaManagement = async (): Promise<RegionManagement[]> => {
  const response = await axiosInstance.get<{ data: RegionManagement[] }>(
    "/AreaCoverageManagement/ListAll"
  );
  return response.data.data;
};

//Add Area Management
export const addAreaManagement = (
  city: String,
  province: String,
  cityDescription: String,
  provinceDescription: String
): Promise<{ message: string; statusCode: number }> => {
  return axiosInstance
    .post<{ message: string; statusCode: number }>(
      "/AreaCoverageManagement/AddArea",
      {
        city,
        province,
        cityDescription,
        provinceDescription,
      }
    )
    .then((response) => response.data)
    .catch((error) => {
      const errorMessage =
        error.response?.message ||
        error.response?.data?.message ||
        error.message ||
        "Failed to add Area";
      return Promise.reject(new Error(errorMessage));
    });
};

//Add User
export const addUser = (
  name: string,
  email: string,
  password: string,
  phone: string,
  mobile: string,
  mobile2: string,
  userType: string,
  isActive: boolean,
  userID: string,
  warehousesId: number[]
): Promise<{ statusCode: number; message: string }> => {
  return axiosInstance
    .post("/User/Add", {
      // id: 0,
      userID,
      name,
      email,
      password,
      phone,
      mobile,
      mobile2,
      userType,
      isActive,
      warehousesId,
    })
    .then((response) => ({
      statusCode: response?.data?.statusCode,
      message: response?.data?.message || "User added successfully",
    }))
    .catch((error) => {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to add user";
      const errorStatusCode = error.response?.status || 500;
      return Promise.reject({
        statusCode: errorStatusCode,
        message: errorMessage,
      });
    });
};

//Delete User
export const deleteUser = (
  id: number
): Promise<{ message: string; statusCode: number }> => {
  return axiosInstance
    .delete<{ message: string; statusCode: number }>(`/User/Delete/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.message ||
        error.message ||
        "Failed to delete user";
      return Promise.reject(new Error(errorMessage));
    });
};

// Update User
export const updateUser = (
  id: number,
  userID: string,
  name: string,
  password: string,
  mobile: string,
  mobile2: string,
  phone: string,
  email: string,
  userType: string,
  isActive: boolean
): Promise<{ message: string; statusCode: number }> => {
  return axiosInstance
    .post<{ message: string; statusCode: number }>(`/User/Update`, {
      id,
      userID,
      name,
      email,
      password,
      phone,
      mobile,
      mobile2,
      userType,
      isActive,
    })
    .then((response) => response.data)
    .catch((error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.message ||
        error.message ||
        "Failed to update user";
      return Promise.reject(new Error(errorMessage));
    });
};

// Change Password
export const changePassword = (
  userId: string | null,
  oldPwd: string,
  newPwd: string,
  confirmNewPwd: string
): Promise<{ message: string; statusCode: number }> => {
  return axiosInstance
    .post<{ message: string; statusCode: number }>("/User/ChangePassword", {
      userId,
      oldPwd,
      newPwd,
      confirmNewPwd,
    })
    .then((response) => response.data)
    .catch((error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to change password";
      const statusCode = error.response?.statusCode;
      return Promise.reject({ message: errorMessage, statusCode });
    });
};

//delete region
export const deleteRegion = (
  provinceId: number,
  cityId: number
): Promise<{ statusCode: number; message: string }> => {
  return axiosInstance
    .delete(`/AreaCoverageManagement/DeleteArea/${provinceId}/${cityId}`)
    .then((response) => {
      return { statusCode: response.status, message: response.data.message };
    })
    .catch((error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete region";
      return Promise.reject({ message: errorMessage });
    });
};

// Get User Warehouse
export const fetchUserWarehouse = async (): Promise<UserWarehouse[]> => {
  const response = await axiosInstance.get<{ data: UserWarehouse[] }>(
    "/User/GetUserWarehouse"
  );
  return response.data.data;
};
