import React, { useState } from "react";
import MainLayout from "../../components/MainLayout";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useLoginUserMutation } from "../../APIs/authAPI";
import { jwtDecode } from "jwt-decode";
import { UserInformationInterface } from "../../interfaces/userInfoInterface";
import {
  current_user_block_status,
  current_user_btcWallet,
  current_user_email,
  current_user_fullname,
  current_user_ID,
  current_user_login_status,
  current_user_promo_code,
  current_user_role,
} from "../../redux/authentication/authSlice";
import Loader from "../../components/Loader";
import withoutAuth from "../../HOC/withoutAuth";

const background = require("../../assets/BG-IMG.jpg");
const LoginUser = () => {
  const [loginUser,{isLoading}] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.email === "" || userInput.password === "") {
      return toast.error("Please fill all Inputs");
    }
    const response: any = await loginUser({
      email: userInput.email,
      password: userInput.password,
    });
    if (response?.data?.isBlocked) {
      return toast.error("User Blocked, Contact Admin");
    }
    if (response?.data) {
      toast.success("Login Succesfull");
      const { token } = response?.data;
      const {
        fullname,
        email,
        role,
        id,
        btcWallet,
        isBlocked,
        promoCode,
      }: UserInformationInterface = jwtDecode(token);
      dispatch(current_user_fullname(fullname));
      dispatch(current_user_email(email));
      dispatch(current_user_ID(id));
      dispatch(current_user_btcWallet(btcWallet));
      dispatch(current_user_login_status(true));
      dispatch(current_user_role(role));
      dispatch(current_user_promo_code(promoCode));
      dispatch(current_user_block_status(isBlocked));
      localStorage.setItem("userRole", role)
      localStorage.setItem("userName", fullname)
      
      navigate("/dashboard");
    } else if (response?.error) {
      return toast.error(response?.error?.data?.message);
    }
    navigate("/dashboard");
  };

  return (
    <MainLayout>
      {isLoading && <Loader />}
      <LoginPage>
        <img src={background} alt="" className="bg-img" />
        <div className="auth-content">
          <h1 className="heading">Sign Into Your Account</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email *"
              name="email"
              value={userInput?.email}
              onChange={(e) => handleInputChange(e)}
            />
            <input
              type="password"
              placeholder="Password *"
              name="password"
              value={userInput.password}
              onChange={(e) => handleInputChange(e)}
            />
            <input type="submit" className="submit" value="LOGIN" />
          </form>
          <br />
          <div className="dont-have">
            <p className="have-account">
              Forgot Password? &nbsp;
              <Link to={"/resetpassword"}>Click Here</Link>
            </p>
            <p className="have-account">
              Dont have an account? &nbsp;
              <Link to={"/register"}> Register New Account</Link>
            </p>
          </div>
        </div>
      </LoginPage>
    </MainLayout>
  );
};

