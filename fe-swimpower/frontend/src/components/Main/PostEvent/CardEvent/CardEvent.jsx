import { Col } from "react-bootstrap"
import "./CardEvent.css"
import ButtonModifyPost from "../../ButtonModifyPost/ButtonModifyPost"
import { useDispatch, useSelector } from "react-redux";
import { authenticatedUser } from "../../../../reducer/UsersSlice";
import ButtonDeletePost from "../../ButtonDeletePost/ButtonDeletePost";
import { useState } from "react";
import FormUploadPostEvent from "../FormUploadPostEvent/FormUploadPostEvent";




const CardEvent = ({ title, subtitle, paragraph, img, post, handleDeletePost }) => {

    const dispatch = useDispatch()
    const user = useSelector(authenticatedUser)
    const [openModal, setOpenModal] = useState(false)
    
    const handleModifyPost = () => setOpenModal(true)


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
                            className=" d-flex gap-4 bg3 body-post-event rounded-3 flex-column flex-md-row p-3"
                        >
                            <Col
                                sm
                                md={4}
                                className="body-img-event"
                            >
                                <div
                                    className="img-post-event"
                                >
                                    <img src={img} alt="Image event" className=" h-100 w-100 p-3 " />
                                </div>
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
                                md={6}
                                className="body-img-event"
                            >
                                <img src={img} alt="Image event" className="h-100 w-100 p-3 rounded-5  " />
                            </Col>
                            <Col
                                sm
                                md={4}
                                className="body-card-event p-3 d-flex flex-column gap-3  "
                            >
                                <h3
                                    
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
                                sm={12}
                                md={1}
                                className=" d-flex justify-content-center align-items-center gap-3 flex-md-column p-3 p-md-5 bg1 align "
                            >
                                <ButtonModifyPost
                                    onClick={handleModifyPost}
                                />
                                <ButtonDeletePost
                                    onClick={() => handleDeletePost(post._id)}
                                />
                            </Col>
                        </div>
                    </Col>
                )
            }
            {
                openModal && (
                    <FormUploadPostEvent
                        postToUpdate={post}
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                    />
                )
}
        </>

    )
}

export default CardEvent