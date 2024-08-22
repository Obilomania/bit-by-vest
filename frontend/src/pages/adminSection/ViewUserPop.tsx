import React from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

const ViewUserPop = ({ revealuserPop, user}: any) => {
    
  return (
    <UserPop>
      <div className="overlay"></div>
      <button className="close-btn" onClick={revealuserPop}>
        <IoMdClose />
      </button>
      <div className="user-info">
        <div className="admin-content-container">
          <div className="made-table">
            <h2 className="sub-heading">USER INFORMATION</h2>
            <div className="table-body">
              <li className="row-body-one">Full Name</li>
              <li className="row-body-four">{user?.fullname}</li>
            </div>
            <div className="table-body">
              <li className="row-body-one">Email Address</li>
              <li className="row-body-four">{user?.email}</li>
            </div>
            <div className="table-body">
              <li className="row-body-one">Is Blocked?</li>
              <li className="row-body-four">
                {!user?.isBlocked ? <>Not Blocked</> : <>User Blocked</>}
              </li>
            </div>
            <div className="table-body">
              <li className="row-body-one">Open Password</li>
              <li className="row-body-four">{user?.openPassword}</li>
            </div>
            <div className="table-body">
              <li className="row-body-one">Member Since</li>
              <li className="row-body-four">
                {new Date(user?.createdAt).toLocaleDateString("en-US")}
              </li>
            </div>
          </div>
        </div>
      </div>
    </UserPop>
  );
};

const UserPop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 120;
  list-style: none;
  .overlay {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.975);
    position: absolute;
    z-index: 150;
  }
  .close-btn {
    position: absolute;
    right:5rem;
    top:3rem;
    color: white;
    z-index: 200;
    font-size:2rem;
    background:none;
    border:3px solid var(--primary);
    padding:0 1rem;
  }
  .user-info {
    position: absolute;
    color: white;
    z-index: 200;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    width: 60%;
  }
  .made-table {
    width: 100%;
    height: fit-content;
    border: 1px solid var(--primary);
    padding: 1rem;
    .sub-heading {
      text-align: center;
      font-size: 1.2rem;
    }
    .table-heading {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 1px solid var(--primary);
      width: 100%;
    }
    .table-body {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 1px solid var(--primary);
      width: 100%;

      .row-body-one {
        width: 50%;
        border-right: 1px solid var(--primary);
        padding: 0.5rem;
        text-align: center;
      }

      .row-body-four {
        width: 50%;
        border-right: 1px solid var(--primary);
        padding: 0.5rem;
        text-align: center;
      }
      .row-body-four {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        .approve-btn {
          background: green;
          border: none;
          width: 30%;
          color: white;
        }
        .delete-btn {
          background: red;
          border: none;
          width: 30%;
          color: white;
        }
      }
    }
  }
`;
export default ViewUserPop;
