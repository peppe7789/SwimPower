import { Col } from 'react-bootstrap'
import { FaFacebook, FaInstagram, FaSquareTwitter, FaTiktok } from "react-icons/fa6";
import './LinkSocial.css'


const LinkSocial = () => {


    return (
        <Col
            className=' d-flex justify-content-center align-items-top pt-4 gap-4 custom-link '
        >

            <a href="/">
                <FaFacebook
                    size={40}
                />
            </a>
            <a href="/">
                <FaInstagram
                    size={40}
                />
            </a>
            <a href="/">
                <FaSquareTwitter
                    size={40}
                />
            </a>
            <a href="/">
                <FaTiktok
                    size={40}
                />
            </a>

        </Col>
    )
}

export default LinkSocial