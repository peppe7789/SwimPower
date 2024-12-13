import { Col } from "react-bootstrap"
import "./CardEvent.css"
import ButtonModifyPost from "../../ButtonModifyPost/ButtonModifyPost"
import { useDispatch, useSelector } from "react-redux";
import { authenticatedUser } from "../../../../reducer/UsersSlice";
import ButtonDeletePost from "../../ButtonDeletePost/ButtonDeletePost";


const CardEvent = ({ title, subtitle, paragraph, img, setOpenModal, openModal }) => {


    const dispatch = useDispatch()
    const user = useSelector(authenticatedUser)
    
   

    return (
        <>
            {
                user?.role !== "admin" &&

                (
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

            {
                user?.role === "admin" &&
                (
                    <Col
                        sm={12}
                        className=" d-flex  justify-content-center m-0   "
                    >
                        <div
                            className=" d-flex gap-4 bg3 body-post-event rounded-3 flex-column flex-md-row justify-content-md-around px-md-2"
                        >
                            <Col
                                sm
                                md={4}
                                className="body-img-event"
                            >
                                <img src={img} alt="Image event" className=" img-post-event rounded-5" />
                            </Col>
                            <Col
                                sm
                                md={6}
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
                            
                            <Col
                                sm
                                md={1}
                                className=" d-flex justify-content-center align-items-center gap-3 flex-md-column  bg1 align "
                            >
                                <ButtonModifyPost
                                    // onClick={handleModalPost}
                                />
                                <ButtonDeletePost />
                            </Col>
                        </div>
                    </Col>
                )
            }
        </>

    )
}

export default CardEvent