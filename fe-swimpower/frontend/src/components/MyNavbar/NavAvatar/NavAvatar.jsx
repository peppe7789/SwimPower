import Dropdown from 'react-bootstrap/Dropdown';
import avatar from "../../../assets/avatar-boy.png"
import "./NavAvatar.css"


const NavAvatar = () => {


  return (
   
    <div
    className=' d-flex justify-content-between align-items-center'
    >
        <div>
          Benvenuto, name
        </div>
        <Dropdown>
          <Dropdown.Toggle variant='' >
            <img className='custom-avatar bg3 rounded' src={avatar} alt="avatar" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item className='text-hover' href="#/action-1">Profilo</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

    

  )
}

export default NavAvatar