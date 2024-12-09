import React, { children } from "react";
import Footer from "../Footer/Footer";
import MyNav from "../MyNavbar/MyNav"



const NavAndFooter = ({ children }) => {

    return (
        <>
            <MyNav />
                {children}
            <Footer />
        </>
    )
}

export default NavAndFooter