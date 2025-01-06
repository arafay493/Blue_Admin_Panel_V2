import React from 'react'
import Breadcrumbs from '../../../../CommonElements/Breadcrumbs'
import { Container, Row } from 'reactstrap'
import DefaultBreadcrumb from '../../../components/Bonus-Ui/BreadCrumb/DefaultBreadcrumb'
import DividerBread from '../../../components/Bonus-Ui/BreadCrumb/DividerBread'
import Withicon from '../../../components/Bonus-Ui/BreadCrumb/Withicon'
import Variation from '../../../components/Bonus-Ui/BreadCrumb/Variation'
import ColoredBread from '../../../components/Bonus-Ui/BreadCrumb/ColoredBread'

const Breadcrumb = () => {
    return (
        <div className='page-body'>
            <Breadcrumbs title='Breadcrumb' mainTitle='Breadcrumb' parent='Bonus Ui ' />
            <Container fluid={true}>
                <Row>
                    <DefaultBreadcrumb />
                    <DividerBread />
                    <Withicon />
                    <Variation />
                    <ColoredBread />
                </Row>
            </Container>
        </div>
    )
}

export default Breadcrumb
