import React, { useEffect, useState } from "react";
import { LuUserRoundSearch } from "react-icons/lu";
import './SearchUser.css'
import AllertError from "../../../Allert/AllertError/AllertError";


const SearchUser = ({setAllPayUser, allPayUser,setIsLoading, getAllPayUser}) => {
    const [inputValue, setInputValue] = useState("")
    
    const onChangeSearchInput = (e) => {
        setInputValue(e.target.value)
    }

    const getFilterUsers = async () => {
        setIsLoading(true)
        try {
            if (inputValue === "") {
               return await getAllPayUser()
            }

const response = await fetch(`${import.meta.env.VITE_SWIMPOWER_SERVER_BASE_URL}/user/bysurname/${inputValue}`)
            const result = await response.json()

            if (result.users && Array.isArray(result.users)) {
                setAllPayUser({ user: result.users })
            } else {
                setAllPayUser({ user: [] })
            }

        } catch (error) {
            AllertError(error)
        } finally {
            setIsLoading(false)
        }
    }





    return (

        <div
            className=" d-flex gap-3  gap-md-3 pb-md-4"
        >
            <input
                type="text"
                placeholder="Cerca in lista"
                className=" custom-input-search rounded-3 "
                onChange={onChangeSearchInput}
                value={inputValue}
            />
            <button
                onClick={getFilterUsers}
            >
                <LuUserRoundSearch
                    size={30}
                />
            </button>
        </div>
    )
}

export default SearchUser