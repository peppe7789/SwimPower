import "./CarouselSinglePost.css"


const CarouselSinglePost = ({ img }) => {
  return (
    <div className="carousel-single-post d-flex justify-content-center">
      {img ? <img src={img} alt="imagine" /> : <div>No Image Available</div>}
      
    </div>
  )
}

export default CarouselSinglePost