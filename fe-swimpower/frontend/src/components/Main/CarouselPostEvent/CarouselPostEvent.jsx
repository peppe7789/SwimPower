import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import CarouselSinglePost from "./CarouselSinglePost/CarouselSinglePost";
import { Col, Container, Row } from "react-bootstrap";

const CarouselPostEvent = () => {
  const [index, setIndex] = useState(0);
  const [postEvents, setPostEvents] = useState([]);

  const getPostEvent = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SWIMPOWER_SERVER_BASE_URL}/postEvent`
      );
      const result = await response.json();

      if (Array.isArray(result.postEvent)) {
        setPostEvents(result.postEvent);
      } else {
        setPostEvents([]);
      }
    } catch (e) {
      setPostEvents([]);
    }
  };

  useEffect(() => {
    getPostEvent();
  }, []);

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
            <Carousel activeIndex={index} onSelect={handleSelect}>
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
