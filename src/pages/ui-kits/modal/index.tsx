import BasicModal from '@/components/Ui-kits/Modal/BasicModal'
import CenteredModal from '@/components/Ui-kits/Modal/CenteredModal'
import CustomModals from '@/components/Ui-kits/Modal/CustomModals'
import FullscreenModal from '@/components/Ui-kits/Modal/FullscreenModal'
import SizeModal from '@/components/Ui-kits/Modal/SizeModal'
import StaticModal from '@/components/Ui-kits/Modal/StaticModal'
import ToggleModal from '@/components/Ui-kits/Modal/ToggleModal'
import Breadcrumbs from 'CommonElements/Breadcrumbs'
import React from 'react'
import { Col, Container, Row } from 'reactstrap'

const Modal = () => {
    return (
        <div className='page-body'>
            <Breadcrumbs title='Modal' mainTitle='Modal' parent='Ui Kits' />
            <Container fluid={true}>
                <Row>
                    <BasicModal />
                    <SizeModal />
                    <FullscreenModal />
                    <CenteredModal />
                    <ToggleModal />
                    <StaticModal />
                    <CustomModals />
                </Row>
            </Container>
        </div>
    )
}

export default Modal