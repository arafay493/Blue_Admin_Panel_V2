import BasicTimeLine from '@/components/Bonus-Ui/TimeLine/BasicTimeline'
import HowizontalTimeline from '@/components/Bonus-Ui/TimeLine/HorizontalTimeline'
import HoverTimeline from '@/components/Bonus-Ui/TimeLine/HoverTimeline'
import TimeLineMain from '@/components/Bonus-Ui/TimeLine/TimeLineMain'
import VariationTimeline from '@/components/Bonus-Ui/TimeLine/VariationTimeline'
import Breadcrumbs from 'CommonElements/Breadcrumbs'
import React from 'react'
import { Container, Row } from 'reactstrap'

const TimeLine = () => {
    return (
        <div className='page-body'>
            <Breadcrumbs title='Timeline' mainTitle='Timeline' parent='Bonus Ui' />
            <Container fluid={true}>
                <Row>
                    <BasicTimeLine />
                    <HoverTimeline />
                    <VariationTimeline />
                    <HowizontalTimeline />
                    <TimeLineMain />
                </Row>
            </Container>
        </div>
    )
}

export default TimeLine