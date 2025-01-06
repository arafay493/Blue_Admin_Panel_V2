import React from 'react'
import Breadcrumbs from '../../../../CommonElements/Breadcrumbs'
import { Container, Row } from 'reactstrap'
import BarRating from '@/components/Bonus-Ui/Rating/BarRating'
import MovingRating from '@/components/Bonus-Ui/Rating/MovingRating'
import HeartRating from '@/components/Bonus-Ui/Rating/HeartRating'
import SquareRating from '@/components/Bonus-Ui/Rating/SquareRating'
import PillRating from '@/components/Bonus-Ui/Rating/PillRating'
import StarRating from '@/components/Bonus-Ui/Rating/StarRating'
import HalfStarRating from '@/components/Bonus-Ui/Rating/HalfStarRating'
import ThumbUpDown from '@/components/Bonus-Ui/Rating/ThumbUpDown'
import ReverseRating from '@/components/Bonus-Ui/Rating/ReverseRating'

const Rating = () => {
    return (
        <div className='page-body'>
            <Breadcrumbs title='Rating' mainTitle='Rating' parent='Bonus Ui' />
            <Container fluid={true}>
                <Row>
                    <BarRating />
                    <MovingRating />
                    <SquareRating />
                    <PillRating />
                    <ReverseRating />
                    <StarRating />
                    <HalfStarRating />
                    <ThumbUpDown />
                    <HeartRating />
                </Row>
            </Container>
        </div>
    )
}

export default Rating