import { useParams } from "react-router-dom";
import PageInfoUser from "../components/Main/User/PageInfoUser/PageInfoUser"
import NavAndFooter from "../components/NavAndFooter/NavAndFooter"
import Loader from "../components/Loader/Loader";
import AllertError from "../components/Allert/AllertError/AllertError";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";


const InfoUser = () => {
    const { userId } = useParams()
    const [infoUser, setInfoUser] = useState(null)


    const getUserById = async () => {
        Loader
        try {
            const response = await fetch(`${import.meta.env.VITE_SWIMPOWER_SERVER_BASE_URL}/user/userId/${userId}`)
            const result = await response.json()
            setInfoUser(result)
        } catch (error) {
            AllertError(error)
        }
    }

    useEffect(() => {
        if (userId) {
            getUserById();
        }
    }, [userId])






    return (

        <NavAndFooter>
            <main
                className=" bg2 container rounded-3 custom-main "
            >
                <Container fluid>
                    <Row>
                        <PageInfoUser
                            infoUser={infoUser}
                        />
                    </Row>
                </Container>
            </main>
        </NavAndFooter>



    )
}

export default InfoUser