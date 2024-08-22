import React, { useState } from "react";
import MainLayout from "../components/MainLayout";
import styled from "styled-components";
import { investmentPlans } from "../assets/inestments";
import toast from "react-hot-toast";
import CopyToClipboard from "react-copy-to-clipboard";
import { Link, useNavigate } from "react-router-dom";
import { useCreateNewDepositMutation } from "../APIs/userTransactionsAPI";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";

const background = require("../assets/BG-IMG.jpg");

const NewDeposit = () => {
  const navigate = useNavigate();
  const [createNewDeposit, { isLoading }] = useCreateNewDepositMutation();
  const [thePlans] = useState(investmentPlans);
  const thePlansAfterDeposit = thePlans.filter((p) => p.timeFrame !== "Beginner");

  const [iAmount, setIAmount] = useState("");
  const allUserTransaction = useSelector((state) => state.persistedReducer.transaction)
  const [transaction, setTransaction] = useState("");
  const [selectPlan, setSelectPlan] = useState("");

  const copyClicked = () => {
    toast.success("Wallet Copied to Clipboard");
  };
  const userDepositList = allUserTransaction.userDepositList
  const handleInputChange = (e) => {
    const value = e.target.value;
    // Use a regular expression to remove non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, "");
    setIAmount(numericValue);
  };
  const handleTransaction = (e) => {
    setTransaction(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectPlan(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectPlan === "") {
      return toast.error("Please Select a valid Plan");
    }
    if (!iAmount) {
      return toast.error("Please enter a valid amount");
    }
    if (!transaction) {
      return toast.error("Please enter Blockchain transaction ID");
    }
    if (iAmount < 50) {
      return toast.error("Cant invest less than $50");
    }
    if (
      (selectPlan === "Bronze" && iAmount < 50) ||
      (selectPlan === "Bronze" && iAmount > 300)
    ) {
      return toast.error("Plan doesnt align with Amount");
    }
    if (
      (selectPlan === "Silver" && iAmount > 3500) ||
      (selectPlan === "Silver" && iAmount < 300)
    ) {
      return toast.error("Plan doesnt align with Amount");
    }
    if (
      (selectPlan === "Gold" && iAmount > 7000) ||
      (selectPlan === "Gold" && iAmount < 3500)
    ) {
      return toast.error("Plan doesnt align with Amount");
    }
    if (
      (selectPlan === "Platinum" && iAmount > 25000) ||
      (selectPlan === "Platinum" && iAmount < 7000)
    ) {
      return toast.error("Plan doesnt align with Amount");
    }
    if (selectPlan === "Diamond" && iAmount < 25000) {
      return toast.error("Plan doesnt align with Amount");
    }
    const res = await createNewDeposit({
      amount: iAmount,
      plan: selectPlan,
      transactionID: transaction,
    });
    if (res.data) {
    navigate("/dashboard");
      return toast.success("Deposit Succefull")
    } else if (res.error) {
      return toast.error(res?.error?.data?.message);
    }
    navigate("/dashboard");
  };

  return (
    <MainLayout>
      {isLoading && <Loader />}
      <NewD>
        <br />
        <br />
        <img src={background} alt="" className="bg-img" />
        <div className="trans-container">
          <h2 className="heading">CREATE NEW DEPOSIT</h2>
          <div className="deposit-content">
            <div className="plans">
              {userDepositList.length === 0 ? (
                <>
                  {thePlans?.map((data) => (
                    <div className="the-plan-card" key={data.id}>
                      <p className="plan-title">{data.timeFrame}</p>
                      <p className="plan-timeframe">{data.returns}</p>
                      <p className="plan-range">{data.range}</p>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {thePlansAfterDeposit?.map((data) => (
                    <div className="the-plan-card" key={data.id}>
                      <p className="plan-title">{data.timeFrame}</p>
                      <p className="plan-timeframe">{data.returns}</p>
                      <p className="plan-range">{data.range}</p>
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className="deposit-form">
              <div className="btcWallet-address">
                <p className="walletAddress text-center">
                  bc1qnuusneceu35dzzh3jq8dn0eddq8lc86d9u2u2a
                </p>
                <CopyToClipboard text="bc1qnuusneceu35dzzh3jq8dn0eddq8lc86d9u2u2a">
                  <button onClick={copyClicked}>COPY WALLET ADDRESS</button>
                </CopyToClipboard>
                <p className="btc-only">
                  <b>BITCOIN ONLY </b>
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <br />
                <div className="plan-form">
                  <label>Select Investment Plan:</label>

                  <select value={selectPlan} onChange={handleSelectChange}>
                    <option value="">
                      ----- Choose The Investment Plan of your Choice -----
                    </option>
                    {userDepositList.length === 0 ? (
                      <>
                        <option value="Beginner">Beginner ($50 - $300)</option>
                        <option value="Intermediate">
                          Intermediate ($300 - $7000)
                        </option>
                        <option value="Advanced">
                          Advanced ($700 - $10000)
                        </option>
                        <option value="Premium">
                          Premium ($3000 - $20000)
                        </option>
                        <option value="Ultimate">
                          Ultimate ($20000 - unlimited)
                        </option>
                      </>
                    ) : (
                      <>
                        <option value="Intermediate">
                          Intermediate ($300 - $7000)
                        </option>
                        <option value="Advanced">
                          Advanced ($700 - $10000)
                        </option>
                        <option value="Premium">
                          Premium ($3000 - $20000)
                        </option>
                        <option value="Ultimate">
                          Ultimate ($20000 - unlimited)
                        </option>
                      </>
                    )}
                  </select>
                </div>
                <div className="plan-form">
                  <label>
                    Enter the amount you intend to invest{" "}
                    <span>(Numbers Only)</span> :
                  </label>
                  <input
                    type="text"
                    placeholder="$0.00"
                    name="iAmount"
                    value={iAmount}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div className="plan-form">
                  <label>Transaction ID :</label>
                  <input
                    type="text"
                    placeholder="dsfsdjhkjdbsd78***"
                    name="transaction"
                    value={transaction}
                    onChange={(e) => handleTransaction(e)}
                  />
                </div>

                <div className="form-action">
                  <Link to="/dashboard" className="go-back">
                    &nbsp; GO BACK &nbsp;
                  </Link>
                  <button className="submit" type="submit">
                    INVEST
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </NewD>
    </MainLayout>
  );
};

const NewD = styled.div`
  width: 100%;
  height: 100vh;
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
  .trans-container {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px solid var(--primary);
    padding: 1rem;
  }
  .deposit-content {
    display: flex;
    align-items: start;
    justify-content: space-between;
    width: 100%;
    margin-top: 1rem;
    gap: 1rem;
  }
  .plans {
    border: 1px solid var(--primary);
    padding: 1rem;
    width: 35%;
    height: 100%;
  }
  .the-plan-card {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    border: 1px solid var(--primary);
    line-height: 1rem;
    padding: 1rem;
    font-size: 1rem;
    .plan-title {
      color: var(--primary);
      font-weight: 600;
    }
  }
  .deposit-form {
    border: 1px solid var(--primary);
    padding: 1rem;
    width: 65%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    .btcWallet-address {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      button {
        background: var(--primary);
        border: none;
        color: white;
        padding: 0.2rem 1rem;
      }
    }
  }
  form {
    border: 1px solid var(--primary);
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
    gap: 1.5rem;
    .plan-form {
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
    }
    label {
      color: var(--primary);
      font-weight: 600;
    }
    select,
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
    option {
      background: black;
      border: 1px solid var(--primary);
    }
    .form-action {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-top: 1rem;
      a {
        background: var(--primary);
        color: white;
        width: 20%;
        text-align: center;
        padding: 0.5rem 0;
        border-radius: 0rem;
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
        width: 20%;
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
  @media screen and (max-width: 1200px) {
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
    .trans-container {
      position: relative;
      width: 100%;
      height: 100%;
      border: 1px solid var(--primary);
      padding: 1rem;
    }
    .deposit-content {
      display: flex;
      align-items: start;
      justify-content: space-between;
      flex-direction: column;
      width: 100%;
      margin-top: 1rem;
      gap: 1rem;
    }
    .plans {
      border: 1px solid var(--primary);
      padding: 1rem;
      width: 100%;
      height: 100%;
    }
    .the-plan-card {
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 100%;
      border: 1px solid var(--primary);
      line-height: 0.5rem;
      padding: 0.5rem;
      font-size: 1rem;
      .plan-title {
        color: var(--primary);
        font-weight: 600;
      }
    }
    .deposit-form {
      border: 1px solid var(--primary);
      padding: 1rem;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
      .btcWallet-address {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        button {
          background: var(--primary);
          border: none;
          color: white;
          padding: 0rem 1rem;
          font-size: 0.8rem;
        }
      }
    }
    form {
      border: 1px solid var(--primary);
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      padding: 1rem;
      gap: 1rem;
      .plan-form {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
      }
      label {
        color: var(--primary);
        font-weight: 600;
        font-weight: 0.8rem;
        text-align: center;
      }
      select,
      input {
        width: 100%;
        border: 1px solid var(--primary);
        background: none;
        font-size: 0.8rem;
        padding: 0.2rem;
        color: white;
        outline: none;
        margin-top: 0.5rem;
        &::placeholder {
          color: white;
          opacity: 0.5;
        }
      }
      option {
        background: black;
        border: 1px solid var(--primary);
      }
      .form-action {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-top: 1rem;
        a {
          background: var(--primary);
          color: white;
          width: 40%;
          font-size: 0.8rem;
          text-align: center;
          padding: 0rem 0;
          border-radius: 0rem;
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
          font-size: 0.8rem;
          text-align: center;
          padding: 0rem 0;
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
    .trans-container {
      position: relative;
      width: 100%;
      height: 100%;
      border: 1px solid var(--primary);
      padding: 1rem;
    }
    .deposit-content {
      display: flex;
      align-items: start;
      justify-content: space-between;
      flex-direction: column;
      width: 100%;
      margin-top: 1rem;
      gap: 1rem;
    }
    .plans {
      border: 1px solid var(--primary);
      padding: 1rem;
      width: 100%;
      height: 100%;
    }
    .the-plan-card {
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 100%;
      border: 1px solid var(--primary);
      line-height: 0.5rem;
      padding: 0.5rem;
      font-size: 1rem;
      .plan-title {
        color: var(--primary);
        font-weight: 600;
      }
    }
    .deposit-form {
      border: 1px solid var(--primary);
      padding: 1rem;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
      .btcWallet-address {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        button {
          background: var(--primary);
          border: none;
          color: white;
          padding: 0rem 1rem;
          font-size: 0.8rem;
        }
      }
    }
    form {
      border: 1px solid var(--primary);
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      padding: 1rem;
      gap: 1rem;
      .plan-form {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
      }
      label {
        color: var(--primary);
        font-weight: 600;
        font-weight: 0.8rem;
        text-align: center;
      }
      select,
      input {
        width: 100%;
        border: 1px solid var(--primary);
        background: none;
        font-size: 0.8rem;
        padding: 0.2rem;
        color: white;
        outline: none;
        margin-top: 0.5rem;
        &::placeholder {
          color: white;
          opacity: 0.5;
        }
      }
      option {
        background: black;
        border: 1px solid var(--primary);
      }
      .form-action {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-top: 1rem;
        a {
          background: var(--primary);
          color: white;
          width: 40%;
          font-size: 0.8rem;
          text-align: center;
          padding: 0rem 0;
          border-radius: 0rem;
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
          font-size: 0.8rem;
          text-align: center;
          padding: 0rem 0;
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
    .trans-container {
      position: relative;
      width: 100%;
      height: 100%;
      border: 1px solid var(--primary);
      padding: 1rem;
    }
    .deposit-content {
      display: flex;
      align-items: start;
      justify-content: space-between;
      flex-direction: column;
      width: 100%;
      margin-top: 1rem;
      gap: 1rem;
    }
    .plans {
      border: 1px solid var(--primary);
      padding: 1rem;
      width: 100%;
      height: 100%;
    }
    .the-plan-card {
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 100%;
      border: 1px solid var(--primary);
      line-height: 0.5rem;
      padding: 0.5rem;
      font-size: 1rem;
      .plan-title {
        color: var(--primary);
        font-weight: 600;
      }
    }
    .deposit-form {
      border: 1px solid var(--primary);
      padding: 1rem;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
      .btcWallet-address {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        button {
          background: var(--primary);
          border: none;
          color: white;
          padding: 0rem 1rem;
          font-size: 0.8rem;
        }
      }
    }
    form {
      border: 1px solid var(--primary);
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      padding: 1rem;
      gap: 1rem;
      .plan-form {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
      }
      label {
        color: var(--primary);
        font-weight: 600;
        font-weight: 0.8rem;
        text-align: center;
      }
      select,
      input {
        width: 100%;
        border: 1px solid var(--primary);
        background: none;
        font-size: 0.8rem;
        padding: 0.2rem;
        color: white;
        outline: none;
        margin-top: 0.5rem;
        &::placeholder {
          color: white;
          opacity: 0.5;
        }
      }
      option {
        background: black;
        border: 1px solid var(--primary);
      }
      .form-action {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-top: 1rem;
        a {
          background: var(--primary);
          color: white;
          width: 40%;
          font-size: 0.8rem;
          text-align: center;
          padding: 0rem 0;
          border-radius: 0rem;
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
          font-size: 0.8rem;
          text-align: center;
          padding: 0rem 0;
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
  }
  @media screen and (max-width: 420px) {
    width: 100%;
    height: fit-content;
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
    .trans-container {
      position: relative;
      width: 100%;
      height: 100%;
      border: 1px solid var(--primary);
      padding: 1rem;
    }
    .deposit-content {
      display: flex;
      align-items: start;
      justify-content: space-between;
      flex-direction: column;
      width: 100%;
      margin-top: 1rem;
      gap: 1rem;
    }
    .plans {
      border: 1px solid var(--primary);
      padding: 1rem;
      width: 100%;
      height: 100%;
    }
    .the-plan-card {
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 100%;
      border: 1px solid var(--primary);
      line-height: 0.5rem;
      padding: 0.5rem;
      font-size: 1rem;
      .plan-title {
        color: var(--primary);
        font-weight: 600;
      }
    }
    .deposit-form {
      border: 1px solid var(--primary);
      padding: 1rem;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
      .btcWallet-address {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        button {
          background: var(--primary);
          border: none;
          color: white;
          padding: 0rem 1rem;
          font-size: 0.8rem;
        }
      }
    }
    form {
      border: 1px solid var(--primary);
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      padding: 1rem;
      gap: 1rem;
      .plan-form {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
      }
      label {
        color: var(--primary);
        font-weight: 600;
        font-weight: 0.8rem;
        text-align: center;
      }
      select,
      input {
        width: 100%;
        border: 1px solid var(--primary);
        background: none;
        font-size: 0.8rem;
        padding: 0.2rem;
        color: white;
        outline: none;
        margin-top: 0.5rem;
        &::placeholder {
          color: white;
          opacity: 0.5;
        }
      }
      option {
        background: black;
        border: 1px solid var(--primary);
      }
      .form-action {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-top: 1rem;
        a {
          background: var(--primary);
          color: white;
          width: 40%;
          font-size: 0.8rem;
          text-align: center;
          padding: 0rem 0;
          border-radius: 0rem;
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
          font-size: 0.8rem;
          text-align: center;
          padding: 0rem 0;
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
  }
  @media screen and (max-width: 350px) {
    width: 100%;
    height: fit-content;
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
    .trans-container {
      position: relative;
      width: 100%;
      height: 100%;
      border: 1px solid var(--primary);
      padding: 1rem;
    }
    .deposit-content {
      display: flex;
      align-items: start;
      justify-content: space-between;
      flex-direction: column;
      width: 100%;
      margin-top: 1rem;
      gap: 1rem;
    }
    .plans {
      border: 1px solid var(--primary);
      padding: 1rem;
      width: 100%;
      height: 100%;
    }
    .the-plan-card {
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 100%;
      border: 1px solid var(--primary);
      line-height: 0.5rem;
      padding: 0.5rem;
      font-size: 1rem;
      .plan-title {
        color: var(--primary);
        font-weight: 600;
      }
    }
    .deposit-form {
      border: 1px solid var(--primary);
      padding: 1rem;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
      .btcWallet-address {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        button {
          background: var(--primary);
          border: none;
          color: white;
          padding: 0rem 1rem;
          font-size: 0.8rem;
        }
      }
    }
    form {
      border: 1px solid var(--primary);
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      padding: 1rem;
      gap: 1rem;
      .plan-form {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
      }
      label {
        color: var(--primary);
        font-weight: 600;
        font-weight: 0.8rem;
        text-align: center;
      }
      select,
      input {
        width: 100%;
        border: 1px solid var(--primary);
        background: none;
        font-size: 0.8rem;
        padding: 0.2rem;
        color: white;
        outline: none;
        margin-top: 0.5rem;
        &::placeholder {
          color: white;
          opacity: 0.5;
        }
      }
      option {
        background: black;
        border: 1px solid var(--primary);
      }
      .form-action {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-top: 1rem;
        a {
          background: var(--primary);
          color: white;
          width: 40%;
          font-size: 0.8rem;
          text-align: center;
          padding: 0rem 0;
          border-radius: 0rem;
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
          font-size: 0.8rem;
          text-align: center;
          padding: 0rem 0;
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
  }
`;
export default NewDeposit;
