import ClipboardOnParagraph from "@/components/Forms/Widget/Clipboard/ClipboardOnParagraph";
import ClipboardOnTextArea from "@/components/Forms/Widget/Clipboard/ClipboardOnTextArea";
import ClipboardOnTextInput from "@/components/Forms/Widget/Clipboard/ClipboardOnTextInput";
import CopyPortionFromParagraph from "@/components/Forms/Widget/Clipboard/CopyPortionFromParagraph";
import Breadcrumbs from "CommonElements/Breadcrumbs";
import { Container, Row } from "reactstrap";
import { ClipBoardHeading,  ClipBoards,  FormWidgetsHeading } from "utils/Constant";

const ClipBoard = () => {
  return (
    <div className="page-body">
      <Breadcrumbs
        mainTitle={ClipBoardHeading}
        parent={FormWidgetsHeading}
        title={ClipBoards}
      />
      <Container fluid={true}>
        <Row>
          <ClipboardOnTextInput/>
          <ClipboardOnTextArea/>
          <ClipboardOnParagraph/>
          <CopyPortionFromParagraph/>
        </Row>
      </Container>
    </div>
  );
};

export default ClipBoard;
