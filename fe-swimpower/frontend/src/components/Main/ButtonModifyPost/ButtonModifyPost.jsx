import { Tooltip } from "flowbite-react"
import { CiEdit } from "react-icons/ci";



const ButtonModifyPost = ({onClick}) => {
    return (
        <Tooltip content="Modifica post">
        <button
            className="bg-white rounded-2 p-2 text-hover text-reset"
        onClick={onClick}
        >
                <CiEdit
                    size={40}
                />
                
        </button>
    </Tooltip>
    )
}

export default ButtonModifyPost