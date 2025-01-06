import axiosInstance from "../axios";
import {
  AssignSingleDiscountVoucherTypes,
  CreateVoucherTypes,
  DeleteVoucherTypes,
  DiscountAndVouchersTypes,
  SingleDiscountVoucherTypes,
  UpdateVoucherTypes,
  VoucherType,
} from "../models/discountAndVouchersTypes";

export const fetchDiscountedVouchersListService = async (): Promise<
  DiscountAndVouchersTypes[]
> => {
  const response = await axiosInstance.get<{
    data: DiscountAndVouchersTypes[];
  }>(`/Voucher/GetAllVouchers`);
  return response.data.data;
};

export const fetchSingleDiscountVoucherService = async (
  id: number
): Promise<SingleDiscountVoucherTypes> => {
  return axiosInstance
    .get<{
      data: SingleDiscountVoucherTypes;
    }>(`/Voucher/GetVoucherCustomers?VoucherId=${id}`)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      return error?.response;
    });
};

export const fetchVoucherTypesService = async (): Promise<VoucherType[]> => {
  return axiosInstance
    .get<{
      data: VoucherType[];
    }>("/Voucher/GetVoucherTypes")
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      throw new Error(error?.response?.data?.message || "Failed to fetch data");
    });
};

// Assign Voucher to Customers
export const AssignVoucherToCustomerService = (
  payload: any
): Promise<AssignSingleDiscountVoucherTypes> => {
  return axiosInstance
    .post<{ data: AssignSingleDiscountVoucherTypes }>(
      `/Voucher/AssignVoucherToCustomers`,
      payload
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error?.response;
    });
};

// Create Voucher to Customers
export const CreateVoucherToCustomerService = (
  payload: any
): Promise<CreateVoucherTypes> => {
  return axiosInstance
    .post<{ data: CreateVoucherTypes }>(`/Voucher/AddVoucher`, payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error?.response;
    });
};

export const UpdateVoucherToCustomerService = (
  payload: any
): Promise<UpdateVoucherTypes> => {
  return axiosInstance
    .post<{ data: UpdateVoucherTypes }>(`/Voucher/UpdateVoucher`, payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error?.response;
    });
};

// Delete Voucher
export const DeleteVoucherService = (
  payload: any
): Promise<DeleteVoucherTypes> => {
  return axiosInstance
    .delete<{ data: DeleteVoucherTypes }>(`/Voucher/DeleteVoucher`, {
      data: payload,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error?.response;
    });
};
