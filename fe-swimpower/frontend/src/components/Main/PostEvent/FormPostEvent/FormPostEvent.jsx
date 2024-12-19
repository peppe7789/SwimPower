import { useState, useEffect } from "react";
import { Button, FileInput, Label, Modal, TextInput, Textarea } from "flowbite-react";
import AllertSuccessCreate from "../../../Allert/AllertSuccessCreate/AllertSuccessCreate";
import AllertError from "../../../Allert/AllertError/AllertError";
import { authenticatedUser } from "../../../../reducer/UsersSlice";
import { allPostEvents, getPostEvents } from "../../../../reducer/PostEventSlice";
import { useDispatch, useSelector } from "react-redux";

const FormPostEvent = ({ openModalCreateForm, setOpenModalCreateForm, postToUpdate }) => {
    const user = useSelector(authenticatedUser);
    const dispatch = useDispatch();
    const [formDataPost, setFormDataPost] = useState({});
    const [fileImg, setFileImg] = useState({});


    useEffect(() => {
        if (postToUpdate) {
            setFormDataPost({
                title: postToUpdate.title,
                subtitle: postToUpdate.subtitle,
                paragraph: postToUpdate.paragraph,
            });
            setFileImg(postToUpdate.img);
        }
    }, [postToUpdate]);


    const handleCloseForm = () => {
        setOpenModalCreateForm(false);
        dispatch(getPostEvents());
    };


    const onChangeFile = (e) => {
        setFileImg(e.target.files[0]);
    };


    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormDataPost({
            ...formDataPost,
            [name]: value.toLowerCase(),
        });
    };


    const uploadFile = async (file) => {
        const fileData = new FormData();
        fileData.append("img", file);

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
            AllertError(error);
        }
    };


    const submitPostEvent = async (e) => {
        e.preventDefault();

        if (fileImg) {
            try {
                const uploadedFile = await uploadFile(fileImg);
                const postEventFormData = {
                    ...formDataPost,
                    img: uploadedFile.img,
                    user: user._id,
                };

                const response = await fetch(`${import.meta.env.VITE_SWIMPOWER_SERVER_BASE_URL}/postEvent/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(postEventFormData),
                });

                if (response.ok) {
                    AllertSuccessCreate();
                } else {
                    AllertError(error);
                }

                handleCloseForm();
                return await response.json();
            } catch (error) {
                AllertError(error);
            }
        }
    };



    return (
        <>
            <Modal className="mt-5" show={openModalCreateForm} size="md" onClose={() => setOpenModalCreateForm(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6 d-flex flex-column gap-2">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Crea post
                        </h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="img" value="Immagine post" />
                            </div>
                            <FileInput
                                id="img"
                                placeholder="Inserisci immagine post"
                                name="img"
                                onChange={onChangeFile}
                                required
                                defaultValue={postToUpdate?.img}
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
                                onChange={onChangeInput}
                                value={formDataPost.title || ''} 
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
                                onChange={onChangeInput}
                                value={formDataPost.subtitle || ''} 
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
                                onChange={onChangeInput}
                                value={formDataPost.paragraph || ''} 
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
    );
};

export default FormPostEvent;
