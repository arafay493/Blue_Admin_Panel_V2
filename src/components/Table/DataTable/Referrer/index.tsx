import React, { useEffect, useMemo } from "react";
import { Card, CardBody } from "reactstrap";
import { MaterialReactTable } from "material-react-table";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchAllReferrer,
  fetchReferrerDashboard,
} from "@/redux/slices/influencerSlice";
import { columns } from "./Column";

const ReferrerComponent = () => {
  const dispatch = useAppDispatch();
  const { referrer } = useAppSelector(
    (state) => state.influencerReducer.ReferrerInfluencer
  );

  const { referrerDetails } = useAppSelector(
    (state) => state.influencerReducer.referrerDashboard
  );

  useEffect(() => {
    dispatch(fetchAllReferrer());
    dispatch(fetchReferrerDashboard(2587));
  }, [dispatch]);

  const memoizedColumns = useMemo(() => columns, []);

  console.log(referrerDetails);
  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <div className="table-responsive">
          <MaterialReactTable
            columns={memoizedColumns}
            data={referrer || []}
            muiTableProps={{
              sx: {
                "& th": {
                  background: "#0A80BF",
                  color: "white",
                  whiteSpace: "nowrap",
                  padding: "8px",
                  minWidth: "180px",
                },
                "& td": {
                  padding: "8px",
                  minWidth: "180px",
                },
              },
            }}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default ReferrerComponent;
