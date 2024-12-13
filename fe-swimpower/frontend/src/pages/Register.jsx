import { Col, Container, Row } from "react-bootstrap"
import RegisterForm from "../components/Main/RegisterForm/RegisterForm"
import NavAndFooter from "../components/NavAndFooter/NavAndFooter"
import { useState } from "react"


const Register = () => {
    const [isOverlayActive, setOverlayActive] = useState(true)
    const handleForm = () => setOverlayActive(false)

    return (
        <NavAndFooter>
            {isOverlayActive && <div className="overlay"></div>}
            <Container className=" vh-100 ">
                <Row
                    className="mt-5 h-75"
                >
                    <Col
                        className="d-flex justify-content-center align-items-center "
                    >
                        <RegisterForm
                            onclose={handleForm}
                        />
                    </Col>
                </Row>
            </Container>
        </NavAndFooter>
    )
}

export default Register