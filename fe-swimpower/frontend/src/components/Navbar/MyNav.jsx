import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from "react-bootstrap";
import NavLogo from "../Navbar/NavLogo/NavLogo"


const MyNav = () => {


    return (
        <nav>
            <Container fluid >
                <Row
                className=' bg1  '
                >
                    <Col>
                        <NavLogo/>
                       

                    </Col>
                </Row>
            </Container>
        </nav>



    )
}

export default MyNav