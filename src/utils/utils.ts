import { toast, Bounce } from "react-toastify";

export const formatDate = (timestamp: string) => {

    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: 'UTC'
    });

}

export const getIstDate = () => {

    const date = new Date();

    const IST_offset = 330
    return String(new Date(date.getTime() + (IST_offset * 60 * 1000)));
}

export const displayToast = (message: string, isError = false) => {
    return isError ? toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    }) : toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });

}