import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginStatus } from "../helpers/AuthFetch";
import toast from "react-hot-toast";
import { current_user_login_status } from "../redux/authentication/authSlice";

const useRedirectLoggedOutUser = ({path}:any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const redirectLoggedOutUser = async () => {
      const isLloggedIn = await loginStatus();
      dispatch(current_user_login_status(isLloggedIn));


      if (!isLloggedIn) {
        toast.error("Session expired, Please log in to continue.");
        navigate(path);
        return;
      }
    };
    redirectLoggedOutUser();
  }, [navigate, path, dispatch]);
};


export default useRedirectLoggedOutUser;