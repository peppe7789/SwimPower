import logo from '../../../assets/logo-swimpower1.webp'
import { Link } from "react-router-dom"
import "../NavLogo/NavLogo.css"


const NavLogo = () => {
    
    return (
        <div className=' size-custom border d-flex align-items-center justify-content-center'>
            <Link className='d-flex align-items-center justify-content-center' to= '/'>
                <img className=' h-75 w-75 rounded-4' src={logo} alt="logo swimpower" />
            </Link>
        </div>
    )
}

export default NavLogo