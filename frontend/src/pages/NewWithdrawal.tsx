import React, { useState } from "react";
import MainLayout from "../components/MainLayout";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useCreateNewDepositMutation,
  useCreateNewWithdrawalMutation,
} from "../APIs/userTransactionsAPI";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const background = require("../assets/BG-IMG.jpg");
const NewWithdrawal = () => {
  const navigate = useNavigate();
  const [createAFreshDeposit, { isLoading }] = useCreateNewWithdrawalMutation();
  const allUserTransaction = useSelector(
    (state: any) => state.persistedReducer.transaction
  );
  const accountBalance = allUserTransaction.userAccountBalance;
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: any) => {
    const value = event.target.value;
    const numericValue = value.replace(/[^0-9]/g, "");
    setInputValue(numericValue);
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (inputValue === "") {
      toast.error("Please fill in Input");
    }
    const makeWithdrawal: any = await createAFreshDeposit({
      amount: inputValue,
    });
    if (makeWithdrawal?.data) {
      navigate("/dashboard");
      return toast.success("Withdrawal Successful");
    } else if (makeWithdrawal.error) {
      return toast.error(makeWithdrawal?.error?.data?.message);
    }
    navigate("/dashboard");
  };

  
  return (
    <MainLayout>
      {isLoading && <Loader />}
      <NewWith>
        <br />
        <br />
        <img src={background} alt="" className="bg-img" />
        <div className="withdraw-container">
          <h2 className="heading">MAKE A WITHDRAWAL</h2>
          <p className="text-center account-balance">
            Your Account Balance &nbsp;:{" "}
            <span>
              $ {!accountBalance ? <>0.00</> : <> {accountBalance}</>}
            </span>
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Valid Amout"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button>Make Withdrawal</button>
          </form>
        </div>
      </NewWith>
    </MainLayout>
  );
};

const NewWith = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  padding: 20vh 10rem;
  color: rgb(255, 255, 255);
  .bg-img {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
  }
  .withdraw-container {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 1rem;
  }
  .account-balance {
    color: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    span {
      font-size: 1.5rem;
      font-weight: 600;
    }
  }
  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1.5rem;
    width: 40%;
    border: 1px solid var(--primary);
    padding: 1rem;
    margin: auto;
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
  @media screen and (max-width: 1200px) {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;
    padding: 20vh 10rem;
    color: rgb(255, 255, 255);
    .bg-img {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
    }
    .withdraw-container {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 1rem;
    }
    .account-balance {
      color: var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      span {
        font-size: 1rem;
        font-weight: 600;
      }
    }
    form {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 1.5rem;
      width: 80%;
      border: 1px solid var(--primary);
      padding: 1rem;
      margin: auto;
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
  @media screen and (max-width: 900px) {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;
    padding: 20vh 1rem;
    color: rgb(255, 255, 255);
    .bg-img {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
    }
    .withdraw-container {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 1rem;
    }
    .account-balance {
      color: var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      span {
        font-size: 1rem;
        font-weight: 600;
      }
    }
    form {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 1.5rem;
      width: 80%;
      border: 1px solid var(--primary);
      padding: 1rem;
      margin: auto;
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
  @media screen and (max-width: 600px) {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;
    padding: 10vh 1rem;
    color: rgb(255, 255, 255);
    .bg-img {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
    }
    .withdraw-container {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 1rem;
    }
    .account-balance {
      color: var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      span {
        font-size: 1rem;
        font-weight: 600;
      }
    }
    form {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 1.5rem;
      width: 100%;
      border: 1px solid var(--primary);
      padding: 1rem;
      margin: auto;
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
  @media screen and (max-width: 420px) {
  }
  @media screen and (max-width: 350px) {
  }
`;
export default NewWithdrawal;
