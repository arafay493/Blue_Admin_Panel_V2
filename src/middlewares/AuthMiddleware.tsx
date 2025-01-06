"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMenuList } from "@/layout/Sidebar/menu";
import Loader from "@/components/Loader/Loader";

export const withAuth = (WrappedComponent: any) => {
  return function WithAuth(props: any) {
    const router = useRouter();
    const previousRoute = localStorage.getItem("previousRoute");
    const session = localStorage.getItem("AuthToken");
    const currentPath = window.location.pathname;
    const curPath = window.location.pathname.slice(1);
    const menuList: any = useMenuList();
    const allPaths = menuList
      ?.flatMap((item) => item.Items) // Items array ko flatten karain
      .flatMap((item) => item.children)
      .map((child) => child.path);
    // console.log(allPaths, currentPath, allPaths.includes(currentPath));
    const IncludesCurrentPath = allPaths.includes(curPath);
    const [isLoading, setIsLoading] = useState(true);
    // console.log(IncludesCurrentPath, allPaths, curPath);

    useEffect(() => {
      if (session && currentPath === "/authentication/login") {
        router.push(previousRoute);
        setIsLoading(false);
      }

      if (session && currentPath === "/") {
        router.push("/dashboard/default");
        setIsLoading(false);
      }

      if (session && IncludesCurrentPath) {
        // router.push("/table/adminstrator/create-user-type");
        router.push(currentPath);
        setIsLoading(false);
      }
      if (session && !IncludesCurrentPath) {
        // router.push(previousRoute);
        router.push("/pages/errors/error404");
        setIsLoading(false);
      }
      if (!session) {
        router.push("/authentication/login");
        setIsLoading(false);
      }
    }, [IncludesCurrentPath, previousRoute]);

    if (isLoading) {
      return (
        <div
          className="d-flex flex-row justify-content-center align-items-center "
          style={{ height: "100vh" }}
        >
          <Loader />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};
