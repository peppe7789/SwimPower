import Dropdown from 'react-bootstrap/Dropdown';
import avatar from "../../../assets/avatar-boy.png"
import "./NavAvatar.css"
import { SlLogin } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { authenticatedUser, logoutUser } from '../../../reducer/UsersSlice';




const NavAvatar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(authenticatedUser)
  console.log("Authenticated user:", user)

  const handleRedirectRegisterForm = () => navigate("/login")
  const handleUserPage= ()=> navigate('/user')
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  }

  return (

    <div
      className=' d-flex justify-content-between align-items-center'
    >
      {!user &&
        (<div
          className=' d-flex gap-3 pointer-event'
        >
          Login/Register
          <SlLogin
            size={30}
            onClick={handleRedirectRegisterForm}
          />

        </div>)
      }

      {user &&
        (
          <>
            <div>
              Benvenuto, {user.name}
            </div>
            <Dropdown>
              <Dropdown.Toggle variant='' >
                <img className='custom-avatar bg3 rounded' src={avatar} alt="avatar" />
              </Dropdown.Toggle>

              <Dropdown.Menu>
              <Dropdown.Item
                className='text-hover'
                onClick={handleUserPage}
              >
                Profilo
              </Dropdown.Item>
              <Dropdown.Item
                onClick={handleLogout}
              >
                Logout
              </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        )
      }
    </div>
  )
}

export default NavAvatar