import PostEvent from "../components/Main/PostEvent/PostEvent"
import CarouselPostEvent from "../components/Main/CarouselPostEvent/CarouselPostEvent"
import NavAndFooter from "../components/NavAndFooter/NavAndFooter"
import { Container, Row } from "react-bootstrap"
import FormPostEvent from "../components/Main/PostEvent/FormPostEvent/FormPostEvent"
import { useState } from "react"

const HomePage = () => {
  
  const [openModalCreateForm, setOpenModalCreateForm] = useState(false);
  const [postToUpdate, setPostToUpdate] = useState(null);

  



  return (

    <NavAndFooter>
      <main
        className=" bg2 container rounded-3 custom-main "
      >
        <Container>
          <Row
            className=" py-4 d-flex justify-content-center"
          >
            <h3
              className=" bg1 custom-title rounded-3 d-flex align-items-center text-center  "
            >
              Benvenuto nel nostro sito, troverai alcuni dei nostri eventi. Ti aspettiamo nelle nostre piscine.
            </h3>
            <CarouselPostEvent />
            <PostEvent
              setOpenModalCreateForm={setOpenModalCreateForm}
              openModalCreateForm={openModalCreateForm}
              setPostToUpdate={setPostToUpdate}
            />
          </Row>
        </Container>
        <FormPostEvent
          openModalCreateForm={openModalCreateForm}
          setOpenModalCreateForm={setOpenModalCreateForm}
          postToUpdate={postToUpdate}
          
        />
      </main>

    </NavAndFooter>





  )
}

export default HomePage