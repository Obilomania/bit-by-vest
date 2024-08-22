import React, { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import toast from "react-hot-toast";
import withAdminAuth from "../../HOC/withAdminAuth";
import {
  useCreatePromoCodeMutation,
  useDeletePromoCodeMutation,
  useGetAllPromoCodesQuery,
} from "../../APIs/adminAPI";
import { useDispatch, useSelector } from "react-redux";
import { all_promo_codes } from "../../redux/admin/adminSlice";
import Loader from "../../components/Loader";

const background = require("../../assets/BG-IMG.jpg");
const PromoCode = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [thePromoCode, setThePromoCode] = useState("");
  const { data, isLoading: getLoading } = useGetAllPromoCodesQuery(null);
  const [createPromoCode, { isLoading }] = useCreatePromoCodeMutation();
  const [deletePromoCode, { isLoading: deleteLoading }] =
    useDeletePromoCodeMutation();

  useEffect(() => {
    if (!getLoading) {
      dispatch(all_promo_codes(data?.allPromoCodes));
    }
  }, [data?.allPromoCodes, dispatch, getLoading]);

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThePromoCode(event.target.value); // Update state when input changes
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (thePromoCode === "") {
      return toast.error("Input Cannot Be Blank");
    }
    const res: any = await createPromoCode({ promoCode: thePromoCode });
    if (res?.data) {
      return toast.success("Promo Code Created");
    } else if (res?.error) {
      return toast.error("There was an error, Please try again");
    }
    setThePromoCode("");
  };

  const deleteAPromoCode = async (_id: any) => {
    const del: any = await deletePromoCode(_id);
    if (del?.data) {
      return toast.success(del?.data?.message);
    } else if (del.error) {
      return toast.error(del?.error?.data?.message);
    }
  };

  const allThePromoCodes = useSelector(
    (state: any) => state.persistedReducer.admin.promoCodes
  );

  return (
    <MainLayout>
      {getLoading || isLoading || deleteLoading ? (
        <Loader />
      ) : (
        <PromoThings>
          <br />
          <br />
          <img src={background} alt="" className="bg-img" />
          <div className="promo-container">
            <form onSubmit={handleSubmit}>
              <p className="sub-heading">CREATE PROMO CODE</p>
              <input
                type="text"
                placeholder="Enter Code here"
                name="thePromoCode"
                value={thePromoCode}
                onChange={handleInputChange}
              />
              <div className="promo-btns">
                <button type="submit">CREATE</button>
                <Link to={"/admin/admin-landing"} type="submit">
                  GO BACK
                </Link>
              </div>
            </form>
            <div className="admin-content-container">
              <div className="made-table">
                <h2 className="sub-heading">PROMO CODES</h2>
                <div className="table-heading">
                  <li className="order">No</li>
                  <li className="row-one">CODE</li>
                  <div className="row-four"></div>
                </div>
                {allThePromoCodes?.map((code: any, index: any) => (
                  <div className="table-body" key={code._id}>
                    <li className="order">{index + 1}</li>
                    <li className="row-body-one">{code?.promoCode}</li>
                    <div className="row-body-four">
                      {code?._id === "66b7f8a279ecbaf9ee9e9e55" ? (
                        <>Default Code</>
                      ) : (
                        <button
                          className="delete-btn"
                          onClick={() => deleteAPromoCode(code?._id)}
                        >
                          DELETE
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PromoThings>
      )}
    </MainLayout>
  );
};

const PromoThings = styled.div`
  width: 100%;
  list-style: none;
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
  .promo-container {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px solid var(--primary);
    padding: 0rem 1rem 1rem 1rem;
  }
  form {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 50%;
    border: 1px solid var(--primary);
    padding: 1rem;
    margin: 1rem auto;
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
    .promo-btns {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      button,
      a {
        background: var(--primary);
        color: white;
        width: 40%;
        text-align: center;
        padding: 0.5rem 0;
        border-radius: 0rem;
        letter-spacing: 1px;
        border: none;
        transition: var(--transition);
        margin-top: 1rem;
        &:hover {
          transition: var(--transition);
          background: var(--very-light);
        }
      }
    }
  }
  .sub-heading {
    color: white;
    font-size: 1.2rem;
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
        width: 70%;
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
        width: 70%;
        border-right: 1px solid var(--primary);
        padding: 0.5rem;
        text-align: center;
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
export default withAdminAuth(PromoCode);
