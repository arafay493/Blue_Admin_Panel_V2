// @ts-nocheck
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchOrderLocation } from "@/redux/slices/customerSlice";
import React, { useEffect } from "react";
import { Button, Card, CardBody } from "reactstrap";
import OrderLocationForm from "./OrderLocationForm";
import OrderLocationMap from "./OrderLocationMap";

const OrderLocation = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrderLocation());
  }, [dispatch]);

  return (
    <Card className="main-stock-wrapper">
      <CardBody>
        <OrderLocationForm />
        <OrderLocationMap />
      </CardBody>
    </Card>
  );
};

export default OrderLocation;
