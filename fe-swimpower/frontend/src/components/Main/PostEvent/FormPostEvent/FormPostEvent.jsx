import { Button, FileInput, Label, Modal, TextInput, Textarea } from "flowbite-react";
import './FormPostEvent.css'
import { useState } from "react";
import { useSelector } from "react-redux";
import AllertSuccessCreate from "../../../Allert/AllertSuccessCreate/AllertSuccessCreate"
import AllertError from "../../../Allert/AllertError/AllertError";
import { authenticatedUser } from "../../../../reducer/UsersSlice";
import { allPostEvents } from "../../../../reducer/PostEventSlice";



const FormPostEvent = ({openModalCreateForm, setOpenModalCreateForm}) => {

    const user = useSelector(authenticatedUser)
    const postEvents = useSelector(allPostEvents)
    const [formDataPost, setFormDataPost] = useState({})
    const [formData, setFormData] = useState({
      
    })
    const [fileImg, setFileImg] = useState({})
    
    
    

    const onChangeFile = (e) => {
        setFileImg(e.target.files[0])
    }

    const onChangeInput = (e) => {
        const { name, value } = e.target
        setFormDataPost({
            ...formDataPost,
            [name]: value
        })
    }

    const uploadFile = async (file) => {
        const fileData = new FormData();
        fileImg.append("img", file);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_SWIMPOWER_SERVER_BASE_URL}/postEvent/uploads/cloud`,
                {
                    method: "POST",
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

    const submitPostEvent = async (e) => {
        e.preventDefault()
        const userRole = user.role


        if (fileImg) {
            try {
                const uploadedFile = await uploadFile(file)
                const postEventFormData = {
                    ...formDataPost,
                    userRole,
                    img: uploadedFile.img
                }
                console.log(postEventFormData);

                const response = await fetch(`${import.meta.env.VITE_SWIMPOWER_SERVER_BASE_URL}/postEvent/create`, {
                    method: 'POST',
                    body: JSON.stringify(postEventFormData)
                })
                AllertSuccessCreate()
                return await response.json()

            } catch (error) {
                AllertError(error)
            }
        }

    }

  

    return (

        <>

            <Modal className=" mt-5" show={openModalCreateForm} size="md" onClose={() => setOpenModalCreateForm(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6 d-flex flex-column gap-2">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Crea post eventi</h3>
                        
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="img" value="Imagine post" />
                            </div>
                            <FileInput
                                id="img"
                                placeholder="Inserisci imagine post"
                                name="img"
                                value={formDataPost.img}
                                onChange={onChangeFile}
                                required
                            />
                        </div>
                        
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="title" value="Titolo" />
                            </div>
                            <TextInput
                                id="title"
                                placeholder="Inserisci titolo post"
                                name="title"
                                value={formDataPost.title}
                                onChange={onChangeInput}
                                required
                                
                            />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="subtitle" value="Sottotitolo" />
                            </div>
                            <TextInput
                                id="subtitle"
                                placeholder="Inserisci sottotitolo"
                                name="subtitle"
                                value={formDataPost.subtitle}
                                onChange={onChangeInput}
                                required
                            />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="paragraph" value="Descrizione" />
                            </div>
                            <Textarea
                                id="paragraph"
                                placeholder="Inserisci descrizione post"
                                name="paragraph"
                                value={formDataPost.paragraph}
                                onChange={onChangeInput}
                                required
                            />
                        </div>

                        <div className="w-full">
                            <Button
                                onClick={submitPostEvent}
                                className="bg1"
                            >
                                Crea post
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>

    )
}

export default FormPostEvent