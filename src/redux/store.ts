import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "./slices/customerSlice";
import transactionSlice from "./slices/customerSlice";
import orderSlice from "./slices/customerSlice";
import regPricingSlice from "./slices/customerSlice";
import feedbackSlice from "./slices/customerSlice";
import customerLogSlice from "./slices/customerSlice";
import adminWarningCustomer from "./slices/customerSlice";
import warningCustomer from "./slices/customerSlice";
import customerOrder from "./slices/customerSlice";
import securityDeposit from "./slices/customerSlice";
import paymentTypes from "./slices/customerSlice";
import customerOrderLog from "./slices/customerSlice";
import orderDelivery from "./slices/customerSlice";
import contactedPerson from "./slices/customerSlice";
import allCities from "./slices/customerSlice";
import allDrivers from "./slices/customerSlice";
import allVehicles from "./slices/customerSlice";
import customerConsignmentDetails from "./slices/customerSlice";
import vouchers from "./slices/discountAndVouchersSlice";
import singleVoucher from "./slices/discountAndVouchersSlice";
import userType from "./slices/administratorSlice";
import otp from "./slices/administratorSlice";
import userList from "./slices/administratorSlice";
import regionManagement from "./slices/administratorSlice";
import location from "./slices/generalSetupSlice";
import locationType from "./slices/generalSetupSlice";
import authreducer from "./slices/authSlice";
import contractor from "./slices/generalSetupSlice";
import orderLocation from "./slices/customerSlice";
import mapOrders from "./slices/customerSlice";
import cashRece from "./slices/paymentSlice";
import userTypeList from "./slices/administratorSlice";
import masterItemTypes from "./slices/masterItemSlices";
import itemTypes from "./slices/masterItemSlices";
import singleItemTypes from "./slices/masterItemSlices";
import batchStatus from "./slices/masterItemSlices";
import cylinderStatus from "./slices/masterItemSlices";
import cylinderHistory from "./slices/masterItemSlices";
import masterBatch from "./slices/masterItemSlices";
import driver from "./slices/generalSetupSlice";
import contractorById from "./slices/generalSetupSlice";
import vehicle from "./slices/generalSetupSlice";
import holiday from "./slices/generalSetupSlice";
import locationByID from "./slices/generalSetupSlice";
import influencerReducer from "./slices/influencerSlice";
import masterConsignmentReducer from "./slices/masterConsignmentSlice";
import cashManagementReducer from "./slices/cashManagementSlice";
import menuReducer from "./slices/menuSlice";
import globalWarehouseReducer from "./slices/globalWarehouseSlice";
import administratorReducer from "./slices/administratorSlice";

export const store = configureStore({
  reducer: {
    customerSlice,
    transactionSlice,
    orderSlice,
    regPricingSlice,
    feedbackSlice,
    customerLogSlice,
    adminWarningCustomer,
    warningCustomer,
    customerOrder,
    securityDeposit,
    paymentTypes,
    customerOrderLog,
    orderDelivery,
    contactedPerson,
    allCities,
    allDrivers,
    allVehicles,
    customerConsignmentDetails,
    userType,
    otp,
    userList,
    regionManagement,
    authreducer,
    location,
    locationType,
    contractor,
    vouchers,
    singleVoucher,
    orderLocation,
    mapOrders,
    cashRece,
    userTypeList,
    masterItemTypes,
    itemTypes,
    singleItemTypes,
    batchStatus,
    cylinderStatus,
    cylinderHistory,
    masterBatch,
    driver,
    contractorById,
    vehicle,
    holiday,
    locationByID,
    influencerReducer,
    masterConsignmentReducer,
    cashManagementReducer,
    menuReducer,
    administratorReducer,
    globalWarehouse: globalWarehouseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
