import React from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

const AdminApproveDeposit = ({ revealupdateDeposit }: any) => {
  return (
    <AdminUpdatePop>
      <div className="overlay"></div>
      <button className="close-btn" onClick={revealupdateDeposit}>
        <IoMdClose />
      </button>
      <div className="user-info">
        <form action="">
          <h2 className="sub-heading">UPDATE USER DEPOSIT</h2>
                  <input type="text" placeholder="Enter Amount" />
                  <button>UPDATE AND PROCESS DEPOSIT</button>
        </form>
      </div>
    </AdminUpdatePop>
  );
};

const AdminUpdatePop = styled.div`
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
    right: 5rem;
    top: 3rem;
    color: white;
    z-index: 200;
    font-size: 2rem;
    background: none;
    border: 3px solid var(--primary);
    padding: 0 1rem;
  }
  .user-info {
    position: absolute;
    color: white;
    z-index: 200;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    width: 40%;
    border: 1px solid var(--primary);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      padding: 1rem;
      border: 1px solid var(--primary);
      width: 100%;
      .sub-heading {
        font-size: 1.2rem;
        color: var(--primary);
      }
      input {
        width: 100%;
        border: 1px solid var(--primary);
        background: none;
        font-size: 1rem;
        padding: 0.5rem;
        color: white;
        outline: none;
        margin-top: 0.5rem;
        &::placeholder {
          color: white;
          opacity: 0.5;
        }
      }
      button {
        background: var(--primary);
        color: white;
        width: 100%;
        text-align: center;
        padding: 0.5rem 0;
        border-radius: 0rem;
        letter-spacing: 1px;
        border: none;
        transition: var(--transition);
        &:hover {
          transition: var(--transition);
          background: var(--very-light);
        }
      }
    }
  }
`;
export default AdminApproveDeposit;
