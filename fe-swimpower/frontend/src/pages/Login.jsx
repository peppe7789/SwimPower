import { Col, Container, Row } from "react-bootstrap"
import NavAndFooter from "../components/NavAndFooter/NavAndFooter"
import { useState } from "react"
import LoginForm from "../components/Main/LoginForm/LoginForm"


const Login = () => {
    const [isOverlayActive, setOverlayActive] = useState(true)
    const handleForm = () => setOverlayActive(false)



    return (
        <NavAndFooter>
            {isOverlayActive && <div className="overlay"></div>}
            <Container className=" vh-100">
                <Row
                    className="mt-5 h-75 custom-main"
                >
                    <Col
                        className="d-flex justify-content-center align-items-center"
                    >
                        <LoginForm
                            onclose={handleForm}
                        />
                    </Col>
                </Row>
            </Container>
        </NavAndFooter>

    )
}

export default Login