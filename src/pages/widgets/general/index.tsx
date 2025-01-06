import CalenderCard from '@/components/widgets/general/CalenderCard';
import CourseBox from '@/components/widgets/general/CourseBox';
import TotalUserAndFollower from '@/components/widgets/general/TotalUserAndFollower';
import YourBalanceCard from '@/components/widgets/general/YourBalanceCard';
import Breadcrumbs from 'CommonElements/Breadcrumbs'
import dynamic from 'next/dynamic';
import { Container, Row } from 'reactstrap'

const General = () => {
   const CurrenciesWidget = dynamic(() => import('@/components/widgets/general/CurrenciesWidget'), { ssr: false });
   const RadialProgress = dynamic(() => import('@/components/widgets/general/RadialProgress'), { ssr: false });
   const SalesReport = dynamic(() => import('@/components/widgets/general/SalesReport'), { ssr: false });
   const SmallWidgets = dynamic(() => import('@/components/widgets/general/SmallWidgets'), { ssr: false });
   const SocialWidgets = dynamic(() => import('@/components/widgets/general/SocialWidgets'), { ssr: false });
   const VisitorsCard = dynamic(() => import('@/components/widgets/VisitorsCard'), { ssr: false });

    return (
        <div className='page-body'>
            <Breadcrumbs title='General' mainTitle='General' parent='Widgets' />
            <Container fluid={true}>
                <Row>
                    <CurrenciesWidget/>
                    <RadialProgress/>
                    <SalesReport/>
                    <CourseBox/>
                    <TotalUserAndFollower/>
                    <VisitorsCard/>
                    <SocialWidgets/>
                    <SmallWidgets/>
                    <YourBalanceCard/>
                    <CalenderCard />    
                </Row>
            </Container>
        </div>
    )
}

export default General