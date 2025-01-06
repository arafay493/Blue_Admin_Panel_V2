// LocationList Interface
export interface LocationList {
  id: number;
  name: string;
  type: string;
  city: string;
  province: string;
  address: string;
  parentID: number;
}

// State interface for managing locations
export interface LocationListState {
  locationLists: LocationList[];
  currentLocation: LocationList | null;
  loading: boolean;
  error: string | null;
}

// Initial state for locations
export const initialLocationListState: LocationListState = {
  locationLists: [],
  currentLocation: null,
  loading: false,
  error: null,
};

// Location types and states
export interface LocationByIDType {
  key: string;
  value: string;
}

export interface LocationByIDState {
  locationByID: LocationByIDType[];
  loading: boolean;
  error: string | null;
}

export const initialLocationByIDState: LocationByIDState = {
  locationByID: [],
  loading: false,
  error: null,
};

// Location types and states
export interface LocationType {
  key: string;
  value: string;
}

export interface LocationTypeState {
  locationTypes: LocationType[];
  loading: boolean;
  error: string | null;
}

export const initialLocationTypeState: LocationTypeState = {
  locationTypes: [],
  loading: false,
  error: null,
};

//Contractor and states
export interface Contractor {
  id: number;
  code: string;
  email: string;
  name: string;
  phone: string;
  isActive: boolean;
}

export interface ContractorState {
  contractors: Contractor[];
  loading: boolean;
  error: string | null;
}

export const initialContractorState: ContractorState = {
  contractors: [],
  loading: false,
  error: null,
};

// Driver types and states
export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  mobile: string;
  mobile2: string;
  contractorCode: string;
  driverType: string;
  isActive: boolean;
  password: string;
  cnic: string;
  cnicexpiry: string;
  licNo: string;
  licExpiry: string;
  address: string;
  contactPersonId: number;
}

export interface DriverState {
  drivers: Driver[];
  loading: boolean;
  error: string | null;
}

export const initialDriverState: DriverState = {
  drivers: [],
  loading: false,
  error: null,
};

export interface ContactPerson {
  id: number; // Make sure to include an id if you need it
  name: string;
}

// Contractor biy id types and states
export interface ContractorById {
  id: number;
  name: string;
  email: string;
  phone: string;
  mobile: string;
  code: string;
  contractorCode: string;
  isActive: boolean;
  contactPersons: ContactPerson[];
}

export interface contractorByIdState {
  contractorById: ContractorById[]; // Keep it as an array
  loading: boolean;
  error: string | null;
}

export const initialContractorByIdState: contractorByIdState = {
  contractorById: [], // Initialize as an empty array
  loading: false,
  error: null,
};

//Vehicle and states
export interface Vehicle {
  regNo: string;
  contractorCode: string;
  contactPersonId: number;
  capacity: string;
  objectType: string;
}

export interface VehicleState {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
}

export const initialVehicleState: VehicleState = {
  vehicles: [],
  loading: false,
  error: null,
};

export interface ProvinceDetail {
  id: number;
  province: string;
  description: string;
}

export interface Holiday {
  id: number;
  city: string;
  description: string;
  provinceId: number;
  provinceDetail: {
    id: number;
    province: string;
    description: string;
  };
}

export interface HolidayState {
  loading: boolean;
  error: string | null;
  holidays: Holiday[];
}

export const initialHolidayState: HolidayState = {
  loading: false,
  error: null,
  holidays: [],
};
