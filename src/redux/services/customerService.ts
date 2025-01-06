// @ts-nocheck
import axiosInstance from "../axios";
import {
  Transaction,
  Order,
  RegPricing,
  FeedBack,
  CustomerLog,
  AdminWarningCustomer,
  WarningCustomer,
  CustomerOrder,
} from "../slices/customerSlice";
import {
  Customer,
  SecurityDeposit,
  PaymentTypes,
  WalletTypes,
  CustomerOrderLog,
  OrderDelivery,
  ContactedPersonsList,
  AllCitiesList,
  DriversList,
  VehiclesList,
  OrderDeliveryTypes,
  submitOrderDeliveryTypes,
  CustomerConsignmentDetails,
  CustomerConsignmentViewDetailsFinished,
  CustomerConsignmentCylinderBackToWarehouse,
  CustomerConsignmentUpdateOrderAssignmentConsignment,
  OrderLocation,
  MapLocationOrders,
  WarningCustomerOrder,
  WarningCustomerCreateOrder,
  RegionalPricing,
  ConsignmentRouteDetails,
  ConsignmentRouteApiResponse,
} from "../models/customerTypes";
import { updateStatusFunction } from "../utils/updateStatus";

//customer list
export const fetchAllCustomers = async (
  cityId: number | null
): Promise<Customer[]> => {
  const response = await axiosInstance.get<{ data: Customer[] }>(
    cityId
      ? `/Customer/ListAllCustomers?CityId=${cityId}`
      : `/Customer/ListAllCustomers`
  );
  return response.data.data || [];
};

//customer log list
export const fetchAllCustomerlogList = async (
  customerId: number
): Promise<CustomerLog[]> => {
  try {
    const response = await axiosInstance.get<{ data: CustomerLog[] }>(
      `/Customer/GetCustomerLogs?customerId=${customerId}`
    );
    return response.data.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch customer logs";
    throw new Error(errorMessage);
  }
};

