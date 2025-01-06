import React, { useEffect, useState, ReactNode } from "react";
import Loader from "./Loader";
import { useAppSelector } from "@/redux/hooks";

interface LoaderWrapperProps {
  children: ReactNode; 
}

const LoaderWrapper = ({ children }: LoaderWrapperProps) => {
  const { vouchers, loading } = useAppSelector(
    (state) => state.vouchers.vouchers
  );
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined; 

    if (!loading) {
      timer = setTimeout(() => {
        setShowLoader(false);
      }, 2000);
    } else {
      setShowLoader(true);
    }

    return () => clearTimeout(timer);
  }, [loading]);

  return <>{loading && showLoader ? <Loader /> : children}</>;
};

export default LoaderWrapper;
