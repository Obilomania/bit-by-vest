import React, { useState } from "react";
import styled from "styled-components";
import MainLayout from "../../components/MainLayout";
import { Link, useNavigate } from "react-router-dom";
import withAuth from "../../HOC/withAuth";
import { useEditUserProfileMutation } from "../../APIs/authAPI";
import { UserInformationInterface } from "../../interfaces/userInfoInterface";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";

const background = require("../../assets/BG-IMG.jpg");

const EditProfile = () => {
  const navigate = useNavigate();
  const UserInfo: UserInformationInterface = useSelector(
    (state: any) => state.persistedReducer.auth
  );
  const [updateProfile, { isLoading }] = useEditUserProfileMutation();
  const [userInput, setUserInput] = useState({
    fullName: "",
    email: "",
    btcWallet: "",
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

    const res: any = await updateProfile({ userInput });
    if (res?.data) {
      toast.success("Updated")
      navigate("/my-profile")
    }
    if (res?.error) {
      toast.error(res?.error?.data?.message);
    }
    return;
  };
  return (
    <MainLayout>
      {isLoading && <Loader />}
      <EditP>
        <img src={background} alt="" className="bg-img" />
        <div className="auth-content">
          <h2 className="heading">EDIT PROFILE</h2>
          <form className="profile-info" onSubmit={handleSubmit}>
            <div className="profile-row">
              <input
                type="text"
                name="fullName"
                value={userInput.fullName}
                onChange={handleInputChange}
                placeholder={`Edit Full Name,  (${UserInfo?.fullname}) `}
              />
            </div>
            <div className="profile-row">
              <input
                type="email"
                name="email"
                value={userInput?.email}
                onChange={handleInputChange}
                placeholder={`Edit Email,  (${UserInfo?.email}) `}
              />
            </div>
            <div className="profile-row">
              <input
                type="text"
                name="btcWallet"
                value={userInput?.btcWallet}
                onChange={handleInputChange}
                placeholder={`Edit wallet Address,  (${(UserInfo?.btcWallet).slice(
                  0,
                  20
                )}...) `}
              />
            </div>{" "}
            <br />
            <div className="call-to-action">
              <Link to={"/dashboard"}>Dashboard</Link>
              <Link to={`/changePassword/${UserInfo?.id}`}>Edit Password</Link>
              <button className="submit-btn" type="submit">
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </EditP>
    </MainLayout>
  );
};

const EditP = styled.div`
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
          opacity: 0.6;
        }
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
      width: 33%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.3rem 0;
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
        width: fit-content;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.3rem 0.4rem;
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
        padding: 0.3rem 0.4rem;
        font-size: 0.8rem;
      }
    }
  }
  @media screen and (max-width: 350px) {
  }
`;
export default withAuth(EditProfile);
