import BasicFloatingInputControl from "@/components/Forms/Control/BaseInputs/BasicFloatingInputControl";
import BasicForm from "@/components/Forms/Control/BaseInputs/BasicForm";
import BasicHTMLInputControl from "@/components/Forms/Control/BaseInputs/BasicHTMLInputControl";
import EdgesInputStyle from "@/components/Forms/Control/BaseInputs/EdgesInputStyle";
import FileInput from "@/components/Forms/Control/BaseInputs/FileInput";
import FlatInputStyle from "@/components/Forms/Control/BaseInputs/FlatInputStyle";
import FloatingForm from "@/components/Forms/Control/BaseInputs/FloatingForm";
import FormControlSizing from "@/components/Forms/Control/BaseInputs/FormControlSizing";
import RaiseInputStyle from "@/components/Forms/Control/BaseInputs/RaiseInputStyle";
import SelectSizing from "@/components/Forms/Control/BaseInputs/SelectSizing";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { Container, Row } from "reactstrap";
import { BaseInputsHeading, FormControlsHeading } from "utils/Constant";

const FormValidation = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        mainTitle={BaseInputsHeading}
        parent={FormControlsHeading}
        title={BaseInputsHeading}
      />
      <Container fluid={true}>
        <Row>
          <BasicForm />
          <FloatingForm />
          <SelectSizing />
          <FormControlSizing />
          <FileInput />
          <FlatInputStyle/>
          <BasicHTMLInputControl/>
          <BasicFloatingInputControl/>
          <EdgesInputStyle/>
          <RaiseInputStyle/>
        </Row>
      </Container>
    </div>
  );
};

export default FormValidation;
