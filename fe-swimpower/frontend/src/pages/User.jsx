
import NavAndFooter from "../components/NavAndFooter/NavAndFooter"
import AllPayUser from "../components/Main/User/AllPayUser/AllPayUser"
import { useEffect, useState } from 'react';
import AllertError from "../components/Allert/AllertError/AllertError";
import Loader from "../components/Loader/Loader";

const User = () => {

    const [allPayUser, setAllPayUser] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)



    const getAllPayUser = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(`${import.meta.env.VITE_SWIMPOWER_SERVER_BASE_URL}/user?page=${page}&pageSize=${pageSize}`)
            const result = await response.json()
            setIsLoading(false)
            setAllPayUser(result)

        } catch (error) {
            AllertError(error)
        } finally {
            setIsLoading(false)
        }
    }



    const deleteUser = async (userId) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_SWIMPOWER_SERVER_BASE_URL}/user/delete/${userId}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();

            if (result.users && Array.isArray(result.users)) {
                setAllPayUser({ user: result.users })
            } else {
                setAllPayUser({ user: [] })
            }
        } catch (error) {
            AllertError(error);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        getAllPayUser()
    }, [page, pageSize])




    if (!(allPayUser)) {
        return (
            <NavAndFooter>
                <main
                    className=" bg2 container rounded-3 custom-main d-flex justify-content-center pt-5"
                >
                    <Loader />
                </main>
            </NavAndFooter >
        )
    }
    return (
        <NavAndFooter>
            <main
                className=" bg2 container rounded-3 custom-main"
            >
                <AllPayUser
                    users={allPayUser.user || []}
                    deleteUser={deleteUser}
                    page={page}
                    setPage={setPage}
                    totalPages={allPayUser.totalPages}
                    setAllPayUser={setAllPayUser}
                    allPayUser={allPayUser}
                    setIsLoading={setIsLoading}
                    getAllPayUser={getAllPayUser}

                />

            </main>

        </NavAndFooter>
    )
}

export default User