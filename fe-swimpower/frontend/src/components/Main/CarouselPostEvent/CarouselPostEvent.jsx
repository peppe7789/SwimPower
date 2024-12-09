import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import CarouselSinglePost from "./CarouselSinglePost/CarouselSinglePost";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { allPostEvents, isPostEventLoading, errorPostEvent, getPostEvents } from "../../../reducer/PostEventSlice"


const CarouselPostEvent = () => {
  const [index, setIndex] = useState(0);
  
  const dispatch = useDispatch()

  const postEvents = useSelector(allPostEvents)
  const isLoading = useSelector(isPostEventLoading)
  const error = useSelector(errorPostEvent)

 


  useEffect(() => {
    dispatch(getPostEvents())
  }, [dispatch])




  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };


  return (
    <>
      <Container>
        <Row
          className=" mt-2 pt-4"
        >
          <Col>
            <Carousel  activeIndex={index} onSelect={handleSelect}>
              {Array.isArray(postEvents) &&
                postEvents.slice(0, 5).map((post) => (
                  <Carousel.Item key={post._id}>
                    <CarouselSinglePost
                      img={post.img}
                    />
                  </Carousel.Item>
                ))}
            </Carousel>
          </Col>
        </Row>
      </Container>

    </>
  );
};

export default CarouselPostEvent;
