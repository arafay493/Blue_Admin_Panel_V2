// @ts-nocheck
import React, { useMemo } from "react";
import { Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { fetchContractorById } from "../../../../../redux/slices/generalSetupSlice";
import IconButton from "@mui/material/IconButton";
import { UserPlus } from "react-feather";
import { Edit } from "react-feather";

const ContractorListColumns = (handleEdit, openAddContactModal) => {
  const dispatch = useDispatch();

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableSorting: true,
      },
      {
        accessorKey: "code",
        header: "Contractor Code",
        enableSorting: true,
      },
      {
        accessorKey: "email",
        header: "Email",
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
        accessorKey: "isActive",
        header: "Status",
        enableSorting: true,
        Cell: ({ row }) => (row.original.isActive ? "Active" : "Inactive"),
      },
      {
        id: "addContact",
        header: "Add Contact",
        Cell: ({ row }) => (
          <IconButton
            color="primary"
            onClick={() => {
              dispatch(fetchContractorById(row.original.code));
              openAddContactModal(row.original);
            }}
          >
            <UserPlus />
          </IconButton>
        ),
      },
      {
        id: "edit",
        header: "Edit",
        Cell: ({ row }) => (
          <IconButton color="primary" onClick={() => handleEdit(row.original)}>
            <Edit size={20} />
          </IconButton>
        ),
      },
    ],
    [handleEdit, dispatch]
  );

  return columns;
};

export default ContractorListColumns;
