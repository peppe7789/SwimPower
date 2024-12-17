import { Tooltip } from "flowbite-react"
import { CiSquarePlus } from "react-icons/ci";






const ButtonCreatePost = ({onClick}) => {
    return (
        <Tooltip content="Crea Post">
        <button
            className="bg-white rounded-2 p-1 text-hover text-reset"
            onClick={onClick}
        >
                <CiSquarePlus
                    size={40}
                />
                
        </button>
    </Tooltip>
    )
}

export default ButtonCreatePost