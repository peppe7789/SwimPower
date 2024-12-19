import Swal from "sweetalert2";


const AllertErrorFormInput = (error) => {

    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ricordati di compilare i campi",
        confirmButtonText: "OK",
        customClass: {
            confirmButton: "swal-button",
        },

    })

}

export default AllertErrorFormInput
