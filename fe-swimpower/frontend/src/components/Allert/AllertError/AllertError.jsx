import Swal from "sweetalert2";


const AllertError = (error) => {

    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Qualcosa è andato storto!",
        confirmButtonText: "OK",
        customClass: {
            confirmButton: "swal-button",
        },

    })

}

export default AllertError
