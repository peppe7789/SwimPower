import { Card, CardBody, CardImg, CardTitle, Col } from "react-bootstrap"
import "./CardEvent.css"
const CardEvent = ({ title, subtitle, paragraph, img }) => {


    return (
        <Col
            sm={12}
            className=" d-flex  justify-content-center m-0   "
        >
            <div
            className=" d-flex gap-4 bg3 body-post-event rounded-3 flex-column flex-md-row"
            >
                <Col
                    sm
                    md={4}
                className="body-img-event"
                >
                    <img src={img} alt="Image event" className=" p-3 img-post-event rounded-5" />
                </Col>
                <Col
                    sm
                    md={8}
                 className="body-card-event p-3"
                >
                    <h3
                        className=" text-truncate"
                    >
                        {title}
                    </h3>
                    <h5>
                        {subtitle}
                    </h5>
                    <p>
                        {paragraph}
                    </p>
                </Col>
            </div>
        </Col>
    )
}

export default CardEvent