import React from 'react'
import Breadcrumbs from 'CommonElements/Breadcrumbs'
import { Container, Row } from 'reactstrap'
import Headings from '@/components/Ui-kits/Typography/Headings'
import ColoredHead from '@/components/Ui-kits/Typography/ColoredHead'
import FontWeight from '@/components/Ui-kits/Typography/FontWeight'
import Listing from '@/components/Ui-kits/Typography/Listing'
import DisplayHeading from '@/components/Ui-kits/Typography/DisplayHeading'
import InlineText from '@/components/Ui-kits/Typography/InlineText'
import TextColor from '@/components/Ui-kits/Typography/TextColor'
import Blockquotes from '@/components/Ui-kits/Typography/Blockquotes'

const Typography = () => {
    return (
        <div className='page-body'>
            <Breadcrumbs mainTitle="Typography" parent="Ui Kits" title="Typography" />
            <Container fluid={true}>
                <Row>
                    <Headings />
                    <ColoredHead />
                    <FontWeight />
                    <Listing />
                    <DisplayHeading />
                    <InlineText />
                    <TextColor />
                    <Blockquotes />
                </Row>
            </Container>
        </div>
    )
}

export default Typography