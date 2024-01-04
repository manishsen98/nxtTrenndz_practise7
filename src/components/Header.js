import Cookies from "js-cookie";
import "../Assets/css/Header.css"
 import { Link, useNavigate } from "react-router-dom";


const Header = () => {
   const navigate = useNavigate()
  const onClickLogout = () => {
    Cookies.remove("jwt_token" )
     navigate("/login")
  }

    return(
        <nav className="nav-header">
            <div className="nav-content">
             <img 
               className="website-logo"
               src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
               alt="website-logo"
             />
             <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to = "/"  className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link to="/product" className="nav-link">
                Products
              </Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/cart" className="nav-link">
                Cart
              </Link>
            </li>
             </ul>
             <button className="logout-button" onClick={onClickLogout} > Logout </button>
            </div>
        </nav>
    )
} 

export default Header