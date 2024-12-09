import { Col } from 'react-bootstrap'
import './TextFooter.css'


const TextFooter = () => {

    return (
        <Col
        className=' text-size d-flex flex-column align-items-center flex-md-row justify-content-md-center gap-md-5'
        >
            <div
            className=' d-flex flex-column align-items-center '
            >
                <p>
                   SWIMPOWER 2024
                </p>
                <p>
                    ALL RIGHT RESERVED
                </p>
                <p>
                    COOKIES & PRIVACY POLICY
                </p>
            </div>
            <div
            className=' d-flex flex-column align-items-center '
            >
                <p>
                   SWIMPOWER SOCIETA SPORTIVA
                </p>
                <p>
                    VIA DANTE ALIGHERI, 28 - 90011 - BAGHERIA - PA
                </p>
                <p>
                    CF 727289199191991
                </p>
            </div>

        </Col>
    )
}

export default TextFooter