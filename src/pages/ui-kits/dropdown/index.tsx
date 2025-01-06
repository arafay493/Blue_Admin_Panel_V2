import BasicDropdown from '@/components/Ui-kits/Dropdown/BasicDropdown'
import RoundedDropdown from '@/components/Ui-kits/Dropdown/RoundedDropdown'
import SplitDropdown from '@/components/Ui-kits/Dropdown/SplitDropdown';
import HeadingDropdown from '@/components/Ui-kits/Dropdown/HeadingDropdown';
import Breadcrumbs from 'CommonElements/Breadcrumbs'
import React from 'react'
import { Container, Row } from 'reactstrap'
import DropdownwithInput from '@/components/Ui-kits/Dropdown/DropdownwithInput';
import DarkDropdown from '@/components/Ui-kits/Dropdown/DarkDropDown';
import UniqeDropdown from '@/components/Ui-kits/Dropdown/UniqeDropdown';
import JustifyContent from '@/components/Ui-kits/Dropdown/JustifyContent';
import Alignment from '@/components/Ui-kits/Dropdown/Alignment';
import HelperCard from '@/components/Ui-kits/Dropdown/HelperCard';
import DividerDropdown from '@/components/Ui-kits/Dropdown/DividerDropdown';
import DropdownSize from '@/components/Ui-kits/Dropdown/DropdownSize';

const Dropdown = () => {
    return (
        <div className='page-body'>
            <Breadcrumbs title='Dropdown' mainTitle='Dropdown' parent='Ui Kits' />
            <Container fluid={true}>
                <Row>
                    <BasicDropdown />
                    <RoundedDropdown />
                    <SplitDropdown />
                    <HeadingDropdown />
                    <DropdownwithInput />
                    <DarkDropdown />
                    <UniqeDropdown />
                    <JustifyContent />
                    <Alignment />
                    <HelperCard />
                    <DividerDropdown />
                    <DropdownSize />
                </Row>
            </Container>
        </div>
    )
}

export default Dropdown