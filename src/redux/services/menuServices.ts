import axiosInstance from "../axios";
import {
  GetAllMenusApiResponse,
  GetAllUserTypeApiResponse,
  GetMenusByUserTypeApiResponse,
} from "../models/menuTypes";
interface MenuChild {
  childName: string;
  path: string;
  icon: string;
}

interface MenuParent {
  parentName: string;
  path: string;
  icon: string;
  menusChildren: MenuChild[];
}

interface UpdateUserAccessRequest {
  menuParents: MenuParent[];
}

export const GetAllMenusService = async (): Promise<GetAllMenusApiResponse> => {
  const response = await axiosInstance.get<GetAllMenusApiResponse>(
    "/Menu/GetAllMenusV2"
  );
  return response.data;
};

export const GetAllUserTypesService = async (): Promise<
  GetAllUserTypeApiResponse
> => {
  const response = await axiosInstance.get<GetAllUserTypeApiResponse>(
    "/UserType/GetAllUserTypesV2"
  );
  return response.data;
};

export const GetMenusByUserTypeIdService = async (
  userTypeId: number
): Promise<GetMenusByUserTypeApiResponse> => {
  const response = await axiosInstance.get<GetMenusByUserTypeApiResponse>(
    `/Menu/GetMenusByUsertypeIdV2?userTypeId=${userTypeId}`
  );
  return response.data;
};

export const updateUserAccessService = (
  data: UpdateUserAccessRequest
): Promise<any> => {
  return axiosInstance
    .post<any>("/Menu/AddMenuV2", data)
    .then((response) => response.data)
    .catch((error) => {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      return Promise.reject(new Error(errorMessage));
    });
};

export const updateUserAccessV2Service = (data: {
  userTypeId: number;
  menuAccess: Array<{
    menuId: number;
    isAllowed: boolean;
  }>;
}): Promise<any> => {
  return axiosInstance
    .post<any>("/Menu/UpdateUserAccessV2", data)
    .then((response) => response.data)
    .catch((error) => {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      return Promise.reject(new Error(errorMessage));
    });
};
