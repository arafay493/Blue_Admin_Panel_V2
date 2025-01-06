// @ts-nocheck
import React, { useEffect, useMemo, useState } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import {
  Card,
  CardBody,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { FaFileAlt } from "react-icons/fa";
import moment from "moment";
import { toast } from "react-toastify";
import { fetchCheckAdminWalletSlice } from "@/redux/slices/cashManagementSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchGetDepositAccountService,
  PostDeposit,
} from "@/redux/services/cashManagementService";
import ConfirmationModal from "./confirmationModal";

type Data = {
  id: string;
  consignmentNo: string;
  transferDate: string;
  driverName: string;
  vehicleNo: string;
  securityDeposit?: number;
  securityDepositDeposited?: number;
  other?: number;
  otherDeposited?: number;
};

const DepositFormComponent: React.FC = () => {
  const [difference, setDifference] = useState<number>(0);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [rowAmounts, setRowAmounts] = useState<{ [key: string]: number }>({});
  const [accounts, setAccounts] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  const [errorss, setErrorss] = useState({
    depositType: false,
    depositAccountNumber: false,
    depositSlipNumber: false,
    depositSlipURL: false,
    depositSlip: false,
    depositDate: false,
    depositAmount: false,
  });

  const [formState, setFormState] = useState({
    depositType: "",
    depositAccountNumber: "",
    depositSlipNumber: "",
    // depositAmount: "",
    depositSlipURL: "",
    depositDate: "",
    // amount: "",

    amount: "0",
    depositAmount: "0.00",
  });
  const [filteredData, setFilteredData] = useState<Data[]>([]);

  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!isModalOpen);

  const handleConfirm = async () => {
    toggleModal(); // Close the modal
    // Call the original handleSubmit function here
    await handleSubmit();
  };

  const dispatch = useAppDispatch();
  const { checkAdminWallet } = useAppSelector(
    (state) => state.cashManagementReducer.cashManagement
  );

  useEffect(() => {
    dispatch(fetchCheckAdminWalletSlice());
  }, [dispatch]);

  useEffect(() => {
    if (checkAdminWallet?.data?.consignmentReconciliations) {
      const adminData: Data[] = Array.isArray(
        checkAdminWallet.data.consignmentReconciliations
      )
        ? checkAdminWallet.data.consignmentReconciliations
        : [checkAdminWallet.data.consignmentReconciliations].filter(Boolean);
      setFilteredData(adminData);
    }
  }, [checkAdminWallet]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Recalculate difference when amount changes
    if (name === "amount") {
      const enteredAmount = parseFloat(value) || 0;
      const totalDepositAmount = parseFloat(formState.depositAmount) || 0;
      const difference = enteredAmount - totalDepositAmount;
      setDifference(parseFloat(difference.toFixed(2)));
    }
  };

  // const handleRowSelection = (rowId: string) => {
  //   const row = filteredData.find((r) => r.id === rowId);
  //   if (!row) return;

  //   const balance = row.balance || 0;
  //   const enteredAmount = parseFloat(formState.amount) || 0;

  //   let updatedSelectedRows = [...selectedRows];
  //   let updatedRowAmounts = { ...rowAmounts };

  //   if (!selectedRows.includes(rowId)) {
  //     // Add the row to the selected rows
  //     updatedSelectedRows.push(rowId);

  //     // Calculate the deposit amount for this row
  //     const depositAmount = Math.min(enteredAmount, balance);

  //     // Update row amounts
  //     updatedRowAmounts[rowId] = depositAmount;
  //   } else {
  //     // Remove the row from the selected rows
  //     updatedSelectedRows = updatedSelectedRows.filter((id) => id !== rowId);

  //     // Remove the deposit amount for this row
  //     delete updatedRowAmounts[rowId];
  //   }

  //   // Calculate the total deposit amount
  //   const totalDepositAmount = Object.values(updatedRowAmounts).reduce(
  //     (sum, value) => sum + value,
  //     0
  //   );

  //   // Calculate the difference as the remaining amount needed
  //   const newDifference = parseFloat((enteredAmount - totalDepositAmount).toFixed(2));

  //   // Update all states
  //   setSelectedRows(updatedSelectedRows);
  //   setRowAmounts(updatedRowAmounts);
  //   setFormState((prevState) => ({
  //     ...prevState,
  //     depositAmount: totalDepositAmount.toFixed(2), // Format deposit amount
  //   }));
  //   setDifference(newDifference); // Update difference
  // };

  const handleRowSelection = (rowId: string) => {
    const row = filteredData.find((r) => r.id === rowId);
    if (!row) return;

    const balance = row.balance || 0; // Current row's balance
    const enteredAmount = parseFloat(formState.amount) || 0; // Total deposit amount entered
    const totalAllocated = Object.values(rowAmounts).reduce(
      (sum, val) => sum + val,
      0
    ); // Total allocated amount so far
    const remainingAmount = enteredAmount - totalAllocated; // Remaining amount to allocate

    let updatedSelectedRows = [...selectedRows];
    let updatedRowAmounts = { ...rowAmounts };

    if (!selectedRows.includes(rowId)) {
      // Add the row to the selected rows
      updatedSelectedRows.push(rowId);

      // Calculate the amount to allocate for this row
      const depositAmount = Math.min(remainingAmount, balance);

      // Update row amounts
      updatedRowAmounts[rowId] = depositAmount;
    } else {
      // Remove the row from the selected rows
      updatedSelectedRows = updatedSelectedRows.filter((id) => id !== rowId);

      // Remove the deposit amount for this row
      delete updatedRowAmounts[rowId];
    }

    // Recalculate the total deposit amount and difference
    const totalDepositAmount = Object.values(updatedRowAmounts).reduce(
      (sum, value) => sum + value,
      0
    );
    const newDifference = parseFloat(
      (enteredAmount - totalDepositAmount).toFixed(2)
    );

    // Update all states
    setSelectedRows(updatedSelectedRows);
    setRowAmounts(updatedRowAmounts);
    setFormState((prevState) => ({
      ...prevState,
      depositAmount: totalDepositAmount.toFixed(2), // Format deposit amount
    }));
    setDifference(newDifference); // Update difference
  };

  const handleDepositTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const depositType = event.target.value;

    // Reset deposit-related fields
    setFormState((prevState) => ({
      ...prevState,
      depositType,
      depositAccountNumber: "",
      depositAmount: "0.00", // Initialize depositAmount
    }));

    // Update errors state dynamically
    setErrorss((prevErrors) => ({
      ...prevErrors,
      depositType: !depositType, // Set error if depositType is empty
    }));

    // Reset other related states
    setSelectedRows([]);
    setRowAmounts({});
    setDifference(parseFloat((parseFloat(formState.amount) || 0).toFixed(2)));

    // Filter data based on depositType
    if (depositType) {
      const adminData =
        checkAdminWallet?.data?.consignmentReconciliations || [];
      const baseData = Array.isArray(adminData)
        ? adminData
        : [adminData].filter(Boolean);

      const updatedData = baseData
        .map((row) => {
          const total =
            depositType === "SecurityDeposit"
              ? row.securityDeposit || 0
              : row.other || 0;
          const deposited =
            depositType === "SecurityDeposit"
              ? row.securityDepositDeposited || 0
              : row.otherDeposited || 0;
          const balance = total - deposited;

          return {
            ...row,
            total,
            balance: parseFloat(balance.toFixed(2)),
          };
        })
        .filter((row) => row.balance > 0);

      setFilteredData(updatedData);
    } else {
      setFilteredData([]);
    }
  };

  const handleAmountChange = (rowId: string, amount: number) => {
    setRowAmounts((prevAmounts) => ({
      ...prevAmounts,
      [rowId]: amount || 0,
    }));

    // Calculate total deposit amount from all row amounts
    const totalDepositAmount = Object.values({
      ...rowAmounts,
      [rowId]: amount || 0,
    }).reduce((sum, value) => sum + (value || 0), 0);

    // Update form state with the new total deposit amount
    setFormState((prevState) => ({
      ...prevState,
      depositAmount: totalDepositAmount.toFixed(2),
    }));

    // Calculate difference using the entered amount and total deposit amount
    const enteredAmount = parseFloat(formState.amount) || 0;
    const difference = enteredAmount - totalDepositAmount;
    setDifference(parseFloat(difference?.toFixed(2)));
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const base64 = await convertFileToBase64(file);
      setFormState((prevState) => ({
        ...prevState,
        depositSlipURL: base64,
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        depositSlipURL: "",
      }));
    }
  };

  const handleSubmit = async () => {
    const newErrorss = {
      depositType: !formState.depositType.trim(), // Validate depositType
      depositAccountNumber: !formState.depositAccountNumber.trim(),
      depositSlipNumber: !formState.depositSlipNumber.trim(),
      depositSlipURL: !formState.depositSlipURL.trim(),
      depositDate: !formState.depositDate.trim(),
    };

    setErrorss(newErrorss);
    const hasErrors = Object.values(newErrorss).some((error) => error);

    if (hasErrors) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    // Additional validation for rows and amounts
    if (selectedRows.length === 0) {
      toast.error("Please select at least one row.");
      return;
    }

    const missingAmounts = selectedRows.some((rowId) => {
      return !rowAmounts[rowId] || parseFloat(rowAmounts[rowId]) <= 0;
    });

    if (missingAmounts) {
      toast.error("Please fill the amount for all selected rows.");
      return;
    }
    // // Ensure required fields in formState are filled
    // for (let field in formState) {
    //   if (!formState[field]) {
    //     toast.error("Please fill all required fields.");
    //     return; // Prevent submission if a field is missing
    //   }
    // }

    const consignmentsDetail = selectedRows.map((rowId) => {
      const row = filteredData.find((r) => r.id === rowId);
      return {
        consignemntId: parseInt(rowId, 10),
        amount: parseFloat(rowAmounts[rowId]) || 0,
      };
    });

    const payload = {
      depositType: formState?.depositType,
      depositAccountNumber: formState?.depositAccountNumber,
      depositSlipNumber: formState?.depositSlipNumber,
      depositAmount: Number(
        consignmentsDetail.reduce((sum, item) => sum + item.amount, 0)
      ),
      depositSlipURL: formState?.depositSlipURL,
      depositDate: moment(formState?.depositDate).format("DD-MM-YYYY"),
      consignmentsDetail,
    };

    try {
      // Call PostDeposit API with the constructed payload
      const response = await PostDeposit(payload);

      if (response.statusCode === 200) {
        toast.success(response.message); // Show success toast

        // Reset all fields to their default state
        setFormState({
          depositType: "",
          depositAccountNumber: "",
          depositSlipNumber: "",
          depositAmount: "",
          depositSlipURL: "",
          depositDate: "",
        });
        setSelectedRows([]);
        setRowAmounts({});
        setFilteredData([]);
        dispatch(fetchCheckAdminWalletSlice());
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error submitting deposit:", error.message);
      toast.error("Failed to submit the deposit. Please try again.");
    }
  };

  useEffect(() => {
    if (formState.depositType) {
      fetchDepositAccounts(formState.depositType);
    }
  }, [formState.depositType]);

  const fetchDepositAccounts = (depositType: string) => {
    fetchGetDepositAccountService(depositType)
      .then((response: GetDepositAccountResponse) => {
        if (response.statusCode === 200 && response.succeeded) {
          setAccounts(response.data.accounts);
        } else {
          setError(response.message);
        }
      })
      .catch((err: any) => {
        setError(
          err.message || "An error occurred while fetching deposit accounts."
        );
      });
  };

  const columns: MRT_ColumnDef<Data>[] = useMemo(
    () => [
      {
        accessorKey: "checkbox",
        header: "",
        Cell: ({ row }) => {
          const isSelected = selectedRows.includes(row.original.id);
          return (
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => handleRowSelection(row.original.id)}
            />
          );
        },

        muiTableFooterCellProps: {
          sx: {
            backgroundColor: "gray",
            color: "white",
          },
        },
      },
      {
        accessorKey: "id",
        header: "Consignment No.",
        Cell: ({ cell }) => (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <FaFileAlt style={{ marginRight: "8px", color: "#0A80BF" }} />
            <a
              href="#"
              style={{
                textDecoration: "none",
                color: "#0A80BF",
                fontWeight: "bold",
              }}
            >
              {cell.getValue<string>()}
            </a>
          </span>
        ),
        Footer: ({ table }) => {
          return (
            <span
              style={{
                fontWeight: "bold",
                color: "white",
                padding: "10px 0",
                textAlign: "left",
              }}
            >
              Total Amount
            </span>
          );
        },
        muiTableFooterCellProps: {
          sx: {
            backgroundColor: "gray",
            color: "white",
          },
        },
      },

      {
        accessorKey: "total",
        header: "Received Amount",
        Cell: ({ cell }) => {
          const value = cell.getValue<number>();
          return value.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
        },
        muiTableFooterCellProps: {
          sx: {
            backgroundColor: "gray",
            color: "white",
          },
        },
        Footer: ({ table }) => {
          const receivedAmount = table
            .getPreFilteredRowModel()
            .rows.reduce(
              (sum, row) => sum + (parseFloat(row.getValue("total")) || 0),
              0
            );

          return (
            <div
              style={{
                fontWeight: "bold",
                color: "white",
                padding: "10px 0",
                textAlign: "left",
              }}
            >
              {receivedAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          );
        },
        muiTableFooterCellProps: {
          align: "right",
          sx: {
            backgroundColor: "gray",
            color: "white",
            fontWeight: "bold",
          },
        },
      },
      {
        accessorKey: "balance",
        header: "Balance",
        Cell: ({ row }) =>
          row.original.balance.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
        Footer: ({ table }) => {
          const totalBalance = table
            .getPreFilteredRowModel()
            .rows.reduce(
              (sum, row) => sum + (parseFloat(row.getValue("balance")) || 0),
              0
            );

          return (
            <div
              style={{
                fontWeight: "bold",
                color: "white",
                padding: "10px 0",
                textAlign: "left",
              }}
            >
              {totalBalance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          );
        },
        muiTableFooterCellProps: {
          align: "right",
          sx: {
            backgroundColor: "gray",
            color: "white",
            fontWeight: "bold",
          },
        },
      },
      {
        accessorKey: "depositAmount",
        header: "Deposit Amount",
        Cell: ({ row }) => {
          const isRowSelected = selectedRows.includes(row.original.id); // Check if the row is selected

          const balance = row.original.balance;

          return (
            <input
              type="number"
              value={rowAmounts[row.original.id] || ""}
              onChange={(e) => {
                const inputValue = e.target.value;
                // Check if the input value is less than or equal to the received amount
                if (parseFloat(inputValue) <= balance || inputValue === "") {
                  handleAmountChange(
                    row.original.id,
                    inputValue === "" ? 0 : parseFloat(inputValue)
                  );
                }
              }}
              style={{
                width: "70%",
                padding: "5px",
                fontSize: "14px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                color: isRowSelected ? "#000" : "#ccc",
                backgroundColor: isRowSelected ? "#fff" : "#f5f5f5",
                cursor: isRowSelected ? "text" : "not-allowed",
              }}
              disabled={!isRowSelected}
            />
          );
        },
        muiTableFooterCellProps: {
          sx: {
            backgroundColor: "gray",
            color: "white",
          },
        },
      },
      {
        accessorKey: "transferDate",
        header: "Transfer Date",
        muiTableFooterCellProps: {
          sx: {
            backgroundColor: "gray",
            color: "white",
          },
        },
      },
      {
        accessorKey: "driverName",
        header: "Driver Name",
        muiTableFooterCellProps: {
          sx: {
            backgroundColor: "gray",
            color: "white",
          },
        },
      },
      {
        accessorKey: "vehicleNumber",
        header: "Vehicle No.",
        muiTableFooterCellProps: {
          sx: {
            backgroundColor: "gray",
            color: "white",
          },
        },
      },
    ],
    [selectedRows, rowAmounts]
  );

  return (
    <Card>
      <CardBody>
        <Form>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label for="depositType">Deposit Type</Label>
                <Input
                  type="select"
                  name="depositType"
                  value={formState.depositType}
                  onChange={handleDepositTypeChange}
                  className={errorss.depositType ? "is-invalid" : ""}
                >
                  <option value="">Select Type</option>
                  <option value="SecurityDeposit">SecurityDeposit</option>
                  <option value="Other">Other</option>
                </Input>
                {errorss.depositType && (
                  <div className="invalid-feedback">
                    Please select Deposit Type
                  </div>
                )}
              </FormGroup>
            </Col>

            <Col md={4}>
              <FormGroup>
                <Label for="depositAccountNumber">Deposit Account</Label>
                <Input
                  type="select"
                  name="depositAccountNumber"
                  value={formState.depositAccountNumber}
                  onChange={handleFormChange}
                  className={errorss.depositAccountNumber ? "is-invalid" : ""}
                >
                  <option value="">Select Account</option>
                  {accounts.length === 0 ? (
                    <option disabled>No accounts found</option>
                  ) : (
                    accounts.map((account, index) => (
                      <option key={index} value={account.accountNumber}>
                        {account.accountName}
                      </option>
                    ))
                  )}
                </Input>
                {errorss.depositAccountNumber && (
                  <div className="invalid-feedback">
                    Please select Deposit Account
                  </div>
                )}
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="depositSlipNumber">Deposit Number</Label>
                <Input
                  type="text"
                  name="depositSlipNumber"
                  value={formState.depositSlipNumber}
                  onChange={handleFormChange}
                  className={errorss.depositSlipNumber ? "is-invalid" : ""}
                />
                {errorss.depositSlipNumber && (
                  <div className="invalid-feedback">
                    Please enter Deposit Number
                  </div>
                )}
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="depositDate">Deposit Date</Label>
                <Input
                  type="date"
                  name="depositDate"
                  value={formState.depositDate}
                  onChange={handleFormChange}
                  className={errorss.depositDate ? "is-invalid" : ""}
                />
                {errorss.depositDate && (
                  <div className="invalid-feedback">
                    Please enter Deposit Number
                  </div>
                )}
              </FormGroup>
            </Col>

            <Col md={4}>
              <FormGroup>
                <Label for="depositAmount">Deposit Amount</Label>
                <Input
                  type="number"
                  name="amount"
                  value={formState.amount}
                  className={errorss.depositAmount ? "is-invalid" : ""}
                  // onChange={handleFormChange}
                  onChange={(e) =>
                    setFormState({ ...formState, amount: e.target.value })
                  }
                />
                {errorss.depositAmount && (
                  <div className="invalid-feedback">
                    Please enter Deposit Amount
                  </div>
                )}
              </FormGroup>
            </Col>

            <Col md={4}>
              <FormGroup>
                <Label for="depositSlip">Deposit Slip</Label>
                <Input
                  type="file"
                  name="depositSlip"
                  onChange={handleFileChange}
                  className={errorss.depositSlipURL ? "is-invalid" : ""}
                />
                {errorss.depositSlipURL && (
                  <div className="invalid-feedback">
                    Please enter Deposit Slip
                  </div>
                )}
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label for="depositAmount">Total Deposit Amount</Label>
                <Input
                  type="text"
                  name="depositAmount"
                  value={formState.depositAmount}
                  disabled
                />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label for="difference">Difference</Label>
                <Input
                  type="number"
                  name="difference"
                  value={difference?.toFixed(2)}
                  disabled
                />
              </FormGroup>
            </Col>
          </Row>
          <div className="d-flex justify-content-center mt-4">
            {formState.depositType ? (
              <MaterialReactTable
                columns={columns}
                data={filteredData}
                enableTableFooter={true}
                muiTableProps={{
                  sx: {
                    "& th": {
                      background: "#0A80BF",
                      color: "white",
                      whiteSpace: "nowrap",
                      padding: "8px",
                      "& .MuiSvgIcon-root": {
                        color: "white !important",
                      },
                      "& .MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                      "& .MuiTableSortLabel-root:hover .MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                      "& .MuiTableSortLabel-root.Mui-active .MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    },
                  },
                }}
              />
            ) : (
              <Col className="text-center">
                <p>Please select a deposit type</p>
              </Col>
            )}
          </div>{" "}
          <div className="d-flex justify-content-end mt-4">
            <Col className="text-center">
              <Button
                color="primary"
                onClick={toggleModal}
                disabled={difference !== 0}
              >
                Submit
              </Button>
            </Col>
          </div>
          <ConfirmationModal
            isOpen={isModalOpen}
            toggle={toggleModal}
            onConfirm={handleConfirm}
            message="Are you sure you want to deposit?"
          />
        </Form>
      </CardBody>
    </Card>
  );
};

export default DepositFormComponent;
