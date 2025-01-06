import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { AddMasterItemType } from "@/redux/services/masterItemServices";
import { fetchAllMasterItemTypes } from "@/redux/slices/masterItemSlices";
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Input, Label, Row } from "reactstrap";
import { ItemTypeColumns } from "./columns";
import { MaterialReactTable } from "material-react-table";
import DeleteModal from "./DeleteModal";
import { toast } from "react-toastify";
import { FiDownload } from "react-icons/fi";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { exportToCSV } from "utils/csvUtils";

// Define the types for master item and row details
interface MasterItemType {
  id: number;
  name: string;
}

// Define the error type
interface Errors {
  newItem: boolean;
}

interface CsvRow {
  [key: string]: any;
}

const AddItemTypesTable: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useAppDispatch();
  const { masterItemTypes } = useAppSelector(
    (state: any) => state.masterItemTypes.masterItemTypes
  );

  const [newItem, setNewItem] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({ newItem: false });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [rowDetails, setRowDetails] = useState<MasterItemType | null>(null);

  useEffect(() => {
    dispatch(fetchAllMasterItemTypes());
  }, [dispatch]);

  const handleOpenDeleteModal = (row: MasterItemType) => {
    setRowDetails(row);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
  };

  const columns = ItemTypeColumns({ handleOpenDeleteModal });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewItem(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: false,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      newItem: !newItem,
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);

    if (!hasErrors) {
      const res = await AddMasterItemType({ name: newItem });
      if (res.succeeded === false) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        dispatch(fetchAllMasterItemTypes());
        setIsDeleteModalOpen(false);
        setNewItem("");
      }
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  // Export to CSV function
  const handleExportRowsToCSV = (rows) => {
    const headers = ["ID", "Name"];

    const data = rows.map((row) => ({
      ID: row.original.id,
      Name: row.original.name,
    }));

    exportToCSV(data, headers, "Add_Item_type.csv");
  };

  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <form
          onSubmit={handleSubmit}
          className="needs-validation custom-input"
          noValidate
        >
          <Row className="mb-3">
            <Col md={6} className="mb-3">
              <Input
                type="text"
                name="newItem"
                id="type"
                value={newItem}
                onChange={handleChange}
                className={errors.newItem ? "is-invalid" : ""}
                required
                placeholder="Add Item Type"
              />
              {errors.newItem && (
                <div className="invalid-feedback">Please Give Item Type</div>
              )}
            </Col>
            <Col xs={6} className="text-center">
              <Button color="primary" type="submit" style={{ width: "100%" }}>
                ADD MASTER ITEM TYPE
              </Button>
            </Col>
          </Row>
        </form>
        {masterItemTypes?.length > 0 && (
          <div className="table-responsive">
            <MaterialReactTable
              columns={columns}
              data={masterItemTypes}
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
                    className="button-responsive"
                    disabled={
                      table.getPrePaginationRowModel().rows.length === 0
                    }
                    color="primary"
                    onClick={() =>
                      handleExportRowsToCSV(
                        table.getPrePaginationRowModel().rows
                      )
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
        )}

        {isDeleteModalOpen && (
          <DeleteModal
            isOpen={isDeleteModalOpen}
            toggle={handleCloseModal}
            details={rowDetails}
          />
        )}
      </CardBody>
    </Card>
  );
};

export default AddItemTypesTable;
