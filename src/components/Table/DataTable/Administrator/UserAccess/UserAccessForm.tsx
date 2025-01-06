// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Row, Col, Label, Input, FormGroup, Button } from "reactstrap";
import {
  fetchGetAllMenusThunk,
  fetchGetAllUserTypesThunk,
  fetchGetMenusByUserTypeThunk,
} from "../../../../../redux/slices/menuSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateUserAccessV2Service } from "@/redux/services/menuServices";
import { toast } from "react-toastify";
import CreateUserTypeModal from "./CreateNewUserModal";
import { Plus } from "react-feather";

const UserAccessForm = () => {
  const dispatch = useAppDispatch();

  const [checkedItems, setCheckedItems] = useState({});
  const [userTypeId, setUserTypeId] = useState("");
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);

  const toggleCreateUserModal = () => {
    setIsCreateUserModalOpen(!isCreateUserModalOpen);
  };

  useEffect(() => {
    dispatch(fetchGetAllMenusThunk());
    dispatch(fetchGetAllUserTypesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (userTypeId && userTypeId !== "createNew") {
      setCheckedItems({});
      dispatch(fetchGetMenusByUserTypeThunk(userTypeId));
    }
  }, [dispatch, userTypeId]);

  const { data } = useAppSelector((state) => state.menuReducer.getAllMenus);
  const { datas } = useAppSelector(
    (state) => state.menuReducer.getMenusByUserType
  );
  const { userTypes } = useAppSelector(
    (state) => state.menuReducer.getAllUserTypes
  );

  useEffect(() => {
    if (datas) {
      const preCheckedItems = {};
      datas.forEach((menu) => {
        preCheckedItems[`menu_${menu.id}`] = true;
        menu.getAllMenusChild?.forEach((child) => {
          preCheckedItems[`child_${child.id}`] = true;
        });
      });
      setCheckedItems(preCheckedItems);
    }
  }, [datas]);

  const handleParentChange = (parentId, childIds) => {
    setCheckedItems((prev) => {
      const isParentChecked = !prev[`menu_${parentId}`];
      const updatedItems = { ...prev };

      updatedItems[`menu_${parentId}`] = isParentChecked;
      childIds.forEach((childId) => {
        updatedItems[`child_${childId}`] = isParentChecked;
      });

      return updatedItems;
    });
  };
  const handleChildChange = (childId, parentId) => {
    setCheckedItems((prev) => {
      const isChildChecked = !prev[`child_${childId}`];
      const updatedItems = { ...prev };

      updatedItems[`child_${childId}`] = isChildChecked;

      if (isChildChecked) {
        updatedItems[`menu_${parentId}`] = true;
      } else {
        const parentChildIds = data.data
          .find((menu) => menu.id === parentId)
          ?.getAllMenusChild.map((child) => `child_${child.id}`);
        const areAllChildrenUnchecked = parentChildIds.every(
          (id) => !updatedItems[id]
        );

        if (areAllChildrenUnchecked) {
          updatedItems[`menu_${parentId}`] = false;
        }
      }

      return updatedItems;
    });
  };
  const handleAllowAccess = () => {
    if (!userTypeId) {
      toast.error("Please select a user type.");
      return;
    }

    const menuAccess = data.data.flatMap((menu) => {
      const isMenuChecked = checkedItems[`menu_${menu.id}`];
      const childAccess = menu.getAllMenusChild?.map((child) => ({
        menuId: child.id,
        isAllowed: !!checkedItems[`child_${child.id}`], 
      }));

      const parentAccess = {
        menuId: menu.id,
        isAllowed: !!isMenuChecked, // Explicit true/false
      };

      return [parentAccess, ...(childAccess || [])];
    });

    const payload = {
      userTypeId: Number(userTypeId),
      menuAccess: menuAccess,
    };

    updateUserAccessV2Service(payload)
      .then((response) => {
        if (response.statusCode === 200) {
          toast.success(response.message);

          setCheckedItems({});
          setUserTypeId("");
        } else {
          toast.error(response.message || "Failed to update access");
        }
      })
      .catch((error) => {
        console.error("Error updating access", error);
        toast.error("An error occurred. Please try again later.");
      });
  };

  return (
    <form className="needs-validation custom-input" noValidate>
      <Row className="mb-4">
        <Col xs={12} className="text-center">
          <FormGroup>
            <Input
              type="select"
              name="userType"
              id="userType"
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                fontSize: "16px",
                width: "100%",
              }}
              onChange={(e) => {
                const selectedValue = e.target.value;
                if (selectedValue === "createNew") {
                  toggleCreateUserModal(); // Open the modal
                  setUserTypeId(""); // Reset the userTypeId
                } else {
                  setUserTypeId(selectedValue); 
                }
              }}
              value={userTypeId}
            >
              <option value="">Select User Type</option>
              {userTypes?.map((userType) => (
                <option key={userType.id} value={userType.id}>
                  {userType.userTypeName}
                </option>
              ))}
              <option
                value="createNew"
                style={{ color: "#0096FF", gap: "15px" }}
              >
                <span className="me-2">+</span>
                <strong>Add New UserType</strong>
              </option>
            </Input>
          </FormGroup>
        </Col>
      </Row>

      {data?.data &&
        data?.data.map((menus) => (
          <Row key={menus.id} className="mb-4">
            <Col xs={12}>
              <FormGroup>
                <Label
                  style={{
                    display: "block",
                    fontSize: "17px",
                    fontWeight: "550",
                    marginBottom: "10px",
                    color: "#2c3e50",
                  }}
                >
                  <Input
                    type="checkbox"
                    name={`menu_${menus.id}`}
                    id={`menu_${menus.id}`}
                    checked={checkedItems[`menu_${menus.id}`] || false}
                    onChange={() =>
                      handleParentChange(
                        menus.id,
                        menus.getAllMenusChild?.map((child) => child.id) || []
                      )
                    }
                    style={{ marginRight: "10px" }}
                  />
                  {menus.moduleName}
                </Label>

                <Row>
                  {menus.getAllMenusChild?.map((child) => (
                    <Col key={child.id} xs={5} sm={4} md={3}>
                      <FormGroup check>
                        <Label
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "16px",
                            fontWeight: "400",
                            marginBottom: "5px",
                          }}
                        >
                          <input
                            type="checkbox"
                            name={`child_${child.id}`}
                            id={`child_${child.id}`}
                            checked={checkedItems[`child_${child.id}`] || false}
                            onChange={() =>
                              handleChildChange(child.id, menus.id)
                            }
                            style={{ accentColor: "#f1c40f" }}
                          />
                          {child.moduleName}
                        </Label>
                      </FormGroup>
                    </Col>
                  ))}
                </Row>
              </FormGroup>
            </Col>
          </Row>
        ))}

      <Row>
        <Col xs={12} className="text-center">
          <Button color="primary" onClick={handleAllowAccess}>
            Allow Access
          </Button>
        </Col>
      </Row>

      <CreateUserTypeModal
        isOpen={isCreateUserModalOpen}
        toggle={toggleCreateUserModal}
      />
    </form>
  );
};

export default UserAccessForm;
