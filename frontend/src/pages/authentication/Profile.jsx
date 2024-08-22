import { useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserProfileQuery } from "../../APIs/authAPI";
import Loader from "../../components/Loader";
import {
  current_user_btcWallet,
  current_user_email,
  current_user_fullname,
  current_user_ID,
  current_user_role,
} from "../../redux/authentication/authSlice";

const background = require("../../assets/BG-IMG.jpg");

const Profile = () => {
  const dispatch = useDispatch();
  let { data, isLoading } = useGetUserProfileQuery(null);
  useEffect(() => {
    dispatch(current_user_fullname(data?.fullname));
    dispatch(current_user_email(data?.email));
    dispatch(current_user_ID(data?._id));
    dispatch(current_user_btcWallet(data?.btcWallet));
    dispatch(current_user_role(data?.role));
  }, [
    data?._id,
    data?.btcWallet,
    data?.email,
    data?.fullname,
    data?.role,
    dispatch,
  ]);

  const UserInfo = useSelector(
    (state) => state.persistedReducer.auth
  );
  // console.log(UserInfo)
  const { fullname, email, btcWallet, id } = UserInfo;
  return (
    <MainLayout>
      {isLoading && <Loader />}
      <ProfilePage>
        <img src={background} alt="" className="bg-img" />
        <div className="auth-content">
          <h2 className="heading">MY PROFILE</h2>
          <div className="profile-info">
            <div className="profile-row">
              <p className="type-name">Full Name : </p>
              <p className="type-value"> {fullname}</p>
            </div>
            <div className="profile-row">
              <p className="type-name">Email : </p>
              <p className="type-value"> {email}</p>
            </div>
            <div className="profile-row">
              <p className="type-name">Wallet Address : </p>
              <p className="type-value">{`${btcWallet?.slice(0, 25)}...`}</p>
            </div>{" "}
            <br />
            <div className="call-to-action">
              <Link to={"/dashboard"}>Dashboard</Link>
              <Link to={`/edit-profile/${id}`}>Edit Profile</Link>
            </div>
          </div>
        </div>
      </ProfilePage>
    </MainLayout>
  );
};

const ProfilePage = styled.div`
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
export default Profile;
