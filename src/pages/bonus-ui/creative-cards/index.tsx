import React from 'react'
import Breadcrumbs from '../../../../CommonElements/Breadcrumbs'
import { Container, Row } from 'reactstrap'
import Borderleft from '@/components/Bonus-Ui/CreativeCard/BorderLeft'
import BorderRight from '@/components/Bonus-Ui/CreativeCard/BorderRight'
import BorderTop from '@/components/Bonus-Ui/CreativeCard/BorderTop'
import BorderBottom from '@/components/Bonus-Ui/CreativeCard/BorderBottom'
import BorderPrimary from '@/components/Bonus-Ui/CreativeCard/BorderPrimary'
import BorderWarning from '@/components/Bonus-Ui/CreativeCard/BorderWarning'
import BorderSecondaru from '@/components/Bonus-Ui/CreativeCard/BorderSecondary'
import AbsolutePrimary from '@/components/Bonus-Ui/CreativeCard/AbsolutePrimary'
import AbsoluteSecondary from '@/components/Bonus-Ui/CreativeCard/AbsoluteSecondary'

const CreativeCards = () => {
    return (
        <div className='page-body'>
            <Breadcrumbs title='Creative Card' mainTitle='Creative Card' parent='bonus Ui' />
            <Container fluid={true}>
                <Row>
                    <Borderleft />
                    <BorderRight />
                    <BorderTop />
                    <BorderBottom />
                    <BorderPrimary />
                    <BorderWarning />
                    <BorderSecondaru />
                    <AbsolutePrimary />
                    <AbsoluteSecondary />
                </Row>
            </Container>
        </div>
    )
}

export default CreativeCards