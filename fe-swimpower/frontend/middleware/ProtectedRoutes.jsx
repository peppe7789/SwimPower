import { Outlet } from "react-router-dom"
import Login from "../src/pages/Login"

const isAuth = () => {

    if (localStorage.getItem("Auth")) {
        return JSON.parse(localStorage.getItem('Auth'))
    } else {
        return false
    }
    
}

export const ProtectedRoute = () => {
    const isAuthorized = isAuth()

    return isAuthorized ? <Outlet/> : <Login/>
}