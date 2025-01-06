import AdditionalAlert from '@/components/Ui-kits/Alert/AdditionalAlert'
import AlertWithIcon from '@/components/Ui-kits/Alert/AlertWithIcon'
import DarkAlert from '@/components/Ui-kits/Alert/DarkAlert'
import DismissingLight from '@/components/Ui-kits/Alert/DismissingLight'
import LeftBorderAlert from '@/components/Ui-kits/Alert/LeftBorderAlert'
import LightColorAlert from '@/components/Ui-kits/Alert/LightColorAlert'
import LinkColor from '@/components/Ui-kits/Alert/LinkColor'
import LiveAlert from '@/components/Ui-kits/Alert/LiveAlert'
import OutlineAlert from '@/components/Ui-kits/Alert/OutlineAlert'
import Breadcrumbs from 'CommonElements/Breadcrumbs'
import React from 'react'
import { Container, Row } from 'reactstrap'

const Alert = () => {
    return (
        <div className='page-body'>
            <Breadcrumbs title='Alert' mainTitle='Alert' parent='Ui Kits' />
            <Container fluid={true}>
                <Row>
                    <LinkColor />
                    <LightColorAlert />
                    <OutlineAlert />
                    <AlertWithIcon />
                    <DarkAlert />
                    <DismissingLight />
                    <LiveAlert />
                    <LeftBorderAlert />
                    <AdditionalAlert />
                </Row>
            </Container>
        </div>
    )
}

export default Alert