import Swal from "sweetalert2";


const AllertNoUser = (error) => {

    Swal.fire({
        icon: "warning",
        title: "Mi dispiace",
        text: "Utente non riconosciuto",
        confirmButtonText: "OK",
        customClass: {
            confirmButton: "swal-button",
        },

    })

}

export default AllertNoUser
