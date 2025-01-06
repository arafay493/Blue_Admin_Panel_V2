export interface CashReceivables {
  noOfOrders: number;
  id: number;
  vehicleId: string;
  vehicleCapacity: string;
  vehicleLeftDate: string;
  vehicleReturnedDate: string;
  driverId: number;
  driverName: string;
  noOfCashOrders: number;
  totalAmount: number;
  codRecieved: number;
  securityDeposit: number;
}

export interface CashReceivableState {
  cashReceivables: CashReceivables[];
  loading: boolean;
  error: string | null;
}

export const initialCashReceivableState: CashReceivableState = {
  cashReceivables: [],
  loading: false,
  error: null,
};
