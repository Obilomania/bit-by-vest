import React from "react";
import MainLayout from "../components/MainLayout";
import styled from "styled-components";
import { useSelector } from "react-redux";

const background = require("../assets/BG-IMG.jpg");
const AllTransaction = () => {
  const allDeposits = useSelector(
    (state: any) => state.persistedReducer.transaction.userDepositList
  );
  const allWithdrawals = useSelector(
    (state: any) => state.persistedReducer.transaction.userWithdrawalList
  );
  return (
    <MainLayout>
      <Transaction>
        <img src={background} alt="" className="bg-img" />
        <div className="admin-content-container">
          <div className="made-table">
            <h2 className="sub-heading">DEPOSIT HISTORY</h2>
            <div className="table-heading">
              <li className="row-one">Date</li>
              <li className="row-two">Amount</li>
              <li className="row-three">Plan</li>
              <li className="row-three">Status</li>
            </div>
            {allDeposits?.length > 0 ? (
              allDeposits.map((obj: any) => (
                <div className="table-body" key={obj._id}>
                  <li className="row-body-one">{obj?.created}</li>
                  <li className="row-body-two">$ {obj.amount}</li>
                  <li className="row-body-four"> {obj.plan}</li>
                  {obj.isProcessing ? (
                    <li className="row-body-three text-success">APPROVED</li>
                  ) : (
                    <li className="row-body-three ">PENDING</li>
                  )}
                </div>
              ))
            ) : (
              <p className="text-danger text-center fw-bold mt-4">NO DEPOSIT</p>
            )}
          </div>
        </div>{" "}
        <br />
        <div className="admin-content-container">
          <div className="made-table">
            <h2 className="sub-heading">WITHDRAWAL HISTORY</h2>
            <div className="table-heading">
              <li className="row-one">Date</li>
              <li className="row-two">Amount</li>
              <li className="row-three">Status</li>
              <li className="row-three">Wallet</li>
            </div>
            {allWithdrawals?.length > 0 ? (
              allWithdrawals.map((obj: any) => (
                <div className="table-body" key={obj._id}>
                  <li className="row-body-one">{obj.created}</li>
                  <li className="row-body-two">$ {obj.amount}</li>
                  {obj.isProcessing ? (
                    <li className="row-body-three text-success">APPROVED</li>
                  ) : (
                    <li className="row-body-three ">PENDING</li>
                  )}
                  <li className="row-body-four">{`${obj.wallet?.slice(0,15)}...`}</li>
                </div>
              ))
            ) : (
              <p className="text-danger text-center fw-bold mt-4">
                NO WITHDRAWAL
              </p>
            )}
          </div>
        </div>
      </Transaction>
    </MainLayout>
  );
};

const Transaction = styled.div`
  width: 100%;
  height: fit-content;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  padding: 18vh 10rem;
  color: rgb(255, 255, 255);
  list-style: none;
  .bg-img {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
  }
  .made-table {
    width: 100%;
    height: fit-content;
    border: 1px solid var(--primary);
    padding: 1rem;
    position: relative;
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
      .order {
        width: 3%;
        border-right: 1px solid var(--primary);
        padding: 0.5rem;
        text-align: center;
        text-transform: uppercase;
        font-weight: 600;
        color: var(--primary);
      }
      .row-one {
        width: 30%;
        border-right: 1px solid var(--primary);
        padding: 0.5rem;
        text-align: center;
        text-transform: uppercase;
        font-weight: 600;
        color: var(--primary);
      }
      .row-two {
        width: 10%;
        border-right: 1px solid var(--primary);
        padding: 0.5rem;
        text-align: center;
        text-transform: uppercase;
        font-weight: 600;
        color: var(--primary);
      }
      .row-three {
        width: 30%;
        border-right: 1px solid var(--primary);
        padding: 0.5rem;
        text-align: center;
        text-transform: uppercase;
        font-weight: 600;
        color: var(--primary);
      }
      .row-four {
        width: 30%;
        border-right: 1px solid var(--primary);
        padding: 0.5rem;
        text-align: center;
      }
    }
    .table-body {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 1px solid var(--primary);
      width: 100%;
      .order {
        width: 3%;
        border-right: 1px solid var(--primary);
        padding: 0.5rem;
        text-align: center;
      }
      .row-body-one {
        width: 30%;
        border-right: 1px solid var(--primary);
        padding: 0.5rem;
        text-align: center;
      }
      .row-body-two {
        width: 10%;
        border-right: 1px solid var(--primary);
        padding: 0.5rem;
        text-align: center;
      }
      .row-body-three {
        width: 30%;
        border-right: 1px solid var(--primary);
        padding: 0.5rem;
        text-align: center;
        font-weight: 500;
        color: yellow;
      }
      .row-body-four {
        width: 30%;
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

export default AllTransaction;
