import MainLayout from "../components/MainLayout";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import withAuth from "../HOC/withAuth";
import useRedirectLoggedOutUser from "../customHooks/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import {
  useGetallUserDepositQuery,
  useGetAllUserWithdrawalsQuery,
  useGetUserAccountBalanceQuery,
  useGetUserLastDepositAmountQuery,
  useGetUserLastWithdrawAmountQuery,
  useGetUserPendingDepositAmountQuery,
  useGetUserPendingWithdrawAmountQuery,
  useGetUserTotalDepositAmountQuery,
  useGetUserWithdrawTotalAmountQuery,
} from "../APIs/userTransactionsAPI";
import {
  resetUserTransactions,
  user_account_balance,
  user_deposit_list,
  user_deposit_total_amount,
  user_last_deposit_amount,
  user_last_withdrawal_amount,
  user_pending_ddeposit_amount,
  user_pending_withdrawal_total,
  user_withdrawal_list,
  user_withdrawal_total_amount,
} from "../redux/usertransaction/userTransactionSlice";
import { logoutUser } from "../helpers/AuthFetch";
import { resetUserState } from "../redux/authentication/authSlice";
import { resetPromoCodes } from "../redux/admin/adminSlice";
import store from "../redux/store";

const background = require("../assets/BG-IMG.jpg");

const UserDashboard = () => {
  useRedirectLoggedOutUser("/login");
  const userFullname = localStorage.getItem("userName");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadTime = setTimeout(() => {
      setIsLoading(false);
    }, 3500);
    return () => clearTimeout(loadTime);
  }, []);
