import { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { AlignJustify } from 'lucide-react';
import { House, UsersRound,CalendarArrowUp } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import "./NavMenu.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { authenticatedUser, logoutUser } from '../../../reducer/UsersSlice';



const NavMenu = () => {
    const dispatch = useDispatch()
    const user = useSelector(authenticatedUser)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);
    const role = useSelector((state) => state.users.authenticatedUser?.role);


    return (
        <>
            <AlignJustify
                size={32}
                onClick={toggleShow}
            />
            <Offcanvas className=" bg3" show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        Menu
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body
                    className=' d-flex flex-column gap-2'
                >
                    <Link to="/"
                        className=' d-flex gap-2 text-hover text-reset '
                    >
                        <House />
                        <span>Home</span>
                    </Link>
                    <Link to="/"
                        className='text-hover d-flex gap-2 text-reset '
                    >
                        <CalendarArrowUp />
                        <span>Prenota lezione personal</span>
                    </Link>
                    {role === "admin"
                        ? <Link to="/user"
                            className='text-hover d-flex gap-2 text-reset '
                        >
                            <UsersRound />
                            <span>Lista Utenti </span>
                        </Link>
                        : ""
                    }

                </Offcanvas.Body>
            </Offcanvas>
        </>

    )
}

export default NavMenu