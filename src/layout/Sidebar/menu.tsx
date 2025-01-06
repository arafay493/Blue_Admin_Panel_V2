// @ts-nocheck
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchGetMenusByUserTypeFormThunk,
  fetchGetMenusByUserTypeThunk,
} from "@/redux/slices/menuSlice";
import { useEffect } from "react";
import { sidebarMenuType } from "Types/LayoutDataType";

// Add interface for API response types
interface MenuChild {
  path: string;
  moduleName: string;
}

interface MenuModule {
  moduleName: string;
  icon?: string;
  id: number;
  path: string;
  getAllMenusChild: MenuChild[];
}

// Separate the transformation logic
function transformApiToMenuList(
  apiPayload: MenuModule[] | undefined
): sidebarMenuType[] {
  // Default dashboard menu item
  const dashboardMenu = {
    title: "General",
    menucontent: "Dashboards,Widgets",
    Items: [
      {
        title: "Dashboard",
        id: 1,
        icon: "home",
        pathSlice: "dashboard",
        type: "sub",
        badge: "badge badge-light-primary",
        badgetxt: "8",
        children: [
          { path: "dashboard/default", title: "Admin Dashboard", type: "link" },
        ],
      },
    ],
  };

  // Transform API data to menu format with null check
  const transformedMenus =
    apiPayload?.map((module) => ({
      title: module.moduleName,
      menucontent: "Ready to use forms & tables",
      Items: [
        {
          title: module.moduleName,
          icon: module.icon || "table",
          id: module.id,
          pathSlice: module.path,
          type: "sub",
          children: module.getAllMenusChild.map((child) => ({
            path: child.path,
            title: child.moduleName,
            type: "link",
          })),
        },
      ],
    })) || [];

  return [dashboardMenu, ...transformedMenus];
}

export function useMenuList() {
  const dispatch = useAppDispatch();
  localStorage.setItem("previousRoute", window.location.pathname);
  const { getMenusByUserType } = useAppSelector((state) => state.menuReducer);

  const UserTypeId = localStorage.getItem("UserTypeId");

  useEffect(() => {
    if (UserTypeId) {
      dispatch(fetchGetMenusByUserTypeFormThunk(UserTypeId));
    }
  }, [dispatch, UserTypeId]);
  return transformApiToMenuList(getMenusByUserType?.form);
}
