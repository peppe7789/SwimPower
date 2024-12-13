import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from "react-bootstrap";
import NavLogo from "../MyNavbar/NavLogo/NavLogo"
import NavMenu from './NavMenu/NavMenu';
import NavAvatar from './NavAvatar/NavAvatar';
import "./MyNav.css"


const MyNav = () => {


    return (
        <nav
        className='custokm-position-nav'
        >
            <Container fluid >
                <Row
                    className=' shadow rounded-3'
                >
                    <Col
                        className=' d-flex align-items-center justify-content-between gap-1 '
                    >
                        <div
                        className='d-flex align-items-center gap-1'
                        >
                            <NavMenu />
                            <NavLogo />
                        </div>

                        <NavAvatar />


                    </Col>
                </Row>
            </Container>
        </nav>



    )
}

export default MyNav