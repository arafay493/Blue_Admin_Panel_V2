import React, { useEffect, useState } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { Button, Card, CardBody } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  fetchUserList,
  fetchUserListType,
} from "@/redux/slices/administratorSlice";
import { Box, IconButton } from "@mui/material";
import { deleteUser, updateUser } from "@/redux/services/administratorService";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import EditUserModal from "./EditUserModal";
import { FiDownload } from "react-icons/fi";
import { exportToCSV } from "utils/csvUtils";
import { Edit, Trash } from "react-feather";
import Loader from "@/components/Loader/Loader";

interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  mobile?: string;
  mobile2?: string;
  userType?: string;
  status: boolean;
}

const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userList } = useAppSelector((state) => state.userList);
  const { userTypeList } = useAppSelector((state) => state.userTypeList);

  const loading: boolean = useAppSelector(
    (state) => state?.userList?.userList?.loading
  );

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const userTypeMapping = userTypeList.addUserTypeList?.reduce(
    (acc, userType) => {
      acc[userType.key] = userType.value;
      return acc;
    },
    {} as Record<string, string>
  );

  useEffect(() => {
    dispatch(fetchUserList());
    dispatch(fetchUserListType());
  }, [dispatch]);

  const toggleDeleteModal = () => setDeleteModalOpen(!deleteModalOpen);
  const toggleEditModal = () => setEditModalOpen(!editModalOpen);

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    toggleDeleteModal();
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    toggleEditModal();
  };

  const confirmDelete = () => {
    if (selectedUser) {
      deleteUser(Number(selectedUser.id))
        .then((result) => {
          if (result.statusCode === 200) {
            toast.success(result.message || "User deleted successfully!");
            dispatch(fetchUserList());
          } else {
            toast.error(result.message || "Failed to delete user.");
          }
        })
        .catch((error) => {
          toast.error(error.message || "Failed to delete user.");
        });
      toggleDeleteModal();
    }
  };

  const saveUserChanges = (editedUser: User) => {
    updateUser(
      Number(editedUser.id),
      editedUser.email || "",
      editedUser.name || "",
      editedUser.password || "",
      editedUser.mobile || "",
      editedUser.mobile2 || "",
      editedUser.phone || "",
      editedUser.email || "",
      editedUser.userType || "user",
      true
    )
      .then((response) => {
        if (response.statusCode === 200) {
          toast.success(response.message || "User updated successfully!");
          dispatch(fetchUserList());
        } else {
          toast.error(response.message || "Failed to update user.");
        }
      })
      .catch((error) => {
        toast.error(error.message || "Failed to update user.");
      });
    toggleEditModal();
  };

  const columns: MRT_ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: "ID",
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
      accessorKey: "userType",
      header: "User Type",
      enableSorting: true,
      Cell: ({ row }) => {
        const userTypeKey = row.original.userType;
        return userTypeMapping?.[userTypeKey] || "N/A";
      },
    },
    {
      accessorKey: "isActive",
      header: "Status",
      enableSorting: true,
      Cell: ({ cell }) => (cell.getValue<boolean>() ? "Active" : "Inactive"),
    },
    {
      header: "Edit",
      Cell: ({ row }) => (
        <IconButton
          color="primary"
          onClick={() => handleEditClick(row.original)}
        >
          <Edit size={20} />
        </IconButton>
      ),
    },
    {
      header: "Delete",
      Cell: ({ row }) => (
        <IconButton
          onClick={() => handleDeleteClick(row.original)}
          sx={{ color: "red" }}
        >
          <Trash size={20} />
        </IconButton>
      ),
    },
  ];

  // Export to CSV function
  const handleExportRowsToCSV = (rows) => {
    const headers = ["ID", "Email", "Name", "UserType", "Status"];

    const data = rows.map((row) => ({
      ID: row.original.id,
      Email: row.original.email,
      Name: row.original.name,
      UserType: userTypeMapping?.[row.original.userType] || "N/A",
      Status: row.original.status ? "Active" : "Inactive",
    }));

    exportToCSV(data, headers, "user-list.csv");
  };

  if (loading) return <Loader />;

  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <div className="table-responsive">
          {userList?.userList ? (
            <MaterialReactTable
              columns={columns}
              data={userList.userList.map((user: any) => ({
                ...user,
                id: String(user.id),
              }))}
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
                    Export All Rows to CSV
                  </Button>
                </Box>
              )}
            />
          ) : (
            <div>No data available</div>
          )}
        </div>
      </CardBody>

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        toggle={toggleDeleteModal}
        confirmDelete={confirmDelete}
        selectedUser={selectedUser}
      />

      <EditUserModal
        isOpen={editModalOpen}
        toggle={toggleEditModal}
        selectedUser={selectedUser}
        saveChanges={saveUserChanges}
      />
    </Card>
  );
};

export default UserList;
