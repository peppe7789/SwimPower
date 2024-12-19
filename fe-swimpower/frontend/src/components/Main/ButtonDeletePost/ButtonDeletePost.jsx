import { Tooltip } from "flowbite-react"
import { AiOutlineDelete } from "react-icons/ai";





const ButtonDeletePost = ({onClick}) => {
    return (
        <Tooltip content="Elimina Post">
        <button
            className="bg-white rounded-2 p-2 text-hover text-reset"
            onClick={onClick}
        >
                <AiOutlineDelete
                    size={40}
                />
                
        </button>
    </Tooltip>
    )
}

export default ButtonDeletePost