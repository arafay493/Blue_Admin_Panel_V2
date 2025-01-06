import React from 'react'
import Breadcrumbs from '../../../../CommonElements/Breadcrumbs'
import { Container, Row } from 'reactstrap'
import BasicAlert from '@/components/Bonus-Ui/SweetAlert/BasicAlert'
import TitleWithText from '@/components/Bonus-Ui/SweetAlert/TitleWithText'
import InfoAlert from '@/components/Bonus-Ui/SweetAlert/InfoAlert'
import WarningAlert from '@/components/Bonus-Ui/SweetAlert/WarningAlert'
import PikashuAlert from '@/components/Bonus-Ui/SweetAlert/PikashuAlert'
import QuestionAlert from '@/components/Bonus-Ui/SweetAlert/QuestionAlert'
import UserNameAlert from '@/components/Bonus-Ui/SweetAlert/UserNameAlert'
import SuccessMessage from '@/components/Bonus-Ui/SweetAlert/SuccessMessage'
import DangerAlert from '@/components/Bonus-Ui/SweetAlert/DangerAlert'
import WarningMode from '@/components/Bonus-Ui/SweetAlert/WarningAlert/Warningmode'
import AutoCloseAlert from '@/components/Bonus-Ui/SweetAlert/AutoCloseAlert'
import MovieAlert from '@/components/Bonus-Ui/SweetAlert/MoviAlert'

const SweetAlert2 = () => {
    return (
        <div className='page-body'>
            <Breadcrumbs title='Sweet Alert' mainTitle='Sweet Alert' parent='Bonus-Ui' />
            <Container fluid={true}>
                <Row>
                    <BasicAlert />
                    <TitleWithText />
                    <InfoAlert />
                    <WarningAlert />
                    <PikashuAlert />
                    <QuestionAlert />
                    <UserNameAlert />
                    <SuccessMessage />
                    <DangerAlert />
                    <WarningMode />
                    <AutoCloseAlert />
                    <MovieAlert />
                </Row>
            </Container>
        </div>
    )
}

export default SweetAlert2