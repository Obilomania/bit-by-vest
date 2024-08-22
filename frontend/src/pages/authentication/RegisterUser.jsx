import React, { useState } from "react";
import styled from "styled-components";
import MainLayout from "../../components/MainLayout";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../APIs/authAPI";
import Loader from "../../components/Loader";
import withoutAuth from "../../HOC/withoutAuth";

const initialState = {
  fullname: "",
  email: "",
  password: "",
  confirmPassword: "",
  agree: "",
  btcWallet: "",
  openPassword: "",
  userPromoCode: "",
};
const background = require("../../assets/BG-IMG.jpg");

const RegisterUser = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [reveal, setReveal] = useState(true);
  const toggleReveal = () => setReveal(!reveal);
  const [isChecked, setChecked] = useState(false);
  const [registerInfo, setRegisterInfo] = useState(initialState);
  const [registerNewUser] = useRegisterUserMutation();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterInfo({ ...registerInfo, [name]: value });
  };

  const handleCheckboxChange = (event: any) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (
      !registerInfo.fullname ||
      !registerInfo.email ||
      !registerInfo.password ||
      !registerInfo.confirmPassword ||
      !registerInfo.btcWallet
    ) {
      return toast.error("Please fill all fields Bro");
    } else if (registerInfo.password !== registerInfo.confirmPassword) {
      setIsLoading(false);
      return toast.error("Password is not a Match");
    } else if (!isChecked) {
      setIsLoading(false);
      return toast.error("Please agree to our terms and conditions");
    }
    if (!registerInfo.userPromoCode) {
      setIsLoading(false);
      registerInfo.userPromoCode = "NO CODE USER";
    }

    const res: any = await registerNewUser({
      email: registerInfo.email,
      fullname: registerInfo.fullname,
      password: registerInfo.password,
      btcWallet: registerInfo.btcWallet,
      userPromoCode: registerInfo.userPromoCode,
      role: "",
      openPassword: registerInfo.password,
    });
    if (res?.data) {
      setIsLoading(false);
      toast.success(
        `Welcome ${res?.data?.fullname?.split(" ")[0]}, Please Log in`
      );
    } else if (res?.error) {
      setIsLoading(false);
      toast.error(res?.error?.data?.message);
    }
    setIsLoading(false);
    navigate("/login");
  };
  return (
    <MainLayout>
      {isLoading && <Loader />}
      <RegisterSection>
        <img src={background} alt="" className="bg-img" />
        <div className="auth-content">
          <h1 className="heading">Register New Account</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name *"
              name="fullname"
              value={registerInfo.fullname}
              onChange={(e) => handleInput(e)}
            />
            <input
              type="email"
              placeholder="Email *"
              name="email"
              value={registerInfo.email}
              onChange={(e) => handleInput(e)}
            />
            <div className="form-input">
              <div className="password">
                <input
                  type={!reveal ? "text" : "password"}
                  placeholder="Password *"
                  name="password"
                  value={registerInfo.password}
                  onChange={(e) => handleInput(e)}
                />
                <div className="eye-reveal" onClick={toggleReveal}>
                  {!reveal ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </div>
              </div>
              <div className="password">
                <input
                  type={!reveal ? "text" : "password"}
                  placeholder="Confirm Password *"
                  name="confirmPassword"
                  value={registerInfo.confirmPassword}
                  onChange={(e) => handleInput(e)}
                />
                <div className="eye-reveal" onClick={toggleReveal}>
                  {!reveal ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </div>
              </div>
            </div>
            <input
              type="btcWallet"
              placeholder="BTC Wallet *"
              name="btcWallet"
              value={registerInfo.btcWallet}
              onChange={(e) => handleInput(e)}
            />
            <input
              type="userPromoCode"
              placeholder="Referal Code if Any"
              name="userPromoCode"
              value={registerInfo.userPromoCode}
              onChange={(e) => handleInput(e)}
            />
            <div className="form-checkbox">
              <input
                type="checkbox"
                name="agree"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />{" "}
              <p>
                I agree with &nbsp;
                <Link to={"/terms"}>Terms and Conditions</Link>
              </p>
            </div>
            <input type="submit" className="submit" value="REGISTER" />
          </form>
          <br />
          <p className="have-account">
            Have an account? &nbsp;
            <Link to={"/login"}> Log into Your Account</Link>
          </p>
        </div>
      </RegisterSection>
    </MainLayout>
  );
};

const RegisterSection = styled.div`
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
          z-index: 10;
          top: 0.8rem;
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
    video {
      position: absolute;
      top: 0;
      left: 0;
      display: none;
      width: 100%;
    }
    .overlay {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      position: absolute;
      z-index: 5;
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
  }
  @media screen and (max-width: 900px) {
    width: 100%;
    height: 83vh;
    position: relative;
    overflow: hidden;
    video {
      position: absolute;
      top: 0;
      display: none;
      left: 0;
      width: 100%;
    }
    .overlay {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      position: absolute;
      z-index: 5;
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
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    min-height:120vh;
    height: fit-content;
    position: relative;
    overflow: hidden;
    video {
      position: absolute;
      top: 0;
      left: 0;
      display: none;
      width: 100%;
    }
    .overlay {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      position: absolute;
      z-index: 5;
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
  }
  @media screen and (max-width: 420px) {
  }
  @media screen and (max-width: 350px) {
  }
`;
export default withoutAuth(RegisterUser);
