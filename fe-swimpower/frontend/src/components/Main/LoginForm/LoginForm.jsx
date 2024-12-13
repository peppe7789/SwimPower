import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AllertError from "../../Allert/AllertError/AllertError";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../reducer/UsersSlice";

const LoginForm = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(true);
    const [loginForm, setLoginForm] = useState({})
    console.log(loginForm);
    
    const onCloseModal = () => {
        setOpenModal(false);

    }

    const linkToRegisaterForm = () => navigate('/register')


    const handleLoginForm = (event) => {
        const { name, value } = event.target
        setLoginForm({
            ...loginForm,
            [name]: value
        })
    }

    const onSubmitLogin = async () => {
        
        try {
            const userData = await dispatch(loginUser(loginForm)).unwrap();
            
            localStorage.setItem("Auth", "true");
            navigate("/");

        } catch (error) {
            AllertError(error);
        }
    };



    return (
        <>
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6 d-flex flex-column gap-2">
                        <h3
                            className="text-xl font-medium text-gray-900 dark:text-white"
                        >
                            Accedi al sito
                        </h3>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email" value="Email" />
                            </div>
                            <TextInput
                                id="email"
                                placeholder="nome@gmail.com"
                                name="email"
                                value={loginForm.email}
                                onChange={handleLoginForm}
                                required
                            />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password" value="Password" />
                            </div>
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={loginForm.password}
                                onChange={handleLoginForm}
                                required
                            />
                        </div>

                        <div className="w-full">
                            <Button
                                onClick={onSubmitLogin}
                                className="bg1"
                            >Accedi al tuo account</Button>
                        </div>
                        <div
                            className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300"
                        >
                            Non sei registrato?&nbsp;
                            <a onClick={linkToRegisaterForm} className=" hover:underline dark:text-cyan-500" >
                                Crea account
                            </a>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )

}



export default LoginForm