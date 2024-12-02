import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from "react-bootstrap";
import NavLogo from "../Navbar/NavLogo/NavLogo"
import NavMenu from './NavMenu/NavMenu';
import NavAvatar from './NavAvatar/NavAvatar';


const MyNav = () => {


    return (
        <nav>
            <Container fluid >
                <Row
                    className=' bg1  '
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