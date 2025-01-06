import AutoPlay from '@/components/Bonus-Ui/OwlCarousel/AutoPlay'
import CrossFade from '@/components/Bonus-Ui/OwlCarousel/CrossFade'
import DarkVariant from '@/components/Bonus-Ui/OwlCarousel/DarkVariant'
import DisableTouch from '@/components/Bonus-Ui/OwlCarousel/DisableTouch'
import Indecator from '@/components/Bonus-Ui/OwlCarousel/Indecator'
import IndividualCarousel from '@/components/Bonus-Ui/OwlCarousel/IndividualCarousel'
import Mouseover from '@/components/Bonus-Ui/OwlCarousel/MouseOver'
import SlideOnly from '@/components/Bonus-Ui/OwlCarousel/SlideOnly'
import WithCaption from '@/components/Bonus-Ui/OwlCarousel/WithCaption'
import WithControll from '@/components/Bonus-Ui/OwlCarousel/WithControll'
import Breadcrumbs from 'CommonElements/Breadcrumbs'
import React from 'react'
import { Container, Row } from 'reactstrap'

const OwlCarousel = () => {
    return (
        <div className='page-body'>
            <Breadcrumbs title='Owl Carousel' mainTitle='Owl Carousel' parent='Bonus Ui' />
            <Container fluid={true}>
                <Row>
                    <SlideOnly />
                    <WithControll />
                    <AutoPlay />
                    <Mouseover />
                    <Indecator />
                    <WithCaption />
                    <CrossFade />
                    <IndividualCarousel />
                    <DisableTouch />
                    <DarkVariant />
                </Row>
            </Container>
        </div>
    )
}

export default OwlCarousel