import axios from 'axios';
import toast from 'react-hot-toast';


export const base_Url = "http://localhost:5000/api/"
// export const base_Url = "http://localhost:5000/api/"


export const logoutUser = async () => {
    const response: any = await axios.get("http://localhost:5000/api/authentication/logout", {
        withCredentials: true
    });
    if (response.data) {
        toast.success("User Logged Out");
    } else if (response.error) {
        return toast.error(response.error?.data?.message);
    }

}



export const loginStatus = async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/authentication/authstatus", {
            withCredentials: true
        })
        return response.data;
    } catch (error: any) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        return message
    }
}