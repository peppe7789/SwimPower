import { Button, FileInput, Label, Modal, TextInput, Textarea } from "flowbite-react";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updatePostImage } from "../../../../reducer/PostEventSlice";
import AllertErrorFormInput from "../../../Allert/AllertErrorFormInput/AllertErrorFormInput"

const FormUploadPostEvent = ({ postToUpdate, openModal, setOpenModal }) => {
    const dispatch = useDispatch();

    const [selectedImage, setSelectedImage] = useState(null);
    const [formDataPost, setFormDataPost] = useState({
        title: "",
        subtitle: "",
        paragraph: "",
        img: null,
    });

    
    useEffect(() => {
        if (postToUpdate) {
            setFormDataPost({
                title: postToUpdate.title || "",
                subtitle: postToUpdate.subtitle || "",
                paragraph: postToUpdate.paragraph || "",
                img: postToUpdate.img || null,
            });
        }
    }, [postToUpdate]);

    const onChangeFile = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormDataPost((prevState) => ({ ...prevState, [name]: value }));
    };

    const submitPostEvent = async () => {
    const { title, subtitle, paragraph, img } = formDataPost;
    
    if (!title || !subtitle || !paragraph) {
        AllertErrorFormInput()
        return;
    }
    
    const formData = new FormData();
    
    if (selectedImage) {
        formData.append("img", selectedImage);
    } else {
        formData.append("img", img); 
    }
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("paragraph", paragraph);

    const postEventId = postToUpdate._id;

    
    dispatch(updatePostImage({ postEventId, formData }));

    
    setOpenModal(false);
};

    return (
        <>
            <Modal
                className="mt-5"
                show={openModal}
                size="md"
                onClose={() => setOpenModal(false)}
                popup
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6 d-flex flex-column gap-2">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Modifica post</h3>

                       
                        <div>
                            <Label htmlFor="img" value="Immagine post" />
                            <FileInput
                                id="img"
                                name="img"
                                onChange={onChangeFile}
                                required={false} // Rendi il campo opzionale
                                defaultValue={formDataPost.img || ""}
                            />
                        </div>

                        
                        <div>
                            <Label htmlFor="title" value="Titolo" />
                            <TextInput
                                id="title"
                                name="title"
                                onChange={onChangeInput}
                                value={formDataPost.title}
                                required
                            />
                        </div>

                        
                        <div>
                            <Label htmlFor="subtitle" value="Sottotitolo" />
                            <TextInput
                                id="subtitle"
                                name="subtitle"
                                onChange={onChangeInput}
                                value={formDataPost.subtitle}
                                required
                            />
                        </div>

                        
                        <div>
                            <Label htmlFor="paragraph" value="Descrizione" />
                            <Textarea
                                id="paragraph"
                                name="paragraph"
                                onChange={onChangeInput}
                                value={formDataPost.paragraph}
                                required
                            />
                        </div>

                       
                        <div className="w-full">
                            <Button onClick={submitPostEvent} className="bg1">
                                Aggiorna post
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default FormUploadPostEvent;
