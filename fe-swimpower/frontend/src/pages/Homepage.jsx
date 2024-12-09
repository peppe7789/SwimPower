import PostEvent from "../components/Main/PostEvent/PostEvent"
import CarouselPostEvent from "../components/Main/CarouselPostEvent/CarouselPostEvent"
import NavAndFooter from "../components/NavAndFooter/NavAndFooter"

const HomePage = () => {


  return (

    <NavAndFooter>
      <main
      className=" bg2 container rounded-3 mt-3 custom-main"
      >
        <CarouselPostEvent />
        <PostEvent />
      </main>
     </NavAndFooter>



  )
}

export default HomePage