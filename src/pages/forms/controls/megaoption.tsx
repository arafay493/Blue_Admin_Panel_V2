import DefaultStyle from "@/components/Forms/Control/MegaOptions/DefaultStyle";
import HorizontalStyle from "@/components/Forms/Control/MegaOptions/HorizontalStyle";
import InlineStyle from "@/components/Forms/Control/MegaOptions/InlineStyle";
import OfferStyleBorder from "@/components/Forms/Control/MegaOptions/OfferStyleBorder";
import SolidBorderStyle from "@/components/Forms/Control/MegaOptions/SolidBorderStyle";
import VariationCheckBox from "@/components/Forms/Control/MegaOptions/VariationCheckBox";
import VariationRadio from "@/components/Forms/Control/MegaOptions/VariationRadio";
import VerticalStyle from "@/components/Forms/Control/MegaOptions/VerticalStyle";
import WithoutBordersStyle from "@/components/Forms/Control/MegaOptions/WithoutBordersStyle";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { Container, Row } from "reactstrap";
import {  FormControlsHeading, MegaOptionHeading } from "utils/Constant";

const MegaOption = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        mainTitle={MegaOptionHeading}
        parent={FormControlsHeading}
        title={MegaOptionHeading}
      />
      <Container fluid={true}>
        <Row>
        <VariationRadio/>
        <VariationCheckBox/>
        <DefaultStyle/>
        <WithoutBordersStyle/>
        <SolidBorderStyle/>
        <OfferStyleBorder/>
        <InlineStyle/>
        <VerticalStyle/>
        <HorizontalStyle/>

        </Row>
      </Container>
    </div>
  );
};

export default MegaOption;
