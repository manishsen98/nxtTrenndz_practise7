import { Link } from "react-router-dom"
import "../Assets/css/ProductCart.css"


const ProductCart = (props) => {
    const {productData} = props
    const {title, brand, price, rating, imageUrl, id} = productData
    return(
        <Link to = {`/product/${id}`}  className="link-item" >
        <li className="product-item">
            <img src= {imageUrl} alt = "product"  className="image" />
            <h1 className="title"> {title} </h1>
            <p className="brand">  {brand} </p>
            <div className="product-details">
              <p> {price} </p>
              <div className="rating-container">
                <p className="rating"> {rating} </p>
                <img src="https://assets.ccbp.in/frontend/react-js/star-img.png" 
                 alt = "star"  className="star" />
              </div>
            </div>
        </li>
        </Link>
    )
}

export default ProductCart