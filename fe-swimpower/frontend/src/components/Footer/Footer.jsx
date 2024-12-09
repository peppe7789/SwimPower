import { Container, Row } from 'react-bootstrap'
import LinkSocial from './LinkSocial/LinkSocial'
import './Footer.css'
import TextFooter from './TextFooter/TextFooter'



const Footer = () => {





    return (

        <Container fluid>
            <Row
            className='custom-size-footer rounded-3 mt-4 pb-3 shadow rounded-3 bg1 d-flex flex-column justify-content-center g-4 '
            >
                <LinkSocial /> 
                <TextFooter/>
            </Row>
        </Container>

    )
}

export default Footer