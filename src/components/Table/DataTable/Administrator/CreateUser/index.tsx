import React, { useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { Card, CardBody, Button } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { fetchUserType } from "@/redux/slices/administratorSlice";
import FormComponent from "./CreateUserTypeForm";
import { FiDownload } from "react-icons/fi";
import { exportToCSV } from "utils/csvUtils";

const CreateUser = () => {
  const dispatch = useAppDispatch();
  const { userType } = useAppSelector((state) => state.userType);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    dispatch(fetchUserType());
  }, [dispatch]);

  // Export to CSV function
  const handleExportRowsToCSV = (rows) => {
    // const headers = ["id", "name", "stage"];
    const headers = ["userTypeName"];

    const data = rows.map((row) => ({
      // id: row.original.id,
      // name: row.original.name,
      // stage: row.original.stage,
      userTypeName: row.original.stage,
    }));

    exportToCSV(data, headers, "user-type.csv");
  };

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      enableSorting: true,
    },
    {
      accessorKey: "userTypeName",
      header: "User Type Name",
      enableSorting: true,
    },
    // {
    //   accessorKey: "stage",
    //   header: "Stage",
    //   enableSorting: true,
    // },
  ];

  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <FormComponent />
        <div className="table-responsive">
          <MaterialReactTable
            columns={columns}
            data={userType.userType}
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
            renderTopToolbarCustomActions={({ table }) => (
              <Box>
                <Button
                  disabled={table.getPrePaginationRowModel().rows.length === 0}
                  color="primary"
                  onClick={() =>
                    handleExportRowsToCSV(table.getPrePaginationRowModel().rows)
                  }
                  variant="text"
                  style={{
                    fontSize: isSmallScreen ? "12px" : "16px",
                  }}
                >
                  <FiDownload
                    color="primary"
                    style={{
                      fontSize: "18px",
                      color: "inherit",
                      verticalAlign: "middle",
                      marginRight: "10px",
                    }}
                  />
                  Export to CSV
                </Button>
              </Box>
            )}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default CreateUser;
