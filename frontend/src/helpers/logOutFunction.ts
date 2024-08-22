import { logoutUser } from "./AuthFetch";
import store from '../redux/store'; // Adjust the import path as needed
import {resetUserState } from "../redux/authentication/authSlice";
import { resetUserTransactions } from "../redux/usertransaction/userTransactionSlice";
import { resetPromoCodes } from "../redux/admin/adminSlice";




// export const dispatchAction = ({action}: any) => {
//     store.dispatch(action);
// };

// const dispatch = useDispatch()
export const logUserOut = async () => {
     await logoutUser();    
    store.dispatch(resetUserTransactions());
    store.dispatch(resetUserState());
    store.dispatch(resetPromoCodes())
    // toast.success("Log Out Succesfull")
    localStorage.clear();
    window.location.href = "/"
}