// @ts-nocheck
import React, { useEffect, useMemo } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { fetchCustomerOrderLog } from "../../../../../redux/slices/customerSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Loader from "@/components/Loader/Loader";

const OrderIDModal = ({ isOpen, toggle, orderId }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (orderId) {
      dispatch(fetchCustomerOrderLog(orderId));
    }
  }, [dispatch, orderId]);

  const { customerOrderLog } = useAppSelector(
    (state) => state.customerOrderLog
  );

  const columns = useMemo(
    () => [
      { id: "id", label: "Log ID", render: (log) => log.id },
      {
        id: "timestamp",
        label: "Timestamp",
        render: (log) => new Date(log.createdOn).toLocaleString(),
      },
      {
        id: "statusDescription",
        label: "Status Description",
        render: (log) => log.statusDescription,
      },
    ],
    []
  );

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Order Logs</ModalHeader>
      <ModalBody>
        {customerOrderLog ? (
          <div>
            <TableContainer component={Paper} style={{ marginTop: "20px" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        sx={{
                          background: "#0A80BF",
                          color: "white",
                          whiteSpace: "nowrap",
                          padding: "8px",
                          minWidth: "180px",
                        }}
                      >
                        <strong>{column.label}</strong>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customerOrderLog.customerOrderLog.logs &&
                  customerOrderLog.customerOrderLog.logs.length > 0 ? (
                    customerOrderLog.customerOrderLog.logs.map((log) => (
                      <TableRow key={log.id || Math.random()}>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            sx={{
                              padding: "8px",
                              minWidth: "180px",
                            }}
                          >
                            {column.render(log)}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} align="center">
                        No logs available.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          <p>No data available for this order.</p>
        )}
      </ModalBody>
    </Modal>
  );
};

export default OrderIDModal;
