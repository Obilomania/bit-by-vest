import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import FaqPage from "./pages/FaqPage";
import Contact from "./pages/Contact";
import LoginUser from "./pages/authentication/LoginUser";
import RegisterUser from "./pages/authentication/RegisterUser";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import ChangePassword from "./pages/authentication/ChangePassword";
import Profile from "./pages/authentication/Profile";
import EditProfile from "./pages/authentication/EditProfile";
import ResetPassword from "./pages/authentication/ResetPassword";
import UserDashboard from "./pages/UserDashboard";
import NewDeposit from "./pages/NewDeposit";
import NewWithdrawal from "./pages/NewWithdrawal";
import Landing from "./pages/adminSection/Landing";
import PromoCode from "./pages/adminSection/PromoCode";
import NotFound from "./pages/NotFound";
import { loginStatus } from "./helpers/AuthFetch";
import { useDispatch } from "react-redux";
import { current_user_login_status } from "./redux/authentication/authSlice";
import AllTransaction from "./pages/AllTransaction";

export const ScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
};

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function authStatus() {
      const status = await loginStatus();
      dispatch(current_user_login_status(status));
    }
    authStatus();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />

        {/* *************AUTHENTICATION **********************= */}
        <Route path="/login" element={<LoginUser />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* *************AUTHENTICATED USER **********************= */}
        <Route path="/changePassword/:id" element={<ChangePassword />} />
        <Route path="/my-profile" element={<Profile />} />
        <Route path="/edit-profile/:id" element={<EditProfile />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/new-deposit" element={<NewDeposit />} />
        <Route path="/new-withdrawal" element={<NewWithdrawal />} />
        <Route path="/user-transactions" element={<AllTransaction />} />
        {/* *************ADMIN SECTION **********************= */}
        <Route path="/admin/admin-landing" element={<Landing />} />
        <Route path="/admin/promo-codes" element={<PromoCode />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
