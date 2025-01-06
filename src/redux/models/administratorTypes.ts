// // user Types types and states
export interface UserType {
  id: number;
  name: string;
  stage: number;
}

export interface UserTypeState {
  userType: UserType[];
  loading: boolean;
  error: string | null;
}

export const initialUserTypeState: UserTypeState = {
  userType: [],
  loading: false,
  error: null,
};

// add user Types types and states
export interface AddUserType {
  id: number;
  name: string;
  stage: number;
}

export interface AddUserTypeState {
  addUserType: UserType[];
  loading: boolean;
  error: string | null;
}

export const initialAddUserTypeState: AddUserTypeState = {
  addUserType: [],
  loading: false,
  error: null,
};

// opt types and states
export interface Otp {
  id: number;
  otpCode: number;
  currentStatus: string;
}

export interface OtpState {
  otp: Otp[];
  loading: boolean;
  error: string | null;
}

export const initialOtpState: OtpState = {
  otp: [],
  loading: false,
  error: null,
};

// User List and states
export interface UserList {
  id: number;
  email: string;
  name: string;
  status: boolean;
  userType: number;
}

export interface UserListState {
  userList: UserList[];
  loading: boolean;
  error: string | null;
}

export const initialUserListState: UserListState = {
  userList: [],
  loading: false,
  error: null,
};

// // Region management Types and states
export interface RegionManagement {
  id: number;
  city: string;
  province: string;
}

export interface RegionManagementState {
  regionManagements: RegionManagement[];
  loading: boolean;
  error: string | null;
}

export const initialRegionManagementState: RegionManagementState = {
  regionManagements: [],
  loading: false,
  error: null,
};

// // Region management Types and states
export interface AddAreaManagement {
  city: String;
  province: String;
  cityDescription: String;
  provinceDescription: String;
}

export interface AddAreaManagementState {
  areaManagements: AddAreaManagement[];
  loading: boolean;
  error: string | null;
}

export const initialAreaManagementState: AddAreaManagementState = {
  areaManagements: [],
  loading: false,
  error: null,
};

// // Region management Types and states
export interface AddUser {
  name: String;
  email: String;
  password: String;
  phone: String;
  mobile: String;
  mobile2: String;
  userType: String;
  isActive: boolean;
  id: number;
  userID: string;
}

// add user Types types and states
export interface AddUserTypeList {
  id: number;
  name: string;
  stage: number;
  key: string;
  value: string;
}

export interface AddUserTypeListState {
  addUserTypeList: AddUserTypeList[];
  loading: boolean;
  error: string | null;
}

export const initialAddUserTypeListState: AddUserTypeListState = {
  addUserTypeList: [],
  loading: false,
  error: null,
};

// user warehouse types and states
export interface UserWarehouse {
  id: number;
  name: string;
  type: string;
  address: string;
  city: string;
  province: string;
  cityId: number;
}

export interface UserWarehouseState {
  userWarehouses: UserWarehouse[];
  loading: boolean;
  error: string | null;
}

export const initialUserWarehouseState: UserWarehouseState = {
  userWarehouses: [],
  loading: false,
  error: null,
};
