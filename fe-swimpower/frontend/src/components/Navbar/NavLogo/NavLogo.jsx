import logo from '../../../assets/logo-swimpower1.webp'
import { Link } from "react-router-dom"
import "../NavLogo/NavLogo.css"


const NavLogo = () => {

    return (
        <div
        className=' d-flex align-items-center gap-1'
        >
            <div className=' size-custom d-flex align-items-center justify-content-center'>
                <Link className='d-flex align-items-center justify-content-center' to='/'>
                    <img className=' h-75 w-75 rounded-4' src={logo} alt="logo swimpower" />
                </Link>
            </div>
            <div
                className=' d-md-block d-none  '
            >
                <h3 className='m-0'>
                    SWIM POWER
                </h3>
            </div>
        </div>

    )
}

export default NavLogo