//consignment Details Service
export const fetchConsignmentRouteDetails = async (
  consignmentId: number
): Promise<ConsignmentRouteDetails> => {
  try {
    const response = await axiosInstance.get<ConsignmentRouteApiResponse>(
      `/Reporting/ConsignmnetRouteDetails?consignmentId=${consignmentId}`
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch consignment details";
    throw new Error(errorMessage);
  }
};

//customer log list
export const fetchAllCustomerOrderlogList = async (
  orderid: number
): Promise<CustomerOrderLog[]> => {
  try {
    const response = await axiosInstance.get<{ data: CustomerOrderLog[] }>(
      `/Order/GetOrderScheduleLogs/${orderid}`
    );
    return response.data.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch customer Order logs";
    throw new Error(errorMessage);
  }
};

//Transaction list
export const fetchAllTransactions = async (): Promise<Transaction[]> => {
  const response = await axiosInstance.get<{ data: Transaction[] }>(
    "/PaymentTransactions/ListAllTransactions"
  );
  return response.data.data;
};

//Order Reports
export const fetchAllOrderReports = async (): Promise<Order[]> => {
  const response = await axiosInstance.get<{ data: Order[] }>(
    "/Order/OrderReport"
  );
  return response.data.data;
};

//Regional Pricing List
export const fetchAllRegionalPricing = async (): Promise<RegPricing[]> => {
  const response = await axiosInstance.get<{ data: RegPricing[] }>(
    "/OrderPricing/CurrentPricesRegionBased"
  );
  return response.data.data;
};

//Feedback List
export const fetchAllFeedbackList = async (): Promise<FeedBack[]> => {
  const response = await axiosInstance.get<{ data: FeedBack[] }>(
    "/FeedBack/ListAllQAFeedback"
  );
  return response.data.data;
};

//Warning Customer List
export const fetchAllWarningCustomerList = async (
  NumOfDays: number
): Promise<WarningCustomer[]> => {
  try {
    const response = await axiosInstance.get<{ data: WarningCustomer[] }>(
      `RecurringOrders/GetWarningCustomers?NumOfDays=${NumOfDays}`
    );
    return response.data.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch warning Customers";
    throw new Error(errorMessage);
  }
};

//Admin Warning Customer List
export const fetchAllAdminWarningCustomerList = async (): Promise<
  AdminWarningCustomer[]
> => {
  const response = await axiosInstance.get<{ data: AdminWarningCustomer[] }>(
    "/Reporting/GetAdminOrdersCreatedForWarningUsers"
  );
  return response.data.data;
};

//Customer Order List
export const fetchAllCustomerOrderList = async (
  cityId: number | null
): Promise<CustomerOrder[]> => {
  const response = await axiosInstance.get<{ data: CustomerOrder[] }>(
    cityId ? `/Order/ListAllOrders?CityId=${cityId}` : `/Order/ListAllOrders`
  );
  const data = updateStatusFunction(
    response.data.data || [],
    "status",
    "invoiceType"
  );
  return data || [];
};

//Security Deposit List
export const fetchAllSecurityDepositList = async (): Promise<
  SecurityDeposit[]
> => {
  const response = await axiosInstance.get<{ data: SecurityDeposit[] }>(
    "/Reporting/GetAllCustomersDetails"
  );
  return response.data.data;
};

//Payment Types List
export const fetchAlPaymentTypesList = async (): Promise<PaymentTypes[]> => {
  const response = await axiosInstance.get<{ data: PaymentTypes[] }>(
    "/PaymentMethods/ListAll"
  );
  return response.data.data;
};

export const addWalletAmount = async (
  customerId: number,
  amount: number,
  merchantTransactionId: string
): Promise<WalletTypes> => {
  try {
    const response = await axiosInstance.post<{ data: WalletTypes }>(
      "/VirtualWallet/AddAmountInVallet",
      {
        customerId,
        amount,
        merchantTransactionId,
      }
    );
    return response.data.message;
  } catch (error) {
    const errorMessage =
      error.response.data.Amount[0] ||
      error.response?.data?.message ||
      error.message ||
      "Failed to add wallet amount";
    throw new Error(errorMessage);
  }
};

//Customer Order List
export const fetchAllStockTransferList = async (
  WarehouseId: number | null
): Promise<OrderDelivery[]> => {
  const response = await axiosInstance.get<{ data: OrderDelivery[] }>(
    WarehouseId
      ? `/StockTransferToCustomerManagement/ListAllDoc?WarehouseId=${WarehouseId}`
      : `/StockTransferToCustomerManagement/ListAllDoc`
  );

  return Array.isArray(response.data.data) ? response.data.data : [];
};

//Contacted Person List
export const fetchAllContactedPersonsList = async (
  WarehouseId: number | null
): Promise<ContactedPersonsList[]> => {
  const response = await axiosInstance.get<{ data: ContactedPersonsList[] }>(
    WarehouseId
      ? `/User/ListAllContactPersons?WarehouseId=${WarehouseId}`
      : `/User/ListAllContactPersons`
  );
  return Array.isArray(response.data.data) ? response.data.data : [];
};

//Contacted Person List
export const fetchAllCitiesList = async (): Promise<AllCitiesList[]> => {
  const response = await axiosInstance.get<{ data: AllCitiesList[] }>(
    "/Location/ListAll"
  );
  return response.data.data;
};

//Drivers List
export const fetchAllDriversList = async (
  id: number
): Promise<DriversList[]> => {
  const response = await axiosInstance.get<{ data: DriversList[] }>(
    `/Driver/GetDriversByContactPerson/${id}`
  );
  return response.data.data;
};

//Vehicles List
export const fetchAllVehiclesList = async (
  id: number
): Promise<VehiclesList[]> => {
  const response = await axiosInstance.get<{ data: VehiclesList[] }>(
    `/Vehicle/GetVehiclesByContactPerson/${id}`
  );
  return response.data.data;
};

//Delete Order Delivery Doc
export const deleteOrderDeliveryDetails = async (
  id: number
): Promise<OrderDeliveryTypes> => {
  const response = await axiosInstance.delete<{ data: OrderDeliveryTypes }>(
    `/StockTransferToCustomerManagement/DeleteDocById/${id}`
  );
  return response.data.message;
};

//Submit Order Delivery Request
export const submitOrderDeliveryRequest = async (
  payload: any
): Promise<submitOrderDeliveryTypes> => {
  const response = await axiosInstance.post<{ data: submitOrderDeliveryTypes }>(
    `/StockTransferToCustomerManagement/CreateTransferStockDocument`,
    {
      driverId: payload.driverId,
      remarks: payload.remarks,
      tranferQuantity: payload.tranferQuantity,
      vehicleId: payload.vehicleId,
      warehouseLocationId: payload.warehouseLocationId,
    }
  );
  return response.data;
};

//Customer Consignment Details
export const customerConsignmentDetails = async (
  id: number
): Promise<CustomerConsignmentDetails> => {
  const response = await axiosInstance.get<{
    data: CustomerConsignmentDetails;
  }>(`/CustomerConsignments/v1/GetTransferDocumentById/${id}`);
  const data = updateStatusFunction(
    response.data.data,
    "status",
    "invoiceType"
  );
  return data;
};

//Customer Consignment View Details Finish
export const customerConsignmentViewDetailsFinished = async (
  payload: any
): Promise<CustomerConsignmentViewDetailsFinished> => {
  const response = await axiosInstance.post<{
    data: CustomerConsignmentViewDetailsFinished;
  }>(`/StockTransferToCustomerManagement/TransferDocumentUpdate`, {
    id: payload.id,
    remarks: payload.remarks,
    tranferQuantity: payload.tranferQuantity,
    isQuantityLock: payload.isQuantityLock,
    updatedBy: payload.updatedBy,
    createdBy: payload.createdBy,
    vehicleLeftDate: payload.vehicleLeftDate,
    vehicleReturnDate: payload.vehicleReturnDate,
    warehouseLocationId: payload.warehouseLocationId,
    createdOn: payload.createdOn,
    updatedOn: payload.updatedOn,
    driverId: payload.driverId,
    vehicleId: payload.vehicleId,
  });
  return response.data;
};

// Customer Consignment Cylinder Back TO Warehouse
export const cylinderBackToWarehouse = async (
  payload: any
): Promise<CustomerConsignmentCylinderBackToWarehouse> => {
  const response = await axiosInstance.post<{
    data: CustomerConsignmentCylinderBackToWarehouse;
  }>(`/StockTransferToCustomerManagement/UpdateCylinderFromWarehouse`, {
    barcode: payload.barcode,
    documentId: payload.documentId,
    isPickup: payload.isPickup,
  });
  return response.data;
};

// Customer Consignment Update Order Assignment Consignment
export const updateOrderAssignmentConsignment = async (
  payload: any
): Promise<CustomerConsignmentUpdateOrderAssignmentConsignment> => {
  const response = await axiosInstance.post<{
    data: CustomerConsignmentUpdateOrderAssignmentConsignment;
  }>(
    `/StockTransferToCustomerManagement/AssignMultipleOrdersToDriverAndVehicle`,
    payload
  );
  return response.data;
};

//Customer Order List
export const fetchAllOrderStatus = async (): Promise<OrderLocation[]> => {
  const response = await axiosInstance.get<{
    data: OrderLocation[];
  }>("/order/GetOrderStatuses");
  return response.data.data;
};

// Customer Order Locations
export const fetchAllOrderLocations = async (
  startDate: string,
  endDate: string,
  orderStatus: string
): Promise<MapLocationOrders[]> => {
  const response = await axiosInstance.get<{
    data: MapLocationOrders[];
  }>("/Order/GetOrderLocations", {
    params: {
      StartDate: startDate,
      EndDate: endDate,
      OrderStatus: orderStatus,
    },
  });
  return response.data.data;
};

// Warning Customer Orders
export const WarningCustomerOrderAPI = (
  payload: any
): Promise<WarningCustomerOrder> => {
  return axiosInstance
    .post<{ data: WarningCustomerOrder }>(
      `/User/SendCustomNotificationToMultipleUsers`,
      payload
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error?.response;
    });
};

