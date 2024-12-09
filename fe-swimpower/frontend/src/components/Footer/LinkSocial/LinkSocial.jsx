import { Col } from 'react-bootstrap'
import { FaFacebook, FaInstagram, FaSquareTwitter, FaTiktok } from "react-icons/fa6";
import './LinkSocial.css'
import { LINK_FACEBOOK_URL, LINK_INSTAGRAM_URL, LINK_TIKTOK_URL, LINK_TWITTER_URL } from '../../../costants/linkSocial';


const LinkSocial = () => {


    return (
        <Col
            className=' d-flex justify-content-center align-items-top pt-2 pt-md-4 gap-4 custom-link '
        >

            <a href={LINK_FACEBOOK_URL}>
                <FaFacebook
                    size={40}
                />
            </a>
            <a href={LINK_INSTAGRAM_URL}>
                <FaInstagram
                    size={40}
                />
            </a>
            <a href={LINK_TWITTER_URL}>
                <FaSquareTwitter
                    size={40}
                />
            </a>
            <a href={LINK_TIKTOK_URL}>
                <FaTiktok
                    size={40}
                />
            </a>

        </Col>
    )
}

export default LinkSocial