import { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { AlignJustify } from 'lucide-react';
import { House } from "lucide-react"
import { Link } from "react-router-dom"
import "./NavMenu.css"

const NavMenu = () => {
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);


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
                        className='text-hover d-flex gap-2 text-reset '
                    >
                        <House />       
                        <span>Home</span>
                    </Link>
                    <Link to="/"
                        className='text-hover d-flex gap-2 text-reset '
                    >
                        <House />
                        <span>Prenota lezione personal</span>
                    </Link>
                    <Link to="/"
                        className='text-hover d-flex gap-2 text-reset '
                    >
                        <House />
                        <span>Contatti</span>
                    </Link>
                </Offcanvas.Body>
            </Offcanvas>
        </>

    )
}

export default NavMenu