import { Container, Row } from "react-bootstrap"
import CardEvent from "./CardEvent/CardEvent"
import { useDispatch, useSelector } from "react-redux";
import { allPostEvents, deletePostEvents, getPostEvents } from "../../../reducer/PostEventSlice";
import { useEffect } from "react";

import './PostEvent.css'
import ButtonCreatePost from "../ButtonCreatePost/ButtonCreatePost";
import { authenticatedUser } from "../../../reducer/UsersSlice";


const PostEvent = ({ setOpenModalCreateForm }) => {

    const dispatch = useDispatch()
    const postEvents = useSelector(allPostEvents)
    const user = useSelector(authenticatedUser)

    const handleDeletePost = (postId) => {
        dispatch(deletePostEvents(postId));
    }

    const handleModalCreateForm = () => {
        setOpenModalCreateForm((prevState) => !prevState);
    };

    useEffect(() => {
        dispatch(getPostEvents())
    }, [dispatch])



    return (

        <Container>
            <Row
                className=" py-4 d-flex gap-4 justify-content-center"
            >
                <h1
                    className=" bg1 custom-title rounded-3 d-flex align-items-center justify-content-around  "
                >
                    I NOSTRI EVENTI
                    {
                        user?.role === "admin" &&
                        <ButtonCreatePost
                            onClick={handleModalCreateForm}
                        />}
                </h1>

                {Array.isArray(postEvents) &&
                    postEvents.map((post) => (
                        <CardEvent
                            key={post._id}
                            title={post.title}
                            subtitle={post.subtitle}
                            paragraph={post.paragraph}
                            img={post.img}
                            post={post}
                            handleDeletePost={handleDeletePost}
                        />
                    ))
                }

            </Row>
        </Container>

    )
}

export default PostEvent