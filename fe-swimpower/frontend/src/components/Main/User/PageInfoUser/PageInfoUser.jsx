import { Col, Form } from "react-bootstrap"
import "./PageInfoUser.css"
import Loader from "../../../Loader/Loader";
import { Tooltip } from "flowbite-react";
import { TbUserEdit } from "react-icons/tb";
import { useState } from "react";
import AllertError from "../../../Allert/AllertError/AllertError";
import AllertSuccessModify from "../../../Allert/AllertSuccessModify/AllertSuccesModify";
import { useNavigate } from "react-router-dom";


const PageInfoUser = ({ infoUser }) => {

    if (!infoUser || !infoUser.user) {
        return <Loader />
    }
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: infoUser?.user?.name || "",
        surname: infoUser?.user?.surname || "",
        email: infoUser?.user?.email || "",
        role: infoUser?.user?.role || "",
        gender: infoUser?.user?.gender || "",
        dob: infoUser?.user?.dob?.split("T")[0] || "",
        startSubscription: infoUser?.user?.startSubscription?.split("T")[0] || "",
        endSubscription: infoUser?.user?.endSubscription?.split("T")[0] || "",
    });
   
    const [file, setFile] = useState(null)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        });
    }
    const handleSuccessModify = () => navigate('/user')


    const uploadFile = async (file) => {
        const fileData = new FormData();
        fileData.append("avatar", file);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_SWIMPOWER_SERVER_BASE_URL}/userpatch/${infoUser.user._id}/avatar`,
                {
                    method: "PATCH",
                    body: fileData,
                }
            );

            if (!response.ok) {
                throw new Error(`File upload failed: ${response.status}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            AllertError(error)
        }
    };

    const UpdateUserProfile = async (e) => {
        e.preventDefault()

        try {
            let avatarUrl = null;

            if (file) {
                const patchUserFile = await uploadFile(file);
                avatarUrl = patchUserFile?.avatar || null
            }

            const uploadUserData = {
                ...formData,
                img: avatarUrl || infoUser.user.avatar,
            };

            const response = await fetch(
                `${import.meta.env.VITE_SWIMPOWER_SERVER_BASE_URL}/user/patch/${infoUser.user._id}`,
                {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(uploadUserData),
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to update user: ${response.status}`);
            }
            
            
            const updatedUser = await response.json();
            
            AllertSuccessModify()
            handleSuccessModify()


        } catch (error) {
            AllertError(error);
        }
    };

    if (!infoUser) {
        return Loader;
    }

    const { name, surname, email, role, avatar, gender, dob, startSubscription, endSubscription } = infoUser.user;

    return (
        <>
            <div
                className=" d-flex align-items-center  justify-content-around"
            >
                <h2
                    className=" d-flex justify-content-center pt-3"
                >
                    <span>{name}</span> - <span>{surname}</span>
                </h2>
            </div>

            <Col
                sm={12}
                className=" d-flex  justify-content-center p-3 "
            >
                <Form
                    onSubmit={UpdateUserProfile}
                    className=" d-flex flex-column body-info-user bg3 align-items-center gap-3 py-2 rounded-3 "
                >
                    <Col
                        sm
                        className="body-img-user d-flex flex-column gap-5  flex-md-row "
                    >
                        <img
                            src={file ? URL.createObjectURL(file) : avatar || "/path/to/default-avatar.png"}
                            alt="Image user"
                            className="img-info-user rounded-5 "
                        />

                        <Form.Group>
                            <Form.Label>Carica immagine</Form.Label>
                            <Form.Control className=" size-inpt-file" name='asavatar' type="file" onChange={handleFileChange} />
                        </Form.Group>
                    </Col>
                    <Col
                        sm
                        className=" d-flex flex-column flex-md-row gap-md-4 "
                    >
                        <Col
                            sm
                            md={6}
                            className=" d-flex flex-column justify-content-center rounded-3 gap-1 "
                        >
                            <Form.Group>
                                <Form.Label>Nome</Form.Label>
                                <Form.Control className=" size-inpt-file" id="name" defaultValue={name} name='name' type="text" onChange={handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Cognome</Form.Label>
                                <Form.Control className=" size-inpt-file" id="cognome" defaultValue={surname} name='surname' type="text" onChange={handleInputChange} />
                            </Form.Group>

                            <Form.Group  >
                                <Form.Label>Ruolo</Form.Label>
                                <Form.Select name='role' defaultValue={role} onChange={handleInputChange}>
                                    <option value="admin">admin</option>
                                    <option value="instructor">instructor</option>
                                    <option value="payuser">payuser</option>
                                    <option value="freeuser">freeuser</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control className=" size-inpt-file" id="email" defaultValue={email} name='email' type="email" onChange={handleInputChange} />
                            </Form.Group>
                        </Col>

                        <Col
                            sm
                            md={6}
                            className=" d-flex flex-column justify-content-center rounded-3 gap-1"
                        >
                            <Form.Group  >
                                <Form.Label>Genere</Form.Label>
                                <Form.Select name='gender' defaultValue={gender} onChange={handleInputChange}>
                                    <option value="M">M</option>
                                    <option value="F">F</option>
                                    <option value="not specified">not specified</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Data di nascita</Form.Label>
                                <Form.Control className=" size-inpt-file" id="dob" deValue={dob} name='dob' placeholder={dob} type="date" onChange={handleDateChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Inizio abbonamento</Form.Label>
                                <Form.Control className=" size-inpt-file" id="dob" defaultValue={startSubscription} name='startSubscription' placeholder={startSubscription} type="date" onChange={handleDateChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Fine abbonamento</Form.Label>
                                <Form.Control className=" size-inpt-file" id="endSubscription" defaultValue={endSubscription} name='endSubscription' placeholder={endSubscription} type="date" onChange={handleDateChange} />
                            </Form.Group>
                        </Col>
                    </Col>
                    <div
                        className="d-flex justify-content-center p-3"
                    >
                        <Tooltip content="Modifica dati">
                            <button
                                type="submit"
                                className="bg-white rounded-2 p-1 text-hover text-reset"
                                encType="multipart/form-data"
                            >
                                <TbUserEdit size={40} />
                            </button>
                        </Tooltip>
                    </div>
                </Form>
            </Col>

        </>

    )

}

export default PageInfoUser
