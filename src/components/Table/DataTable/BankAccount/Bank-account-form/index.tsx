// @ts-nocheck
import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { PostOpenAccount } from "@/redux/services/cashManagementService";
import {
  fetchAllAccounts,
  fetchCheckAdminWalletSlice,
  fetchInhandSlice,
} from "@/redux/slices/cashManagementSlice";
import { fetchUserWarehouseThunk } from "@/redux/slices/administratorSlice";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
} from "reactstrap";
import AccountsTableComponent from "./AccountsTableComponent";
import { toast } from "react-toastify";
import { Box, IconButton, Tab, Tabs } from "@mui/material";
import { AiOutlineFileText } from "react-icons/ai";
import InHandDetailsModal from "./InHandDetailsModal";
import ConfirmationModal from "./ConfirmationModal";
import BankAccountFormModal from "./BankAccountFormModal";
import { Plus } from "react-feather";

interface Account {
  accountName: string;
  accountType: string;
  glCode: string;
  bankChargesAccount: string;
  bankName: string;
  accountNumber: string;
  ibanNumber: string;
  branchCode: string;
  bankAddress: string;
}

const BankAccountFormComponent: React.FC = () => {
  const [formState, setFormState] = useState<Account>({
    accountName: "",
    accountType: "",
    glCode: "",
    bankChargesAccount: "",
    bankName: "",
    accountNumber: "",
    ibanNumber: "",
    branchCode: "",
    bankAddress: "",
  });

  const [errors, setErrors] = useState({
    accountName: false,
    accountType: false,
    glCode: false,
    bankChargesAccount: false,
    bankName: false,
    accountNumber: false,
    ibanNumber: false,
    branchCode: false,
    bankAddress: false,
  });

  const [tabValue, setTabValue] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState<{
    type: string;
    amount: number;
  } | null>(null);
  const dispatch = useAppDispatch();

  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  const toggleModal = () => setConfirmModalOpen((prev) => !prev);

  const handleConfirm = async () => {
    toggleModal();

    await handleAddAccount();
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { checkAdminWallet } = useAppSelector(
    (state) => state.cashManagementReducer.cashManagement
  );

  const { userWarehouses } = useAppSelector(
    (state) => state.administratorReducer.userWarehouse
  );

  const selectedWarehouseId = useAppSelector(
    (state) => state.globalWarehouse?.selectedWarehouseId ?? null
  );

  useEffect(() => {
    if (selectedWarehouseId) {
      dispatch(fetchInhandSlice(selectedWarehouseId));
    }
  }, [selectedWarehouseId, dispatch]);

  useEffect(() => {
    dispatch(fetchCheckAdminWalletSlice());
    dispatch(fetchUserWarehouseThunk());
  }, [dispatch]);

  const tableData = useMemo(() => {
    if (!checkAdminWallet?.data?.cashDetails || !userWarehouses) return [];
    const {
      securityDeposit,
      gasPrice,
      deliveryCharges,
      discount,
      tax,
      urgentDeliveryCharges,
      other,
    } = checkAdminWallet?.data?.cashDetails;

    const totalotherPrice = other || 0;

    return userWarehouses
      .map((warehouse) => [
        {
          type: `Security Deposit In-hand ${warehouse?.city}`,
          amount: (Math.round(securityDeposit * 100) / 100).toFixed(2),
        },
        {
          type: `Other In-hand ${warehouse?.city}`,
          amount: (Math.round(totalotherPrice * 100) / 100).toFixed(2),
        },
      ])
      .flat();
  }, [checkAdminWallet, userWarehouses]);

  const columns = useMemo<MRT_ColumnDef<{ type: string; amount: number }>[]>(
    () => [
      {
        header: "Bank Account Type",
        accessorKey: "type",
        muiTableBodyCellProps: {
          sx: {
            color: "#0A80BF",
            fontWeight: "bold",
          },
        },
      },
      {
        header: "Amount",
        accessorKey: "amount",
        Cell: ({ row }) => {
          const amount = parseFloat(row.original.amount);
          return isNaN(amount)
            ? "0.00"
            : amount.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              });
        },
      },
      {
        id: "Logs",
        header: "Logs",
        Cell: ({ row }) => (
          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton
              color="primary"
              onClick={() => {
                setSelectedDetails(row.original);
                setModalOpen(true);
              }}
            >
              <AiOutlineFileText size={20} />
            </IconButton>
          </Box>
        ),
      },
    ],
    []
  );

  return (
    <Card>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          padding: "10px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="Bank Account Tabs"
        >
          <Tab label="Bank Accounts" />
          <Tab label="Inhand Bank Accounts" />
        </Tabs>
      </Box>

      <CardBody style={{ width: "100%", padding: "20px" }}>
        {tabValue === 0 && (
          <>
            <Button
              color="primary"
              onClick={() => setModalOpen(true)}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Plus size={20} style={{ marginRight: "8px" }} />
              Add Bank Account
            </Button>
            <BankAccountFormModal
              isOpen={modalOpen}
              toggle={() => setModalOpen(false)}
            />
            <AccountsTableComponent />
          </>
        )}
        {tabValue === 1 && (
          <Box p={3}>
            <MaterialReactTable
              columns={columns}
              data={tableData}
              muiTableProps={{
                sx: {
                  "& th": {
                    background: "#0A80BF",
                    color: "white",
                    whiteSpace: "nowrap",
                    padding: "4px 8px",
                  },
                  "& td": {
                    padding: "4px 8px",
                  },
                  "& tr": {
                    borderSpacing: "0px",
                  },
                  "& .MuiTableCell-root": {
                    margin: 0,
                  },
                },
              }}
            />

            <InHandDetailsModal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              details={selectedDetails}
            />
          </Box>
        )}
      </CardBody>
    </Card>
  );
};

export default BankAccountFormComponent;
