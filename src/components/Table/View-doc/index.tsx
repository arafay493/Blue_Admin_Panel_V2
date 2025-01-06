// @ts-nocheck
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchStockDetails } from "@/redux/slices/masterConsignmentSlice";
import DocPDF from "./DocPDF";

import { useSearchParams } from "next/navigation";
import { Card, CardBody } from "reactstrap";

const ViewDoc: React.FC = () => {
  const dispatch = useAppDispatch();
  let searchParams = useSearchParams();
  let docId = searchParams.get("docId");

  useEffect(() => {
    dispatch(fetchStockDetails(docId));
  }, [dispatch]);

  const stockDetails = useAppSelector(
    (state) => state.masterConsignmentReducer.stockdetails
  );

  if (!stockDetails || stockDetails.stockDetails.length === 0) {
    return <p>Loading document data...</p>;
  }

  const docData = stockDetails.stockDetails[0];

  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <div style={{ overflow: "auto" }}>
          <DocPDF formType={"stock"} docData={docData} />
        </div>
      </CardBody>
    </Card>
  );
};

export default ViewDoc;
