import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AllertError from "../../Allert/AllertError/AllertError";
import AllertSuccessRegister from "../../Allert/AllertSuccessRegister/AllertSuccessRegister";


const RegisterForm = () => {
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState(true);

    const [registerForm, setRegisterForm] = useState({})

    const onCloseModal = () => {
        setOpenModal(false);

    }

    const handleRegisterForm = (event) => {
        const { name, value } = event.target
        setRegisterForm({
            ...registerForm,
            [name]: name === "name" || name === "surname" ? value.toLowerCase() : value,
        })
    }

    const onSubmitRegisterForm = async () => {

        try {
            const response = await fetch(`${import.meta.env.VITE_SWIMPOWER_SERVER_BASE_URL}/user/create`, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(registerForm)
            })
            console.log(response);
            if (!response.ok) {
                AllertError()
                return await response.json()
            }

            localStorage.setItem("Auth", "true")
            AllertSuccessRegister()
            navigate('/')


        } catch (error) {
            AllertError(error)
        }
    }

    console.log(registerForm);

    return (
        <>

            <Modal className=" mt-5" show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6 d-flex flex-column gap-2">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Conosciamoci</h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Nome" />
                            </div>
                            <TextInput
                                id="name"
                                placeholder="come ti chiami?"
                                name="name"
                                value={registerForm.name}
                                onChange={handleRegisterForm}
                                required
                                
                            />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="surname" value="Cognome" />
                            </div>
                            <TextInput
                                id="surname"
                                placeholder="il tuo cognome?"
                                name="surname"
                                value={registerForm.surnamename}
                                onChange={handleRegisterForm}
                                required
                            />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email" value="Email" />
                            </div>
                            <TextInput
                                id="email"
                                placeholder="nome@gmail.com"
                                name="email"
                                value={registerForm.email}
                                onChange={handleRegisterForm}
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
                                value={registerForm.password}
                                onChange={handleRegisterForm}
                                required
                            />
                            <small
                            className=" d-flex flex-column gap-2"
                            >
                                La password deve includere:
                                <ul>
                                    <li>Almeno 8 caratteri</li>
                                    <li>1 lettera maiuscola</li>
                                    <li>1 lettera minuscola</li>
                                    <li>1 numero</li>
                                    <li>1 simbolo (e.g., @, #, $)</li>
                                </ul>
                            </small>
                        </div>

                        <div className="w-full">
                            <Button
                                onClick={onSubmitRegisterForm}
                                className="bg1"
                            >
                                Registrati
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}


export default RegisterForm