import Swal from "sweetalert2";

const AllertSuccess = () => {

    return (
        Swal.fire({
            title: "Benvenuto in SWIMPOWER",
            text:"effettua il login",
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
    )
    
}

export default AllertSuccess