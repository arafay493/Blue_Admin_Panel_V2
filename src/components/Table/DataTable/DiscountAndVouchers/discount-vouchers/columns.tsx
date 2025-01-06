import { IconButton, Switch } from "@mui/material";
import moment from "moment";
import { useMemo } from "react";
import { Edit, Eye, Trash } from "react-feather";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { Button } from "reactstrap";

export const VouchersListColumns = ({
  handleOpenAssignModal,
  handleOpenViewModal,
  handleOpenCreateModal,
  handleOpenUpdateModal,
  handleOpenDeleteModal,
}) => {
  const col = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableSorting: true,
      },
      {
        accessorKey: "name",
        header: "Name",
        enableSorting: true,
      },
      {
        accessorKey: "applicableRegion",
        header: "Applicable Region",
        enableSorting: true,
      },
      {
        accessorKey: "discountType",
        header: "Discount Type",
        enableSorting: true,
      },
      {
        accessorKey: "voucherType",
        header: "Voucher Type",
        enableSorting: true,
      },
      {
        accessorKey: "expiryDays",
        header: "Usage Limit",
        enableSorting: true,
      },
      {
        accessorKey: "signUpsCap",
        header: "Sign Up Count",
      },
      {
        accessorKey: "discountValue",
        header: "Discount Value",
        enableSorting: true,
      },
      {
        accessorKey: "discountCapAmount",
        header: "Discount Cap Amount",
        enableSorting: true,
      },
      {
        accessorKey: "minimumOrderAmount",
        header: "Min Order Amount",
        enableSorting: true,
      },
      {
        accessorKey: "applicableFrom",
        header: "Start Date",
        enableSorting: true,
        Cell: ({ row }) => (
          <div>
            {moment(row?.original.applicableFrom).format("DD-MM-YYYY") || "NA"}
          </div>
        ),
      },
      {
        accessorKey: "applicableTo",
        header: "End Date",
        enableSorting: true,
        Cell: ({ row }) => (
          <div>
            {moment(row?.original.applicableTo).format("DD-MM-YYYY") || "NA"}
          </div>
        ),
      },
      {
        accessorKey: "active/inactive",
        header: "Active/Inactive",
        enableSorting: true,
        Cell: ({ row }) => (
          <Switch
            onClick={() => handleOpenDeleteModal(row.original)}
            checked={row.original.isActive === true}
            disabled={row?.original?.isActive !== true}
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "white",
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "green",
              },

              "& .MuiSwitch-switchBase + .MuiSwitch-track": {
                backgroundColor: "red",
              },
            }}
          />
        ),
      },
      {
        accessorKey: "assign",
        header: "Assign",
        enableSorting: true,
        Cell: ({ row }) => (
          <IconButton
            color="primary"
            onClick={() => handleOpenAssignModal(row.original)}
          >
            <AiOutlineDeliveredProcedure size={25} />
          </IconButton>
        ),
      },
      {
        accessorKey: "update",
        header: "Update",
        enableSorting: true,
        Cell: ({ row }) => (
          <IconButton
            color="primary"
            onClick={() => handleOpenUpdateModal(row.original)}
          >
            <Edit size={20} />
          </IconButton>
        ),
      },
      {
        accessorKey: "view",
        header: "View",
        enableSorting: true,
        Cell: ({ row }) => (
          <IconButton
            color="primary"
            onClick={() => handleOpenViewModal(row.original)}
          >
            <Eye size={20} />
          </IconButton>
        ),
      },
      // {
      //   accessorKey: "delete",
      //   header: "Delete",
      //   enableSorting: true,
      //   Cell: ({ row }) => (
      //     <IconButton
      //       color="secondary"
      //       onClick={() => handleOpenDeleteModal(row.original)}
      //     >
      //       <Trash size={20} style={{ color: "red" }} />
      //     </IconButton>
      //   ),
      // },
    ],
    []
  );

  return col;
};

export const CustomerColumns = ({
  handleSelectAll,
  handleCheckboxChange,
  selectedRows,
  customers,
}) => {
  const col = useMemo(
    () => [
      {
        accessorKey: "checkbox",
        header: (
          <>
            <input type="checkbox" onChange={handleSelectAll} />
            &nbsp; Select All
          </>
        ),
        Cell: ({ row }) => (
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(row?.original)}
            checked={selectedRows.some((item) => item.id === row?.original?.id)}
          />
        ),
      },
      {
        accessorKey: "id",
        header: "ID",
        enableSorting: true,
      },
      {
        accessorKey: "name",
        header: "Name",
        enableSorting: true,
      },

      {
        accessorKey: "phone",
        header: "Phone Number",
        enableSorting: true,
      },
      {
        accessorKey: "email",
        header: "Email",
        enableSorting: true,
      },
    ],
    [selectedRows, handleSelectAll]
  );

  return col;
};

export const AssignedVoucherListColumns = ({ singleVoucher }) => {
  const col = useMemo(
    () => [
      {
        accessorKey: "customerId",
        header: "Customer ID",
        enableSorting: true,
      },
      {
        accessorKey: "customerName",
        header: "Customer Name",
        enableSorting: true,
      },
      {
        accessorKey: "customerPhone",
        header: "Phone Number",
        enableSorting: true,
      },
      {
        accessorKey: "customerEmail",
        header: "Email",
        enableSorting: true,
      },
      {
        accessorKey: "discountCap",
        header: "Discount Cap",
        enableSorting: true,
      },
      {
        accessorKey: "isActive",
        header: "Active Status",
        enableSorting: true,
        Cell: ({ cell }) => (cell.getValue() ? "Active" : "Inactive"),
      },
    ],
    []
  );

  return col;
};
