import { Container, Row } from "react-bootstrap"
import CardEvent from "./CardEvent/CardEvent"
import { useDispatch, useSelector } from "react-redux";
import { allPostEvents, getPostEvents } from "../../../reducer/PostEventSlice";
import { useEffect } from "react";
import './PostEvent.css'


const PostEvent = () => {

    const dispatch = useDispatch()
    const postEvents = useSelector(allPostEvents)

    useEffect(() => {
        dispatch(getPostEvents())
    }, [dispatch])

    return (

        <Container>
            <Row
            className=" py-4 d-flex gap-4 justify-content-center"
            >
                <h1
                className=" bg1 custom-title rounded-3 d-flex align-items-center  "
                >
                    I NOSTRI EVENTI
                </h1>
                {Array.isArray(postEvents) &&
                    postEvents.map((post) => (
                        <CardEvent
                            key={post._id}
                            title={post.title}
                            subtitle={post.subtitle}
                            paragraph={post.paragraph}
                            img={post.img}
                        />
                    ))
                }

            </Row>
        </Container>

    )
}

export default PostEvent