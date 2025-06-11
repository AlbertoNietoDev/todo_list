import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
const MySwal = withReactContent(Swal);

export const DeleteAlert = (successfn) => {
  return MySwal.fire({
    title: "Do you want to delete the task?",
    showCancelButton: true,
    confirmButtonText: "Yes",
    denyButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      successfn(result);
    }
  });
};
