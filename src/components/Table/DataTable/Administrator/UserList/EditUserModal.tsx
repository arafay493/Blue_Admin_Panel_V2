import { useAppSelector } from "@/redux/hooks";
import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormGroup,
  Label,
} from "reactstrap";

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

interface EditUserModalProps {
  isOpen: boolean;
  toggle: () => void;
  selectedUser: User | null;
  saveChanges: (editedUser: User) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  toggle,
  selectedUser,
  saveChanges,
}) => {
  const [editedUser, setEditedUser] = useState<User | null>(selectedUser);

  useEffect(() => {
    setEditedUser(selectedUser);
  }, [selectedUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const { userTypeList } = useAppSelector((state) => state.userTypeList);
  const userType = userTypeList?.addUserTypeList;

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit User</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            value={editedUser?.name || ""}
            onChange={handleChange}
            placeholder="Enter name"
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="text"
            name="email"
            value={editedUser?.email || ""}
            onChange={handleChange}
            placeholder="Enter email"
            disabled
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            value={editedUser?.password || ""}
            onChange={handleChange}
            placeholder="Enter password"
            disabled
          />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone Number</Label>
          <Input
            type="text"
            name="phone"
            value={editedUser?.phone || ""}
            onChange={handleChange}
            placeholder="Enter phone number"
            disabled
          />
        </FormGroup>
        <FormGroup>
          <Label for="mobile">Mobile Number</Label>
          <Input
            type="text"
            name="mobile"
            value={editedUser?.mobile || ""}
            onChange={handleChange}
            placeholder="Enter mobile number"
            disabled
          />
        </FormGroup>
        <FormGroup>
          <Label for="mobile2">Second Mobile Number</Label>
          <Input
            type="text"
            name="mobile2"
            value={editedUser?.mobile2 || ""}
            onChange={handleChange}
            placeholder="Enter second mobile number"
            disabled
          />
        </FormGroup>
        <FormGroup>
          <Label for="userType">User Type</Label>
          <Input
            type="select"
            name="userType"
            value={editedUser?.userType || ""}
            onChange={handleChange}
          >
            <option value="">Select user type</option>
            {userType &&
              userType.map((type: any, index: number) => (
                <option key={index} value={type.value || type.name}>
                  {type.value || type.name}
                </option>
              ))}
          </Input>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={() => {
            if (editedUser) {
              saveChanges(editedUser);
            }
          }}
        >
          Save Changes
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditUserModal;
