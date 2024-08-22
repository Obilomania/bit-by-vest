import React, { useState } from "react";
import MainLayout from "../../components/MainLayout";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUserChangePasswordMutation } from "../../APIs/authAPI";
import Loader from "../../components/Loader";

const background = require("../../assets/BG-IMG.jpg");
const ChangePassword = () => {
  const [changeUserPassword, { isLoading }] = useUserChangePasswordMutation();
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
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
    if (
      userInput.oldPassword === "" ||
      userInput.newPassword === "" ||
      userInput.confirmNewPassword === ""
    ) {
      return toast.error("Please fill all Inputs");
    }
    if (userInput.newPassword !== userInput.confirmNewPassword) {
      return toast.error("New Passwords dont match");
    }
    const res: any = await changeUserPassword({ userInput });
    console.log(res)
    if (res?.data) {
      toast.success("Password Changed");
      navigate("/my-profile");
    }
    if (res?.error) {
      toast.error(res?.error?.data?.message);
    }
    return;
  };
  return (
    <MainLayout>
      {isLoading && <Loader />}
      <br />
      <br />
      <ChangePass>
        <img src={background} alt="" className="bg-img" />
        <div className="auth-content">
          <h2 className="heading">CHANGE PASSWORD</h2>
          <form className="profile-info" onSubmit={handleSubmit}>
            <div className="profile-row">
              <input
                type="password"
                placeholder="Enter Old Password"
                name="oldPassword"
                value={userInput?.oldPassword}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="profile-row">
              <input
                type="password"
                placeholder="Enter New Password"
                name="newPassword"
                value={userInput?.newPassword}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="profile-row">
              <input
                type="password"
                placeholder="Confirm New Password"
                name="confirmNewPassword"
                value={userInput?.confirmNewPassword}
                onChange={(e) => handleInputChange(e)}
              />
            </div>{" "}
            <br />
            <div className="call-to-action">
              <Link to={"/dashboard"}>Dashboard</Link>
              <button type="submit">Update Password</button>
            </div>
          </form>
        </div>
      </ChangePass>
    </MainLayout>
  );
};

const ChangePass = styled.div`
  width: 100%;
  position: relative;
  padding: 20rem 10rem;
  font-family: "Poppins", sans-serif;
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
    top: 30%;
    left: 0;
    z-index: 8;
    color: white;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .profile-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 30%;
    border: 1px solid var(--primary);
    padding: 1rem;
    .profile-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1rem 0.1rem 1rem;
      width: 100%;
      border: 1px solid var(--primary);
      color: var(--primary);
      input {
        width: 100%;
        margin-bottom: 0.8rem;
        background: none;
        border: none;
        border-bottom: 1px solid var(--primary);
        padding: 0.5rem;
        outline: none;
        color: var(--primary);
        font-weight: 600;
        &::placeholder {
          color: var(--primary);
          font-weight: 400;
        }
      }
    }
  }
  .call-to-action {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    a,
    button {
      background: var(--primary);
      color: white;
      width: 30%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.3rem 0;
      border: none;
    }
  }
  @media screen and (max-width: 1200px) {
    width: 100%;
    position: relative;
    padding: 20rem 1rem;
    font-family: "Poppins", sans-serif;
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
      top: 30%;
      left: 0;
      z-index: 8;
      color: white;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .profile-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 90%;
      border: 1px solid var(--primary);
      padding: 1rem;
      .profile-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 1rem 0.1rem 1rem;
        width: 100%;
        border: 1px solid var(--primary);
        color: var(--primary);
        .type-name {
          font-weight: bolder;
        }
      }
    }
    .call-to-action {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      a {
        background: var(--primary);
        color: white;
        width: 25%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.3rem 0;
        font-size: 0.8rem;
      }
    }
  }
  @media screen and (max-width: 900px) {
    width: 100%;
    position: relative;
    padding: 20rem 1rem;
    font-family: "Poppins", sans-serif;
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
      top: 30%;
      left: 0;
      z-index: 8;
      color: white;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .profile-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 90%;
      border: 1px solid var(--primary);
      padding: 1rem;
      .profile-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 1rem 0.1rem 1rem;
        width: 100%;
        border: 1px solid var(--primary);
        color: var(--primary);
        .type-name {
          font-weight: bolder;
        }
      }
    }
    .call-to-action {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      a {
        background: var(--primary);
        color: white;
        width: 25%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.3rem 0;
        font-size: 0.8rem;
      }
    }
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    position: relative;
    padding: 20rem 1rem;
    font-family: "Poppins", sans-serif;
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
      top: 30%;
      left: 0;
      z-index: 8;
      color: white;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .profile-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 90%;
      border: 1px solid var(--primary);
      padding: 1rem;
      .profile-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 1rem 0.1rem 1rem;
        width: 100%;
        border: 1px solid var(--primary);
        color: var(--primary);
        .type-name {
          font-weight: bolder;
        }
      }
    }
    .call-to-action {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      a {
        background: var(--primary);
        color: white;
        width: 25%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.3rem 0;
        font-size: 0.8rem;
      }
    }
  }
  @media screen and (max-width: 420px) {
    width: 100%;
    position: relative;
    padding: 20rem 1rem;
    font-family: "Poppins", sans-serif;
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
      top: 30%;
      left: 0;
      z-index: 8;
      color: white;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .profile-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 90%;
      border: 1px solid var(--primary);
      padding: 1rem;
      .profile-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        padding: 1rem 1rem 0.1rem 1rem;
        width: 100%;
        border: 1px solid var(--primary);
        color: var(--primary);
        .type-name {
          font-weight: bolder;
        }
      }
    }
    .call-to-action {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      a {
        background: var(--primary);
        color: white;
        width: 30%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.2rem 0;
        font-size: 0.8rem;
      }
    }
  }
  @media screen and (max-width: 350px) {
  }
`;
export default ChangePassword;