// Warning Customer Create Orders
export const WarningCustomerCreateOrderAPI = (
  payload: any
): Promise<WarningCustomerCreateOrder> => {
  return axiosInstance
    .post<{ data: WarningCustomerCreateOrder }>(
      `/Order/CreateEmptyPickupRequestOrder`,
      payload
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error?.response;
    });
};

// Warning Customer Create Orders
export const SetRegionalPricingAPI = (
  payload: any
): Promise<RegionalPricing> => {
  return axiosInstance
    .post<{ data: RegionalPricing }>(
      `/OrderPricing/AddNewRegionCurrentPrice`,
      payload
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error?.response;
    });
};

// Inactive Orders
export const InActiveOrder = (payload: any): Promise<RegionalPricing> => {
  return axiosInstance
    .post<{ data: RegionalPricing }>(`/Order/UpdateOrderStatus`, payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error?.response;
    });
};

// Notify Customers
export const NotifyCustomer = ({ formData, key }): Promise<RegionalPricing> => {
  return axiosInstance
    .post<{ data: RegionalPricing }>(
      `/RecurringOrders/SendScheduleOrderConfirmationNotification`,
      formData,
      {
        headers: {
          API_Key: key,
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

// Update Region Pricing
export const updateRegionPricing = async (payload: {
  pricingId: string;
  gstTax: number;
  discount: number;
  deliveryCharges: number;
  securityDeposit: number;
  urgentDeliveryCharges: number;
}): Promise<RegionalPricing> => {
  try {
    const response = await axiosInstance.post<{ data: RegionalPricing }>(
      `/OrderPricing/UpdatePrices`,
      payload
    );
    return response.data.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to update region pricing";
    throw new Error(errorMessage);
  }
};
