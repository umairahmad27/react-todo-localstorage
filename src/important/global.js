import { toast } from "react-toastify"

window.getRandomId = () => Math.random().toString(36).slice(2)

window.toastify = (msg, type) => {

    switch (type) {
        case "success":
            toast.success(msg)
            break;
        case "error":
            toast.error(msg)
            break;
        default:
            toast(msg)
    }
}