const logUserOut = async () => {
  await logoutUser();
  store.dispatch(resetUserTransactions());
  store.dispatch(resetUserState());
  store.dispatch(resetPromoCodes());
  // toast.success("Log Out Succesfull")
  localStorage.clear();
  navigate("/");
};
  //**************FETCH ALL DASHBOARD DATA************** */
  const { data: acountBalanceData } = useGetUserAccountBalanceQuery(null);
  const { data: tolDepoAmount } = useGetUserTotalDepositAmountQuery(null);
  const { data: pendingDepositAmount } =
    useGetUserPendingDepositAmountQuery(null);
  const { data: latestDepositAmt } = useGetUserLastDepositAmountQuery(null);
  const { data: lastWithdrawAmt } = useGetUserLastWithdrawAmountQuery(null);
  const { data: pendingWithdrawAmt } =
    useGetUserPendingWithdrawAmountQuery(null);
  const { data: withdrawTotalAmt } = useGetUserWithdrawTotalAmountQuery(null);
  const { data: userWithdrawList } = useGetAllUserWithdrawalsQuery(null);
  const { data:userDepositList } = useGetallUserDepositQuery(null);

  // ************DISPATCH ALL DATA TO REDUX****************
  useEffect(() => {
    dispatch(user_account_balance(acountBalanceData));
    dispatch(user_deposit_total_amount(tolDepoAmount));
    dispatch(user_pending_ddeposit_amount(pendingDepositAmount));
    dispatch(user_last_deposit_amount(latestDepositAmt));
    dispatch(user_last_withdrawal_amount(lastWithdrawAmt));
    dispatch(user_pending_withdrawal_total(pendingWithdrawAmt));
    dispatch(user_withdrawal_total_amount(withdrawTotalAmt));
    dispatch(user_withdrawal_list(userWithdrawList));
    dispatch(user_deposit_list(userDepositList));
  }, [dispatch, acountBalanceData, tolDepoAmount, pendingDepositAmount, latestDepositAmt, lastWithdrawAmt, pendingWithdrawAmt, withdrawTotalAmt, userWithdrawList, userDepositList]);

  const allTransaction = useSelector(
    (state: any) => state.persistedReducer.transaction
  );
  const {
    userLastDepositAmount,
    userPendingDepositAmount,
    userTotalDepositAmount,
    userAccountBalance,
    userLastWithdrawalAmount,
    userPendingWithdrawalTotal,
    userWithdarwalTotalAmount,
  } = allTransaction;

  return (
    <MainLayout>
      {isLoading && <Loader />}
      <Dashy>
        <img src={background} alt="" className="bg-img" />
        <div className="dashboard-container">
          <div className="user-dashboard-sect">
            <p className="welcome">
              HELLO, <span>&nbsp; {userFullname}</span>
            </p>
            <p className="deposit-gist">
              Only approved deposit will show in balance
            </p>
            <div className="dashboard-row acct-balance">
              <p className="dash-title">BALANCE</p>{" "}
              {/* <p className="semi-colon">:</p> */}
              <div className="dash-value">
                {" "}
                {!userAccountBalance ? (
                  <p>$ 0.00</p>
                ) : (
                  <p> $ {parseFloat(userAccountBalance).toFixed(2)}</p>
                )}
              </div>
            </div>
            <div className="initiate-btns ">
              <Link to={"/new-deposit"} className="initiate-btn">
                DEPOSIT
              </Link>
              <Link to={"/new-withdrawal"} className="initiate-btn">
                WITHDRAW
              </Link>
            </div>
            <div className="initiate-btns ">
              <Link to={"/my-profile"} className="initiate-btn">
                VIEW PROFILE
              </Link>
              <button className="initiate-btn logout" onClick={logUserOut}>
                LOGOUT
              </button>
            </div>
            <button
              className="view-all-trans view-withdraws"
              onClick={() => navigate("/user-transactions")}
            >
              TRANSACTIONS
            </button>
          </div>
          <div className="user-dashboard-sect deposit-things">
            <p className="welcome">DEPOSITS</p>
            <div className="dashboard-row acct-balance">
              <p className="dash-title">TOTAL</p>{" "}
              {/* <p className="semi-colon">:</p> */}
              <div className="dash-value">
                {!userTotalDepositAmount ? (
                  <p>$ 0.00</p>
                ) : (
                  <p>$ {parseFloat(userTotalDepositAmount).toFixed(2)}</p>
                )}
              </div>
            </div>
            <div className="dashboard-row acct-balance">
              <p className="dash-title pending">PENDING</p>{" "}
              {/* <p className="semi-colon">:</p> */}
              <div className="dash-value ">
                {!userPendingDepositAmount ? (
                  <p>$ 0.00</p>
                ) : (
                  <p>$ {parseFloat(userPendingDepositAmount).toFixed(2)}</p>
                )}
              </div>
            </div>
            <div className="dashboard-row acct-balance">
              <p className="dash-title">LATEST</p>{" "}
              {/* <p className="semi-colon">:</p> */}
              <div className="dash-value">
                {" "}
                {!userLastDepositAmount ? (
                  <p>$ 0.00</p>
                ) : (
                  <p>$ {parseFloat(userLastDepositAmount).toFixed(2)}</p>
                )}
              </div>
            </div>
            {/* <button className="view-all-trans">VIEW DEPOSITS</button> */}
          </div>
          <div className="user-dashboard-sect withdrawal-things">
            <p className="welcome">WITHDRAWALS</p>
            <div className="dashboard-row acct-balance">
              <p className="dash-title">TOTAL</p>{" "}
              {/* <p className="semi-colon">:</p> */}
              <div className="dash-value">
                {!userWithdarwalTotalAmount ? (
                  <p>$ 0.00</p>
                ) : (
                  <p>$ {parseFloat(userWithdarwalTotalAmount).toFixed(2)}</p>
                )}
              </div>
            </div>
            <div className="dashboard-row acct-balance">
              <p className="dash-title pending">PENDING</p>{" "}
              {/* <p className="semi-colon">:</p> */}
              <div className="dash-value">
                {" "}
                {!userPendingWithdrawalTotal ? (
                  <p>$ 0.00</p>
                ) : (
                  <p>$ {parseFloat(userPendingWithdrawalTotal).toFixed(2)}</p>
                )}
              </div>
            </div>
            <div className="dashboard-row acct-balance">
              <p className="dash-title">LATEST</p>{" "}
              {/* <p className="semi-colon">:</p> */}
              <div className="dash-value">
                {" "}
                {!userLastWithdrawalAmount ? (
                  <p>$ 0.00</p>
                ) : (
                  <p>$ {parseFloat(userLastWithdrawalAmount).toFixed(2)}</p>
                )}
              </div>
            </div>
            {/* <button className="view-all-trans">VIEW WITHDRAWALS</button> */}
          </div>
        </div>
      </Dashy>
    </MainLayout>
  );
};
const Dashy = styled.div`
  width: 100%;
  height: fit-content;
  overflow: hidden;
  position: relative;
  padding: 10vh 10rem;
  color: rgb(255, 255, 255);
  .bg-img {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
  }
  .deposit-gist {
    margin-top: -4.4rem;
    margin-bottom: -1.5rem;
    font-size: 0.7rem;
    color: red;
    font-weight: bold;
  }
  .dashboard-container {
    position: relative;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.2);
    height: 100%;
    margin-top: 2rem;
    display: flex;
    align-items: start;
    justify-content: space-between;
  }
  .welcome {
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    width: 100%;
    text-align: center;
    padding: 1rem 0;
    font-size: 1.5rem;
    font-weight: 600;
    font-family: "Poppins", sans-serif;
    span {
      color: var(--primary);
    }
  }
  .user-dashboard-sect {
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;
    gap: 2rem;
    width: 31%;
    height: 70%;
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 2rem;
    .dashboard-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
    .acct-balance {
      font-size: 1.5rem;
      font-weight: 600;
      .semi-colon {
        display: block;
      }
      .dash-title {
        width: 50%;
        color: var(--primary);
      }
    }
    .view-withdraws {
      margin-top: 1.5rem;
    }
  }
  .initiate-btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    a {
      background: var(--primary);
      color: white;
      width: 40%;
      text-align: center;
      padding: 0.5rem 0;
      letter-spacing: 1px;
      transition: var(--transition);
      &:hover {
        transition: var(--transition);
        background: var(--very-light);
      }
    }
    .logout {
      background: red;
      &:hover {
        transition: var(--transition);
        background: #f57878;
      }
    }
    button {
      background: var(--primary);
      color: white;
      width: 40%;
      text-align: center;
      padding: 0.5rem 0;
      letter-spacing: 1px;
      border: none;
      transition: var(--transition);
      &:hover {
        transition: var(--transition);
        background: var(--very-light);
      }
    }
  }
  .view-all-trans {
    background: var(--primary);
    color: white;
    width: 100%;
    text-align: center;
    padding: 0.5rem 0;
    letter-spacing: 1px;
    border: none;
    transition: var(--transition);
    &:hover {
      transition: var(--transition);
      background: var(--very-light);
    }
  }
  .pending {
    color: yellow;
  }

  @media screen and (max-width: 1320px) {
    width: 100%;
    height: fit-content;
    position: relative;
    padding: 4rem 1rem;
    color: rgb(255, 255, 255);
    .bg-img {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
    }
    .deposit-gist {
      margin-top: 0rem;
      margin-bottom: 0rem;
      font-size: 0.7rem;
      color: red;
      font-weight: bold;
    }
    .dashboard-container {
      position: relative;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.2);
      height: 100%;
      margin-top: 2rem;
      display: flex;
      align-items: start;
      justify-content: space-between;
    }
    .welcome {
      border-top: 1px solid rgba(255, 255, 255, 0.3);
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      width: 100%;
      text-align: center;
      padding: 1rem 0;
      font-size: 1rem;
      font-weight: 600;
      font-family: "Poppins", sans-serif;
      span {
        color: var(--primary);
      }
    }
    .user-dashboard-sect {
      display: flex;
      align-items: center;
      justify-content: start;
      flex-direction: column;
      gap: 2rem;
      width: 31%;
      height: 70%;
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 1rem;
      .dashboard-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }
      .acct-balance {
        font-size: 1rem;
        font-weight: 600;
        .semi-colon {
          display: block;
        }
        .dash-title {
          width: 50%;
          color: var(--primary);
        }
      }
      .view-withdraws {
        margin-top: 0.8rem;
      }
    }
    .initiate-btns {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      .initiate-btn {
        font-size: 0.8rem;
        background: var(--primary);
        color: white;
        width: 45%;
        text-align: center;
        padding: 0.5rem 0;
        letter-spacing: 1px;
        transition: var(--transition);
        &:hover {
          transition: var(--transition);
          background: var(--very-light);
        }
      }
      button {
        background: var(--primary);
        color: white;
        width: 40%;
        text-align: center;
        padding: 0.5rem 0;
        letter-spacing: 1px;
        font-size: 0.8rem;
        border: none;
        transition: var(--transition);
        &:hover {
          transition: var(--transition);
          background: var(--very-light);
        }
      }
    }
    .view-all-trans {
      background: var(--primary);
      color: white;
      width: 100%;
      text-align: center;
      padding: 0.5rem 0;
      letter-spacing: 1px;
      font-size: 0.8rem;
      border: none;
      transition: var(--transition);
      &:hover {
        transition: var(--transition);
        background: var(--very-light);
      }
    }
  }
  @media screen and (max-width: 900px) {
    width: 100%;
    height: fit-content;
    overflow: hidden;
    position: relative;
    padding: 1rem;
    color: rgb(255, 255, 255);
    .bg-img {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
    }
    .deposit-gist {
      margin-top: 0rem;
      margin-bottom: 1rem;
      font-size: 0.7rem;
      color: red;
      font-weight: bold;
    }
    .dashboard-container {
      position: relative;
      padding: 2rem;
      background: rgba(255, 255, 255, 0.2);
      height: fit-content;
      margin-top: 2rem;
      display: flex;
      align-items: start;
      justify-content: space-between;
      flex-direction: column;
      gap: 1rem;
    }
    .welcome {
      border-top: 1px solid rgba(255, 255, 255, 0.3);
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      width: 100%;
      text-align: center;
      padding: 0.5rem 0;
      font-size: 1rem;
      font-weight: 600;
      font-family: "Poppins", sans-serif;
      span {
        color: var(--primary);
      }
    }
    .user-dashboard-sect {
      display: flex;
      align-items: center;
      justify-content: start;
      flex-direction: column;
      gap: 0rem;
      width: 100%;
      height: fit-content;
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 2rem;
      .dashboard-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }
      .acct-balance {
        font-size: 1rem;
        font-weight: 600;
        .semi-colon {
          display: block;
        }
        .dash-title {
          width: 50%;
          color: var(--primary);
        }
      }
      .view-withdraws {
        margin-top: 0rem;
      }
    }
    .initiate-btns {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      .logout {
        margin-bottom: 1rem;
      }
      a {
        background: var(--primary);
        color: white;
        width: 40%;
        text-align: center;
        letter-spacing: 1px;
        padding: 0.2rem 0;
        font-size: 0.8rem;
        margin-bottom: 1rem;
        transition: var(--transition);
        &:hover {
          transition: var(--transition);
          background: var(--very-light);
        }
      }
      button {
        background: var(--primary);
        color: white;
        width: 40%;
        text-align: center;
        letter-spacing: 1px;
        padding: 0.2rem 0;
        font-size: 0.8rem;
        border: none;
        transition: var(--transition);
        &:hover {
          transition: var(--transition);
          background: var(--very-light);
        }
      }
    }
    .view-all-trans {
      background: var(--primary);
      color: white;
      width: 100%;
      text-align: center;
      padding: 0.4rem 0;
      font-size: 0.8rem;
      letter-spacing: 1px;
      border: none;
      transition: var(--transition);
      &:hover {
        transition: var(--transition);
        background: var(--very-light);
      }
    }
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;
    padding: 1rem;
    color: rgb(255, 255, 255);
    .bg-img {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
    }
    .deposit-gist {
      margin-top: 0rem;
      margin-bottom: 0rem;
      font-size: 0.7rem;
      color: red;
      font-weight: bold;
    }
    .dashboard-container {
      position: relative;
      padding: 2rem;
      background: rgba(255, 255, 255, 0.2);
      height: fit-content;
      margin-top: 2rem;
      display: flex;
      align-items: start;
      justify-content: space-between;
      flex-direction: column;
      gap: rem;
    }
    .welcome {
      border-top: 1px solid rgba(255, 255, 255, 0.3);
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      width: 100%;
      text-align: center;
      padding: 0.5rem 0;
      font-size: 1rem;
      font-weight: 600;
      font-family: "Poppins", sans-serif;
      /* margin-bottom: 2rem; */
      span {
        color: var(--primary);
      }
    }
    .user-dashboard-sect {
      display: flex;
      align-items: center;
      justify-content: start;
      flex-direction: column;
      gap: 0rem;
      width: 100%;
      height: 30vh;
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 2rem;
      .dashboard-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }
      .acct-balance {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 2rem 0 1rem 0;
        .semi-colon {
          display: block;
        }
        .dash-title {
          width: 50%;
          color: var(--primary);
        }
      }
      .view-withdraws {
        margin-top: 0rem;
      }
    }
    .initiate-btns {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      .logout {
        margin-bottom: 1rem;
      }
      a {
        background: var(--primary);
        color: white;
        width: 40%;
        text-align: center;
        letter-spacing: 1px;
        padding: 0.2rem 0;
        font-size: 0.8rem;
        margin-bottom: 1rem;
        transition: var(--transition);
        &:hover {
          transition: var(--transition);
          background: var(--very-light);
        }
      }
      button {
        background: var(--primary);
        color: white;
        width: 40%;
        text-align: center;
        letter-spacing: 1px;
        padding: 0.2rem 0;
        font-size: 0.8rem;
        border: none;
        transition: var(--transition);
        &:hover {
          transition: var(--transition);
          background: var(--very-light);
        }
      }
    }
    .view-all-trans {
      background: var(--primary);
      color: white;
      width: 100%;
      text-align: center;
      padding: 0.4rem 0;
      font-size: 0.8rem;
      letter-spacing: 1px;
      border: none;
      transition: var(--transition);
      &:hover {
        transition: var(--transition);
        background: var(--very-light);
      }
    }
  }
  @media screen and (max-width: 1200px) {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;
    padding: 4rem 1rem;
    color: rgb(255, 255, 255);
    .bg-img {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
    }
    .dashboard-container {
      position: relative;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.2);
      height: 100%;
      margin-top: 2rem;
      display: flex;
      align-items: start;
      justify-content: space-between;
    }
    .welcome {
      border-top: 1px solid rgba(255, 255, 255, 0.3);
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      width: 100%;
      text-align: center;
      padding: 1rem 0;
      font-size: 1rem;
      font-weight: 600;
      font-family: "Poppins", sans-serif;
      span {
        color: var(--primary);
      }
    }
    .user-dashboard-sect {
      display: flex;
      align-items: center;
      justify-content: start;
      flex-direction: column;
      gap: 2rem;
      width: 31%;
      height: 70%;
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 1rem;
      .dashboard-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }
      .acct-balance {
        font-size: 1rem;
        font-weight: 600;
        .semi-colon {
          display: block;
        }
        .dash-title {
          width: 50%;
          color: var(--primary);
        }
      }
      .view-withdraws {
        margin-top: 0.8rem;
      }
    }
    .initiate-btns {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      .initiate-btn {
        font-size: 0.8rem;
        background: var(--primary);
        color: white;
        width: 45%;
        text-align: center;
        padding: 0.5rem 0;
        letter-spacing: 1px;
        transition: var(--transition);
        &:hover {
          transition: var(--transition);
          background: var(--very-light);
        }
      }
      button {
        background: var(--primary);
        color: white;
        width: 40%;
        text-align: center;
        padding: 0.5rem 0;
        letter-spacing: 1px;
        font-size: 0.8rem;
        border: none;
        transition: var(--transition);
        &:hover {
          transition: var(--transition);
          background: var(--very-light);
        }
      }
    }
    .view-all-trans {
      background: var(--primary);
      color: white;
      width: 100%;
      text-align: center;
      padding: 0.5rem 0;
      letter-spacing: 1px;
      font-size: 0.8rem;
      border: none;
      transition: var(--transition);
      &:hover {
        transition: var(--transition);
        background: var(--very-light);
      }
    }
  }
  @media screen and (max-width: 900px) {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;
    padding: 1rem;
    color: rgb(255, 255, 255);
    .bg-img {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
    }
    .dashboard-container {
      position: relative;
      padding: 2rem;
      background: rgba(255, 255, 255, 0.2);
      height: fit-content;
      margin-top: 2rem;
      display: flex;
      align-items: start;
      justify-content: space-between;
      flex-direction: column;
      gap: 1rem;
    }
    .welcome {
      border-top: 1px solid rgba(255, 255, 255, 0.3);
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      width: 100%;
      text-align: center;
      padding: 0.5rem 0;
      font-size: 1rem;
      font-weight: 600;
      font-family: "Poppins", sans-serif;
      span {
        color: var(--primary);
      }
    }
    .user-dashboard-sect {
      display: flex;
      align-items: center;
      justify-content: start;
      flex-direction: column;
      gap: 0rem;
      width: 100%;
      height: fit-content;
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 2rem;
      .dashboard-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }
      .acct-balance {
        font-size: 1rem;
        font-weight: 600;
        .semi-colon {
          display: block;
        }
        .dash-title {
          width: 50%;
          color: var(--primary);
        }
      }
      .view-withdraws {
        margin-top: 0rem;
      }
    }
    .initiate-btns {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      .logout {
        margin-bottom: 1rem;
      }
      a {
        background: var(--primary);
        color: white;
        width: 40%;
        text-align: center;
        letter-spacing: 1px;
        padding: 0.2rem 0;
        font-size: 0.8rem;
        margin-bottom: 1rem;
        transition: var(--transition);
        &:hover {
          transition: var(--transition);
          background: var(--very-light);
        }
      }
      button {
        background: var(--primary);
        color: white;
        width: 40%;
        text-align: center;
        letter-spacing: 1px;
        padding: 0.2rem 0;
        font-size: 0.8rem;
        border: none;
        transition: var(--transition);
        &:hover {
          transition: var(--transition);
          background: var(--very-light);
        }
      }
    }
    .view-all-trans {
      background: var(--primary);
      color: white;
      width: 100%;
      text-align: center;
      padding: 0.4rem 0;
      font-size: 0.8rem;
      letter-spacing: 1px;
      border: none;
      transition: var(--transition);
      &:hover {
        transition: var(--transition);
        background: var(--very-light);
      }
    }
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    height: fit-content;
    overflow: hidden;
    position: relative;
    padding: 1rem;
    color: rgb(255, 255, 255);
    .bg-img {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
    }
    .dashboard-container {
      position: relative;
      padding: 2rem;
      background: rgba(255, 255, 255, 0.2);
      height: fit-content;
      margin-top: 2rem;
      display: flex;
      align-items: start;
      justify-content: space-between;
      flex-direction: column;
      gap: 1rem;
    }
    .welcome {
      border-top: 1px solid rgba(255, 255, 255, 0.3);
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      width: 100%;
      text-align: center;
      padding: 0.5rem 0;
      font-size: 1rem;
      font-weight: 600;
      font-family: "Poppins", sans-serif;
      span {
        color: var(--primary);
      }
    }
    /* .dashboard-container .deposit-things,
    .dashboard-container .withdrawal-things {
      display: flex;
      height:30vh;
      line-height:1px;
    } */
    .user-dashboard-sect {
      display: flex;
      align-items: center;
      justify-content: start;
      flex-direction: column;
      gap: 0rem;
      width: 100%;
      height: fit-content;
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 2rem;
      .dashboard-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }
      .acct-balance {
        font-size: 1.5rem;
        font-weight: 600;
        .semi-colon {
          display: block;
        }
        .dash-title {
          width: 50%;
          color: var(--primary);
        }
      }
      .view-withdraws {
        margin-top: 0rem;
      }
    }
    .initiate-btns {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      .logout {
        margin-bottom: 1rem;
      }
      a {
        background: var(--primary);
        color: white;
        width: 40%;
        text-align: center;
        letter-spacing: 1px;
        padding: 0.2rem 0;
        font-size: 0.8rem;
        margin-bottom: 1rem;
        transition: var(--transition);
        &:hover {
          transition: var(--transition);
          background: var(--very-light);
        }
      }
      button {
        background: var(--primary);
        color: white;
        width: 40%;
        text-align: center;
        letter-spacing: 1px;
        padding: 0.2rem 0;
        font-size: 0.8rem;
        border: none;
        transition: var(--transition);
        &:hover {
          transition: var(--transition);
          background: var(--very-light);
        }
      }
    }
    .view-all-trans {
      background: var(--primary);
      color: white;
      width: 100%;
      text-align: center;
      padding: 0.4rem 0;
      font-size: 0.8rem;
      letter-spacing: 1px;
      border: none;
      transition: var(--transition);
      &:hover {
        transition: var(--transition);
        background: var(--very-light);
      }
    }
  }
  @media screen and (max-width: 420px) {
    width: 100%;
    height: fit-content;
    overflow: hidden;
    position: relative;
    padding: 5rem 1rem;
    color: rgb(255, 255, 255);
    .bg-img {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
    }
    .dashboard-container {
      position: relative;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.2);
      height: fit-content;
      margin-top: 1rem;
      display: flex;
      align-items: start;
      justify-content: space-between;
      flex-direction: column;
      gap: 0.5rem;
    }
    .welcome {
      border-top: 1px solid rgba(255, 255, 255, 0.3);
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      width: 100%;
      text-align: center;
      padding: 0.2rem 0;
      font-size: 0.8rem;
      font-weight: 600;
      font-family: "Poppins", sans-serif;
      span {
        color: var(--primary);
      }
    }
    .user-dashboard-sect {
      display: flex;
      align-items: center;
      justify-content: start;
      flex-direction: column;
      gap: 0rem;
      width: 100%;
      height: fit-content;
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 0.5rem 1rem;
      .dashboard-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }
      .acct-balance {
        font-size: 0.8rem;
        font-weight: 600;
        .semi-colon {
          display: block;
        }
        .dash-title {
          width: 50%;
          color: var(--primary);
          font-size: 0.8rem;
        }
      }
      .view-withdraws {
        margin-top: 0rem;
      }
    }
    .initiate-btns {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      .logout {
        margin-bottom: 1rem;
      }
      a {
        background: var(--primary);
        color: white;
        width: 40%;
        text-align: center;
        letter-spacing: 1px;
        padding: 0.2rem 0;
        font-size: 0.7rem;
        margin-bottom: 1rem;
        transition: var(--transition);
        &:hover {
          transition: var(--transition);
          background: var(--very-light);
        }
      }
      button {
        background: var(--primary);
        color: white;
        width: 40%;
        text-align: center;
        letter-spacing: 1px;
        padding: 0.2rem 0;
        font-size: 0.7rem;
        border: none;
        transition: var(--transition);
        &:hover {
          transition: var(--transition);
          background: var(--very-light);
        }
      }
    }
    .view-all-trans {
      background: var(--primary);
      color: white;
      width: 100%;
      text-align: center;
      padding: 0.4rem 0;
      font-size: 0.7rem;
      letter-spacing: 1px;
      border: none;
      transition: var(--transition);
      &:hover {
        transition: var(--transition);
        background: var(--very-light);
      }
    }
  }
  @media screen and (max-width: 350px) {
    width: 100%;
    height: fit-content;
    overflow: hidden;
    position: relative;
    padding: 5rem 1rem;
    color: rgb(255, 255, 255);
    .bg-img {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
    }
    .dashboard-container {
      position: relative;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.2);
      height: 100%;
      margin-top: 1rem;
      display: flex;
      align-items: start;
      justify-content: space-between;
      flex-direction: column;
      gap: 1rem;
    }
    .welcome {
      border-top: 1px solid rgba(255, 255, 255, 0.3);
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      width: 100%;
      text-align: center;
      padding: 0.2rem 0;
      font-size: 0.8rem;
      font-weight: 600;
      font-family: "Poppins", sans-serif;
      span {
        color: var(--primary);
      }
    }
    .user-dashboard-sect {
      display: flex;
      align-items: center;
      justify-content: start;
      flex-direction: column;
      gap: 0rem;
      width: 100%;
      height: 100%;
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 0.5rem 1rem;
      .dashboard-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }
      .acct-balance {
        font-size: 0.8rem;
        font-weight: 600;
        .semi-colon {
          display: block;
        }
        .dash-title {
          width: 50%;
          color: var(--primary);
          font-size: 0.8rem;
        }
      }
      .view-withdraws {
        margin-top: 0rem;
      }
    }
    .initiate-btns {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      .logout {
        margin-bottom: 1rem;
      }
      a {
        background: var(--primary);
        color: white;
        width: 40%;
        text-align: center;
        letter-spacing: 1px;
        padding: 0.2rem 0;
        font-size: 0.7rem;
        margin-bottom: 1rem;
        transition: var(--transition);
        &:hover {
          transition: var(--transition);
          background: var(--very-light);
        }
      }
      button {
        background: var(--primary);
        color: white;
        width: 40%;
        text-align: center;
        letter-spacing: 1px;
        padding: 0.2rem 0;
        font-size: 0.7rem;
        border: none;
        transition: var(--transition);
        &:hover {
          transition: var(--transition);
          background: var(--very-light);
        }
      }
    }
    .view-all-trans {
      background: var(--primary);
      color: white;
      width: 100%;
      text-align: center;
      padding: 0.4rem 0;
      font-size: 0.7rem;
      letter-spacing: 1px;
      border: none;
      transition: var(--transition);
      &:hover {
        transition: var(--transition);
        background: var(--very-light);
      }
    }
  }
`;
export default withAuth(UserDashboard);
