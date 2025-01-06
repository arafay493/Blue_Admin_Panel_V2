import LearningListContainer from "@/components/Miscellaneous/Learning/LearningList";
import Breadcrumbs from "../../../../../CommonElements/Breadcrumbs/index";
import { Learning, LearningListHeading } from "utils/Constant";

const learningList = () => {
  return (
    <div className="page-body">
      <Breadcrumbs title={LearningListHeading} mainTitle={LearningListHeading} parent={Learning}/>
      <LearningListContainer />
    </div>
  );
};

export default learningList;
