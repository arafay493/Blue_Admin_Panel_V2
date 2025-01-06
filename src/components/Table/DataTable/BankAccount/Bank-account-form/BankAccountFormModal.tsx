// @ts-nocheck
import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";
import { toast } from "react-toastify";
import { PostOpenAccount } from "@/redux/services/cashManagementService";

interface BankAccountFormModalProps {
  isOpen: boolean;
  toggle: () => void;
  onSubmit: (formState: Record<string, string>) => void;
}

const BankAccountFormModal: React.FC<BankAccountFormModalProps> = ({
  isOpen,
  toggle,
  onSubmit,
}) => {
  const [formState, setFormState] = useState({
    accountName: "",
    accountType: "",
    glCode: "",
    bankChargesAccount: "",
    bankName: "",
    accountNumber: "",
    ibanNumber: "",
    branchCode: "",
    bankAddress: "",
  });

  const [errors, setErrors] = useState({
    accountName: false,
    accountType: false,
    glCode: false,
    bankChargesAccount: false,
    bankName: false,
    accountNumber: false,
    ibanNumber: false,
    branchCode: false,
    bankAddress: false,
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddAccount = () => {
    const newErrors = {
      accountName: !formState.accountName.trim(),
      accountType: !formState.accountType.trim(),
      glCode: !formState.glCode.trim(),
      bankChargesAccount: !formState.bankChargesAccount.trim(),
      bankName: !formState.bankName.trim(),
      accountNumber: !formState.accountNumber.trim(),
      ibanNumber: !formState.ibanNumber.trim(),
      branchCode: !formState.branchCode.trim(),
      bankAddress: !formState.bankAddress.trim(),
    };

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error);

    if (hasErrors) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    const sanitizedPayload = {
      accountName: formState.accountName.trim(),
      accountType: formState.accountType.trim(),
      glCode: formState.glCode.trim(),
      bankChargesAccount: formState.bankChargesAccount.trim(),
      bankName: formState.bankName.trim(),
      accountNumber: formState.accountNumber.trim(),
      ibanNumber: formState.ibanNumber.trim(),
      branchCode: formState.branchCode.trim(),
      bankAddress: formState.bankAddress.trim(),
    };

    PostOpenAccount(sanitizedPayload)
      .then((response) => {
        if (response.statusCode === 200) {
          toast.success(response.message);
          dispatch(fetchAllAccounts());
          setFormState({
            accountName: "",
            accountType: "",
            glCode: "",
            bankChargesAccount: "",
            bankName: "",
            accountNumber: "",
            ibanNumber: "",
            branchCode: "",
            bankAddress: "",
          });
        } else {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        console.error("Error adding account:", error.message);
        toast.error("Failed to add account. Please check your input.");
      });
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Add Bank Account</ModalHeader>
      <ModalBody>
        <Form>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="accountName">Bank Account Name</Label>
                <Input
                  type="text"
                  name="accountName"
                  value={formState.accountName}
                  onChange={handleFormChange}
                  className={errors.accountName ? "is-invalid" : ""}
                />
                {errors.accountName && (
                  <div className="invalid-feedback">
                    Please enter Bank Account Name
                  </div>
                )}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="accountType">Account Type</Label>
                <Input
                  type="select"
                  name="accountType"
                  value={formState.accountType}
                  onChange={handleFormChange}
                  className={errors.accountType ? "is-invalid" : ""}
                >
                  <option value="">Select Account Type</option>
                  <option value="SecurityDeposit">Security Deposit</option>
                  <option value="Other">Other</option>
                </Input>
                {errors.accountType && (
                  <div className="invalid-feedback">
                    Please select account type
                  </div>
                )}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="glCode">GL Code</Label>
                <Input
                  type="text"
                  name="glCode"
                  value={formState.glCode}
                  onChange={handleFormChange}
                  className={errors.glCode ? "is-invalid" : ""}
                />
                {errors.glCode && (
                  <div className="invalid-feedback">Please enter GL Code</div>
                )}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="bankChargesAccount">Bank Charges Account</Label>
                <Input
                  type="text"
                  name="bankChargesAccount"
                  value={formState.bankChargesAccount}
                  onChange={handleFormChange}
                  className={errors.bankChargesAccount ? "is-invalid" : ""}
                />
                {errors.bankChargesAccount && (
                  <div className="invalid-feedback">
                    Please enter bank Charges
                  </div>
                )}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="bankName">Bank Name</Label>
                <Input
                  type="text"
                  name="bankName"
                  value={formState.bankName}
                  onChange={handleFormChange}
                  className={errors.bankName ? "is-invalid" : ""}
                />
                {errors.bankName && (
                  <div className="invalid-feedback">Please enter Bank Name</div>
                )}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="accountNumber">Account Number</Label>
                <Input
                  type="text"
                  name="accountNumber"
                  value={formState.accountNumber}
                  onChange={handleFormChange}
                  className={errors.accountNumber ? "is-invalid" : ""}
                />
                {errors.accountNumber && (
                  <div className="invalid-feedback">
                    Please enter Account Number
                  </div>
                )}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="ibanNumber">IBAN Number</Label>
                <Input
                  type="text"
                  name="ibanNumber"
                  value={formState.ibanNumber}
                  onChange={handleFormChange}
                  className={errors.ibanNumber ? "is-invalid" : ""}
                />
                {errors.ibanNumber && (
                  <div className="invalid-feedback">
                    Please enter IBAN Number
                  </div>
                )}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="branchCode">Branch Code</Label>
                <Input
                  type="text"
                  name="branchCode"
                  value={formState.branchCode}
                  onChange={handleFormChange}
                  className={errors.branchCode ? "is-invalid" : ""}
                />
                {errors.branchCode && (
                  <div className="invalid-feedback">
                    Please enter Branch Code
                  </div>
                )}
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <Label for="bankAddress">Bank Address</Label>
                <Input
                  type="textarea"
                  name="bankAddress"
                  value={formState.bankAddress}
                  onChange={handleFormChange}
                  className={errors.bankAddress ? "is-invalid" : ""}
                />
                {errors.bankAddress && (
                  <div className="invalid-feedback">
                    Please enter Bank Address
                  </div>
                )}
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </ModalBody>

      <ModalFooter>
        <Col className="text-center">
          <Button color="primary" onClick={handleAddAccount}>
            Submit
          </Button>
        </Col>
      </ModalFooter>
    </Modal>
  );
};

export default BankAccountFormModal;
