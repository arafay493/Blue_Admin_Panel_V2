import axiosInstance from "../axios";
import { CashReceivables } from "../models/paymentTypes";

// Helper function to format date as MM/DD/YYYY
const formatDate = (date: Date): string => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

//cash receivables list
export const fetchAllCashReceivables = async (): Promise<CashReceivables[]> => {
  const currentDate = new Date();
  const formattedCurrentDate = formatDate(currentDate);

  const response = await axiosInstance.get<{ data: CashReceivables[] }>(
    `/CustomerConsignments/v1/ConsignmentReport?from=1%2F1%2F2020&to=${encodeURIComponent(
      formattedCurrentDate
    )}`
  );

  return response.data.data;
};
