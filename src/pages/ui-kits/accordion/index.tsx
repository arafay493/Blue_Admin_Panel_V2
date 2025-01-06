import CollapesAccordion from '@/components/Ui-kits/Accordion/CollapesAccordion'
import FlushAccordion from '@/components/Ui-kits/Accordion/FlushAccordion'
import HorizontalAccordion from '@/components/Ui-kits/Accordion/HorizontalAccordion'
import IconAccordion from '@/components/Ui-kits/Accordion/IconAccordion'
import MultipleCollapes from '@/components/Ui-kits/Accordion/MultipleCollaps'
import OutlineAccordion from '@/components/Ui-kits/Accordion/OutlineAccordion'
import SimpleAccordion from '@/components/Ui-kits/Accordion/SimpleAccordion'
import Breadcrumbs from 'CommonElements/Breadcrumbs'
import React from 'react'
import { Container, Row } from 'reactstrap'

const Accordion = () => {
    return (
        <div className='page-body'>
            <Breadcrumbs title='Accordion' mainTitle='Accordion' parent='Ui Kits' />
            <Container fluid={true}>
                <Row>
                    <SimpleAccordion />
                    <FlushAccordion />
                    <MultipleCollapes />
                    <IconAccordion />
                    <OutlineAccordion />
                    <HorizontalAccordion />
                    <CollapesAccordion />
                </Row>
            </Container>
        </div>
    )
}

export default Accordion