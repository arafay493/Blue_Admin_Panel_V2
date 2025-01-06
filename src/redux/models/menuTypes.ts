interface MenuChild {
  id: number;
  moduleName: string;
  path: string;
  icon: string;
  parentId: number;
}

interface Menu {
  id: number;
  moduleName: string;
  path: string;
  icon: string;
  getAllMenusChild: MenuChild[];
}

export type GetAllMenusApiResponse = Menu;

export const initialGetAllMenusState = {
  loading: false,
  error: null,
  data: null as GetAllMenusApiResponse | null,
};

export interface UserType {
  id: number;
  userTypeName: string;
}

export interface GetAllUserTypeApiResponse {
  statusCode: number;
  succeeded: boolean;
  message: string;
  errors: string | null;
  data: UserType[];
}

export const initialGetAllUserTypesState = {
  loading: false,
  error: null as string | null,
  userTypes: null as GetAllUserTypeApiResponse["data"] | null,
};

export interface MenuChilds {
  id: number;
  moduleName: string;
  path: string;
  icon: string;
  parentId: number;
}

export interface Menus {
  id: number;
  moduleName: string;
  path: string;
  icon: string;
  getAllMenusChild: MenuChild[];
}

export interface GetMenusByUserTypeApiResponse {
  statusCode: number;
  succeeded: boolean;
  message: string;
  errors: string | null;
  data: Menus[];
  form: Menus[];
}

export const initialGetMenusByUserTypeState = {
  loading: false,
  datas: [],
  error: null,
  form: [],
};
