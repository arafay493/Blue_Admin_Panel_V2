import BorderTabs from '@/components/Ui-kits/Tabs/BorderTabs'
import IconTabs from '@/components/Ui-kits/Tabs/IconTabs'
import JustifyTab from '@/components/Ui-kits/Tabs/JustifyTab'
import LeftStyleTab from '@/components/Ui-kits/Tabs/LeftStyleTab'
import MaterialStyle from '@/components/Ui-kits/Tabs/MaterialStyle'
import PillsTab from '@/components/Ui-kits/Tabs/PillsTab'
import SimpleTab from '@/components/Ui-kits/Tabs/SimpleTab'
import VerticalTab from '@/components/Ui-kits/Tabs/VerticalTab'
import Breadcrumbs from 'CommonElements/Breadcrumbs'
import React from 'react'
import { Container, Row } from 'reactstrap'

const Tabs = () => {
    return (
        <div className='page-body'>
            <Breadcrumbs title='Bootstrap Tabs' mainTitle='Bootstrap Tabs' parent='Tabs' />
            <Container fluid={true}>
                <Row>
                    <SimpleTab />
                    <IconTabs />
                    <VerticalTab />
                    <PillsTab />
                    <JustifyTab />
                    <LeftStyleTab />
                    <MaterialStyle />
                    <BorderTabs />
                </Row>
            </Container>
        </div>
    )
}

export default Tabs