const LoginPage = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  padding: 10vh 10rem;
  .bg-img {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
  }
  .auth-content {
    position: absolute;
    top: 20%;
    left: 0;
    z-index: 8;
    color: white;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    form {
      width: 40%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: start;
      gap: 1rem;
      .password {
        width: 100%;
        position: relative;
        .eye-reveal {
          position: absolute;
          top: 0.5rem;
          right: 1rem;
          cursor: pointer;
        }
      }
      .submit {
        background: var(--primary);
        color: white;
        font-weight: 500;
        letter-spacing: 1px;
        border: 1px solid var(--primary);
        transition: var(--transition);
        &:hover {
          border: 1px solid var(--primary);
          color: var(--primary);
          background: none;
        }
      }
      .form-input {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        width: 100%;
      }
      input {
        width: 100%;
        padding: 0.5rem;
        background: transparent;
        border: 1px solid var(--primary);
        color: var(--primary);
        outline: none;
        &::placeholder {
          color: var(--primary);
        }
      }
      .form-checkbox {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: start;
        gap: 1rem;
        font-weight: 500;
        input {
          width: fit-content;
        }
        p {
          width: 100%;
          margin-top: 0.9rem;
          a {
            text-decoration: none;
            color: var(--primary);
            font-weight: 600;
          }
        }
      }
    }
  }
  .dont-have {
    display: flex;
    width: 40%;
    align-items: center;
    justify-content: space-between;
  }
  .have-account a {
    text-decoration: none;
    color: var(--primary);
    font-weight: 600;
  }
  @media screen and (max-width: 1200px) {
    width: 100%;
    height: 83vh;
    position: relative;
    overflow: hidden;
    .auth-content {
      position: absolute;
      top: 20%;
      left: 0;
      z-index: 8;
      color: white;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0 1rem;
      form {
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
        gap: 1rem;
        .password {
          width: 100%;
          position: relative;
          .eye-reveal {
            position: absolute;
            top: 0.5rem;
            right: 1rem;
            cursor: pointer;
          }
        }
        .submit {
          background: var(--primary);
          color: white;
          font-weight: 500;
          letter-spacing: 1px;
          border: 1px solid var(--primary);
          transition: var(--transition);
          &:hover {
            border: 1px solid var(--primary);
            color: var(--primary);
            background: none;
          }
        }
        .form-input {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
        }
        input {
          width: 100%;
          padding: 0.5rem;
          background: transparent;
          border: 1px solid var(--primary);
          color: white;
        }
        .form-checkbox {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: start;
          gap: 1rem;
          font-weight: 500;
          input {
            width: fit-content;
          }
          p {
            width: 100%;
            margin-top: 0.9rem;
            a {
              text-decoration: none;
              color: var(--primary);
              font-weight: 600;
            }
          }
        }
      }
    }
    .dont-have {
      display: flex;
      width: 100%;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  @media screen and (max-width: 900px) {
    width: 100%;
    height: 83vh;
    position: relative;
    overflow: hidden;
    .auth-content {
      position: absolute;
      top: 20%;
      left: 0;
      z-index: 8;
      color: white;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0 1rem;
      form {
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
        gap: 1rem;
        .password {
          width: 100%;
          position: relative;
          .eye-reveal {
            position: absolute;
            top: 0.5rem;
            right: 1rem;
            cursor: pointer;
          }
        }
        .submit {
          background: var(--primary);
          color: white;
          font-weight: 500;
          letter-spacing: 1px;
          border: 1px solid var(--primary);
          transition: var(--transition);
          &:hover {
            border: 1px solid var(--primary);
            color: var(--primary);
            background: none;
          }
        }
        .form-input {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
        }
        input {
          width: 100%;
          padding: 0.5rem;
          background: transparent;
          border: 1px solid var(--primary);
          color: white;
        }
        .form-checkbox {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: start;
          gap: 1rem;
          font-weight: 500;
          input {
            width: fit-content;
          }
          p {
            width: 100%;
            margin-top: 0.9rem;
            a {
              text-decoration: none;
              color: var(--primary);
              font-weight: 600;
            }
          }
        }
      }
    }
    .dont-have {
      display: flex;
      width: 100%;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    height: 83vh;
    position: relative;
    overflow: hidden;

    .auth-content {
      position: absolute;
      top: 20%;
      left: 0;
      z-index: 8;
      color: white;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0 1rem;
      form {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
        gap: 1rem;
        .password {
          width: 100%;
          position: relative;
          .eye-reveal {
            position: absolute;
            top: 0.5rem;
            right: 1rem;
            cursor: pointer;
          }
        }
        .submit {
          background: var(--primary);
          color: white;
          font-weight: 500;
          letter-spacing: 1px;
          border: 1px solid var(--primary);
          transition: var(--transition);
          &:hover {
            border: 1px solid var(--primary);
            color: var(--primary);
            background: none;
          }
        }
        .form-input {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
        }
        input {
          width: 100%;
          padding: 0.5rem;
          background: transparent;
          border: 1px solid var(--primary);
          color: white;
        }
        .form-checkbox {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: start;
          gap: 1rem;
          font-weight: 500;
          input {
            width: fit-content;
          }
          p {
            width: 100%;
            margin-top: 0.9rem;
            a {
              text-decoration: none;
              color: var(--primary);
              font-weight: 600;
            }
          }
        }
      }
    }
    .dont-have {
      display: flex;
      width: 100%;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  @media screen and (max-width: 420px) {
  }
  @media screen and (max-width: 350px) {
  }
`;
export default withoutAuth(LoginUser);
