import BadgesScroll from '@/components/Bonus-Ui/Scrollable/BadgesScroll'
import BothSideScroll from '@/components/Bonus-Ui/Scrollable/BothSideScroll'
import CustomScroll from '@/components/Bonus-Ui/Scrollable/CustomScroll'
import HorizontalScroll from '@/components/Bonus-Ui/Scrollable/HorizontalScroll'
import ProfileScroll from '@/components/Bonus-Ui/Scrollable/ProfileScroll'
import ScrollableContent from '@/components/Bonus-Ui/Scrollable/ScrollableContent'
import SmallSizeScroll from '@/components/Bonus-Ui/Scrollable/SmallSize'
import Breadcrumbs from 'CommonElements/Breadcrumbs'
import React from 'react'
import { Container, Row } from 'reactstrap'

const Scrollable = () => {
    return (
        <div className='page-body'>
            <Breadcrumbs title='Scrollable' mainTitle='Scrollable' parent='Bonus Ui' />
            <Container fluid={true}>
                <Row>
                    <CustomScroll />
                    <SmallSizeScroll />
                    <BadgesScroll />
                    <ProfileScroll />
                    <ScrollableContent />
                    <HorizontalScroll />
                    <BothSideScroll />
                </Row>
            </Container>
        </div>
    )
}

export default Scrollable