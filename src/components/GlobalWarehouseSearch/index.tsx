import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchUserWarehouseThunk } from "@/redux/slices/administratorSlice";
import {
  setSelectedWarehouse,
  setSelectedCityId,
} from "@/redux/slices/globalWarehouseSlice";
import Select, { components } from "react-select";
import { AiOutlineDown, AiOutlineClose } from "react-icons/ai";

const DropdownIndicator = (props) => (
  <components.DropdownIndicator {...props}>
    <AiOutlineDown style={{ color: "#000" }} />
  </components.DropdownIndicator>
);

const ClearIndicator = (props) => (
  <components.ClearIndicator {...props}>
    <AiOutlineClose style={{ color: "#000" }} />
  </components.ClearIndicator>
);

const GlobalWarehouseSearch = () => {
  const dispatch = useAppDispatch();

  const { userWarehouses, loading } = useAppSelector(
    (state) => state.administratorReducer.userWarehouse
  );

  const selectedWarehouseId = useAppSelector(
    (state) => state.globalWarehouse?.selectedWarehouseId ?? null
  );

  const selectedCityId = useAppSelector(
    (state) => state.globalWarehouse?.selectedCityId ?? null
  );

  const options =
    userWarehouses?.map((warehouse) => ({
      value: warehouse.id,
      label: warehouse.name,
      cityId: warehouse.cityId,
    })) || [];

  useEffect(() => {
    dispatch(fetchUserWarehouseThunk());
  }, [dispatch]);

  useEffect(() => {
    // Only set default if no stored value exists and there's exactly one option
    if (options.length === 1 && !selectedWarehouseId && !localStorage.getItem('globalWarehouse')) {
      dispatch(setSelectedWarehouse(options[0].value));
      dispatch(setSelectedCityId(options[0].cityId));
    }
  }, [options, selectedWarehouseId, dispatch]);

  const handleWarehouseChange = (selectedOption) => {
    if (selectedOption) {
      dispatch(setSelectedWarehouse(selectedOption.value));
      dispatch(setSelectedCityId(selectedOption.cityId));
    } else {
      dispatch(setSelectedWarehouse(null));
      dispatch(setSelectedCityId(null));
    }
  };

  return (
    <div className="global-warehouse-search">
      <Select
        options={options}
        onChange={handleWarehouseChange}
        value={
          options.find((option) => option.value === selectedWarehouseId) || null
        }
        placeholder={loading ? "Loading warehouses..." : "Search Warehouse..."}
        isDisabled={loading || options.length === 1}
        isClearable={options.length > 1}
        isSearchable={options.length > 1}
        className="warehouse-select"
        components={{ DropdownIndicator, ClearIndicator }}
        styles={{
          control: (provided) => ({
            ...provided,
            minWidth: "200px",
            background: "white",
            borderColor: "#e6edef",
            minHeight: "35px",
            height: "35px",
          }),
          menu: (provided) => ({
            ...provided,
            zIndex: 9999,
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? "#f0f0f0" : "white",
            color: "#2b2b2b",
            padding: "4px 12px",
            fontSize: "14px",
            "&:hover": {
              backgroundColor: "#e6edef",
            },
          }),
          valueContainer: (provided) => ({
            ...provided,
            height: "35px",
            padding: "0 6px",
          }),
          input: (provided) => ({
            ...provided,
            margin: "0px",
          }),
          indicatorSeparator: () => ({
            display: "none",
          }),
          dropdownIndicator: (provided) => ({
            ...provided,
            padding: "0 4px",
          }),
        }}
      />
    </div>
  );
};

export default GlobalWarehouseSearch;
