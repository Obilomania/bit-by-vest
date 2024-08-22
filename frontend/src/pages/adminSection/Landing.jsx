import React, { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import PendingDeposits from "./PendingDeposits";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ApprovedDeposit from "./ApprovedDeposit";
import PendingWithdrawals from "./PendingWithdrawals";
import ApprovedWithdrawlas from "./ApprovedWithdrawlas";
import AllAppUserList from "./AllAppUserList";
import toast from "react-hot-toast";
import ViewUserPop from "./ViewUserPop";
import AdminApproveDeposit from "./AdminApproveDeposit";
import withAdminAuth from "../../HOC/withAdminAuth";
import { useSelector } from "react-redux";

const background = require("../../assets/BG-IMG.jpg");

const Landing = () => {
  const navigate = useNavigate();
  const adminThings = useSelector((state) => state.persistedReducer.admin)
  const usersLists = adminThings.allApplicationUsers
  const userId = adminThings.selectedUserToViewID;
  const theclickedUser = usersLists?.find((user) => user._id === userId)
  const [userPop, setUserPop] = useState(false);
  const revealuserPop = () => setUserPop(!userPop);
  const [adminUpdateDeposit, setAdminUpdateDeposit] = useState(false);
  const revealupdateDeposit = () => setAdminUpdateDeposit(!adminUpdateDeposit);
  useEffect(() => {
    const bounceSmallScreen = () => {
      const screenSize = window.innerWidth;
      const computerScreenSize = 1920;
      if (screenSize < computerScreenSize) {
        toast.error("Log into a PC to access this page");
        navigate("/");
      }
      return;
    };
    bounceSmallScreen();
  }, [navigate]);

  return (
    <MainLayout>
      <AdminLanding>
        <img src={background} alt="" className="bg-img" />
        <div className={userPop ? "view-user-pop" : "view-user-pop-close"}>
          <ViewUserPop revealuserPop={revealuserPop} user={theclickedUser} />
        </div>
        <div
          className={
            adminUpdateDeposit
              ? "update-deposit-pop"
              : "update-deposit-pop-close"
          }
        >
          <AdminApproveDeposit revealupdateDeposit={revealupdateDeposit} />
        </div>
        <div className="admin-landing-container">
          <div className="one-component">
            <PendingDeposits revealupdateDeposit={revealupdateDeposit} />
          </div>{" "}
          <br />
          <div className="one-component">
            <ApprovedDeposit />
          </div>
          <br />
          <div className="one-component">
            <PendingWithdrawals />
          </div>{" "}
          <br />
          <div className="one-component">
            <ApprovedWithdrawlas />
          </div>{" "}
          <br />
          <div className="one-component">
            <AllAppUserList revealuserPop={revealuserPop} />
          </div>{" "}
          <br />
          <button
            className="promo-codes"
            onClick={() => navigate("/admin/promo-codes")}
          >
            CLICK HERE FOR PROMO CODE SECTION
          </button>
        </div>
      </AdminLanding>
    </MainLayout>
  );
};

const AdminLanding = styled.div`
  width: 100%;
  height: fit-content;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  padding: 18vh 10rem;
  color: rgb(255, 255, 255);
  .bg-img {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
  }
  .view-user-pop {
    display: block;
  }
  .view-user-pop-close {
    display: none;
  }
  .update-deposit-pop {
    display: block;
  }
  .update-deposit-pop-close {
    display: none;
  }
  .admin-landing-container {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px solid var(--primary);
    padding: 1rem;
  }
  .promo-codes {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    background: var(--primary);
    border: none;
    color: white;
    padding: 1rem 0;
    transition: var(--transition);
    &:hover {
      transition: var(--transition);
      background: var(--very-light);
    }
  }
`;
export default withAdminAuth(Landing);
