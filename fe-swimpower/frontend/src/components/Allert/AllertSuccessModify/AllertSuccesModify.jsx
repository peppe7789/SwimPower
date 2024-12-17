
import Swal from "sweetalert2";

const AllertSuccessModify = () => {

    Swal.fire({
        icon:"success",
        title: "Modifica effettuata con successo",
        confirmButtonText: "OK",
        customClass: {
            confirmButton: "swal-button",
        },
        showClass: {
            popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
        },
        hideClass: {
            popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
        }
    })


};

export default AllertSuccessModify
