import "./CarouselSinglePost.css"


const CarouselSinglePost = ({ img }) => {
  return (
    <div className="carousel-single-post d-flex justify-content-center">
      {img
        ? <img src={img} alt="imagine" style={{
          width: "100%", 
          height: "400px", 
          objectFit: "cover", 
          borderRadius: "10px",
        }}/>
        : <div>No Image Available</div>}
      
    </div>
  )
}

export default CarouselSinglePost