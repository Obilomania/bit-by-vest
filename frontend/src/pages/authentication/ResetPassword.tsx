import React from "react";
import styled from "styled-components";
import MainLayout from "../../components/MainLayout";
import { Link } from "react-router-dom";

const background = require("../../assets/BG-IMG.jpg");
const ResetPassword = () => {
  return (
    <MainLayout>
      <br />
      <br />
      <ResetPass>
        <img src={background} alt="" className="bg-img" />
        <div className="auth-content">
          <h2 className="heading">RESET PASSWORD</h2>
          <p className="text-white">
            If reset email doesn`t come to your email after 10 minutes, contact
            support
          </p>
          <form className="profile-info">
            <div className="profile-row">
              <input type="password" placeholder="Enter Your Email Address" />
            </div>

            <br />
            <div className="call-to-action">
              <Link to={"/login"}>Login</Link>
              <button className="submit-btn">Recover Email</button>
            </div>
          </form>
        </div>
      </ResetPass>
    </MainLayout>
  );
};

const ResetPass = styled.div`
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
    a {
      background: var(--primary);
      color: white;
      width: 30%;
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
export default ResetPassword;
