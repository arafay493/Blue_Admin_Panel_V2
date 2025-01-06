import { JobListHeading, JobSearch } from 'utils/Constant';
import Breadcrumbs from '../../../../../CommonElements/Breadcrumbs/index';
import JobListViewContainer from "@/components/Miscellaneous/jobSearch/ListView";

const JobList = () => {
    return (
        <div className='page-body'>
            <Breadcrumbs title={JobListHeading} mainTitle={JobListHeading} parent={JobSearch} />
            <JobListViewContainer/>
        </div>
    )
}

export default JobList