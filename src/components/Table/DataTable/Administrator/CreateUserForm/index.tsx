import React, { useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { Card, CardBody, Col } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { fetchUserType } from "@/redux/slices/administratorSlice";
import CreateUserFormComponent from "./CreateUserForm";

const CreateUserForm = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserType());
  }, [dispatch]);

  const columns = [
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
      accessorKey: "stage",
      header: "Stage",
      enableSorting: true,
    },
  ];

  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <CreateUserFormComponent />
      </CardBody>
    </Card>
  );
};

export default CreateUserForm;
