// @ts-nocheck
import {
  CashReceivableApiResponse,
  CheckAdminWalletApiResponse,
  ConsignmentDetailsApiResponse,
  CustomApiResponse,
  ReceiveCashApiResponse,
  GetAllAccountsResponse,
  BankDetailsRequest,
  GetDepositAccountResponse,
  GetAllDepositsResponse,
  GetInHandBankAccountLogsResponse,
} from "../models/cashManagementTypes";
import axiosInstance from "../axios";

export const fetchCheckAdminWallet = async (): Promise<
  CheckAdminWalletApiResponse
> => {
  const response = await axiosInstance.get<CheckAdminWalletApiResponse>(
    "/CashManagement/CheckAdminWallet"
  );
  return response.data;
};

export const fetchCashReceivablesService = async (
  warehouseId: number
): Promise<CashReceivableApiResponse> => {
  const response = await axiosInstance.get<CashReceivableApiResponse>(
    `/CashManagement/CashReceiveable?warehouseId=${warehouseId}`
  );
  return response.data;
};

export const fetchReceivedConsignmentsService = async (
  WarehouseId: number
): Promise<CustomApiResponse> => {
  const response = await axiosInstance.get<CustomApiResponse>(
    `/CashManagement/ReceivedConsignment?WarehouseId=${WarehouseId}`
  );
  return response.data;
};

export const fetchConsignmentDetailsService = async (
  consignmentId: number
): Promise<ConsignmentDetailsApiResponse> => {
  const response = await axiosInstance.get<ConsignmentDetailsApiResponse>(
    `/CashManagement/ConsignmentCashDetails?consignmentId=${consignmentId}`
  );
  return response.data;
};

export const fetchReceiveCashService = async (
  docId: number
): Promise<ReceiveCashApiResponse> => {
  return axiosInstance
    .post<ReceiveCashApiResponse>(`/CashManagement/ReceiveCash?DocId=${docId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error.response?.data || error.message);
    });
};

export const PostOpenAccount = async (formData: {
  accountName: string;
  accountType: string;
  glCode: string;
  bankChargesAccount: string;
  bankName: string;
  accountNumber: string;
  ibanNumber: string;
  branchCode: string;
  bankAddress: string;
}): Promise<BankDetailsRequest> => {
  try {
    const response = await axiosInstance.post<BankDetailsRequest>(
      "/CashManagement/OpenAccount",
      formData
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "An unexpected error occurred";
    return Promise.reject(new Error(errorMessage));
  }
};

type ConsignmentDetail = {
  consignmentId: number;
  amount: number;
};

// Define the API's expected response type
type BankDetailsRequests = {
  status: string; // Example: "success" or "error"
  message: string; // Example: "Deposit successful"
  data?: any; // Adjust this to the actual response structure if needed
};

export const PostDeposit = (formData: {
  depositType: string;
  depositAccountNumber: string;
  depositSlipNumber: string;
  depositAmount: number;
  depositSlipURL: string;
  depositDate: string;
  consignmentsDetail: ConsignmentDetail[];
}): Promise<BankDetailsRequests> => {
  return axiosInstance
    .post<BankDetailsRequests>("/CashManagement/DepositAmount", formData)
    .then((response) => {
      // Resolve with the response data
      return response.data;
    })
    .catch((error) => {
      // Extract error message or set a default
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";

      // Reject with a meaningful error
      return Promise.reject(new Error(errorMessage));
    });
};

export const fetchAllAccountsService = async (): Promise<
  GetAllAccountsResponse
> => {
  try {
    const response = await axiosInstance.get<GetAllAccountsResponse>(
      "/CashManagement/GetAllAccounts"
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error.response?.data || error.message);
  }
};

export const fetchAllBankAccountLogService = async (): Promise<
  GetAllAccountsResponse
> => {
  try {
    const response = await axiosInstance.get<GetAllAccountsResponse>(
      "/CashManagement/GetAllBankAccountLogs"
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error.response?.data || error.message);
  }
};

export const fetchGetDepositAccountService = (
  depositType: string
): Promise<GetDepositAccountResponse> => {
  return axiosInstance
    .get<GetDepositAccountResponse>(
      `/CashManagement/GetDepositAccount?DepositType=${depositType}`
    )
    .then((response) => response.data)
    .catch((error) => {
      // Reject the promise with an error message
      return Promise.reject(
        error.response?.data ||
          "An unexpected error occurred while fetching deposit account."
      );
    });
};

export const fetchAllDepositsService = (): Promise<GetAllDepositsResponse> => {
  return axiosInstance
    .get<GetAllDepositsResponse>("/CashManagement/GetAllDeposits")
    .then((response) => response.data)
    .catch((error) => {
      return Promise.reject(error.response?.data || error.message);
    });
};

export const fetchAllInhandBankAccountService = async (
  warehouseId: number
): Promise<GetInHandBankAccountLogsResponse> => {
  return axiosInstance
    .get<GetInHandBankAccountLogsResponse>(
      `/CashManagement/GetInHandAccountLogs?warehouseId=${warehouseId}`
    )
    .then((response) => response.data)
    .catch((error) => {
      return Promise.reject(error.response?.data || error.message);
    });
};
