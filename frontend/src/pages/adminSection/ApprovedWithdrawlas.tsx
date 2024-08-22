import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useAdminGetAllApprovedWithdrawalQuery } from "../../APIs/adminAPI";
import { admin_all_approved_withdrawals } from "../../redux/admin/adminSlice";
import Loader from "../../components/Loader";

const ApprovedWithdrawlas = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useAdminGetAllApprovedWithdrawalQuery(null);
  useEffect(() => {
    dispatch(admin_all_approved_withdrawals(data));
  }, [data, dispatch]);

  const approvedWithdrawalList = useSelector(
    (state: any) => state.persistedReducer.admin.approvedWithdrawals
  );
  return (
    <ApprovedDepo>
      {isLoading && <Loader />}
      <div className="admin-content-container">
        <div className="made-table">
          <h2 className="sub-heading">ALL APPROVED WITHDRAWALS</h2>
          <div className="table-heading">
            <li className="order">No</li>
            <li className="row-one">Email</li>
            <li className="row-two">Amount</li>
            <li className="row-three">Status</li>
            <div className="row-four"></div>
          </div>
          {!approvedWithdrawalList || approvedWithdrawalList.length === 0 ? (
            <p className="text-center text-danger mt-2 fw-bold">
              NO APPROVED WITHDRAWAL
            </p>
          ) : (
            <>
              {approvedWithdrawalList.map((withdraw: any, index: any) => (
                <div className="table-body" key={withdraw._id}>
                  <li className="order">{index + 1}</li>
                  <li className="row-body-one">{withdraw?.user?.email}</li>
                  <li className="row-body-two">
                    $ {withdraw.amount.toFixed(2)}
                  </li>
                  <li className="row-body-three text-success">SUCCESSFUL</li>
                  {/* <div className="row-body-four">
                    <button className="approve-btn">APPROVE</button>
                    <button className="delete-btn">DELETE</button>
                  </div> */}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </ApprovedDepo>
  );
};

const ApprovedDepo = styled.div`
  width: 100%;
  list-style: none;
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
        width: 30%;
        border-right: 1px solid var(--primary);
        padding: 0.5rem;
        text-align: center;
        text-transform: uppercase;
        font-weight: 600;
        color: var(--primary);
      }
      .row-two {
        width: 30%;
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
        display: none;
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
        width: 30%;
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
      }
      .row-body-four {
        width: 30%;
        border-right: 1px solid var(--primary);
        padding: 0.5rem;
        text-align: center;
      }
      .row-body-four {
        display: none;
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
export default ApprovedWithdrawlas;
