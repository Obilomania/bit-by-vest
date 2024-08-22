import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  useBlockUserMutation,
  useGetAllApplicationUserQuery,
  useUnBlockUserMutation,
} from "../../APIs/adminAPI";
import {
  all_app_application_users,
  view_selected_user_ID,
} from "../../redux/admin/adminSlice";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";

const AllAppUserList = ({ revealuserPop }: any) => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAllApplicationUserQuery(null);
  const [blockAppUser] = useBlockUserMutation();
  const [unBlockAppUser] = useUnBlockUserMutation();
  useEffect(() => {
    dispatch(all_app_application_users(data));
  },[data, dispatch])
  const allUsersList: [] = useSelector(
    (state: any) => state.persistedReducer.admin.allApplicationUsers
  );

  const revealTheUser = (id: any) => {
    dispatch(view_selected_user_ID(id));
    revealuserPop();
  };

  const blockUser = async (_id: any) => {
    const block: any = await blockAppUser(_id);
    if (block?.data) {
      return toast.success("User Blocked");
    } else if (block.error) {
      return toast.error(block?.error?.data?.message);
    }
  };

  const unblockUser = async (_id: any) => {
    const unBlock: any = await unBlockAppUser(_id)
     if (unBlock?.data) {
       return toast.success("User Un-Blocked");
     } else if (unBlock.error) {
       return toast.error(unBlock?.error?.data?.message);
     }
  };
  return (
    <AppUsers>
      {isLoading && <Loader />}
      <div className="admin-content-container">
        <div className="made-table">
          <h2 className="sub-heading">ALL APPLICATION USERS</h2>
          <div className="table-heading">
            <li className="order">No</li>
            <li className="row-one">Email</li>
            <li className="row-two">Full - Name</li>
            <li className="row-three">Status</li>
            <div className="row-four"></div>
          </div>
          {allUsersList?.map((user: any, index: any) => (
            <div className="table-body" key={user?._id}>
              <li className="order">{index + 1}</li>
              <li className="row-body-one">{user?.email}</li>
              <li className="row-body-two">{user?.fullname}</li>
              <div className="row-body-four">
                <button
                  className="view-btn"
                  onClick={() => revealTheUser(user?._id)}
                >
                  VIEW
                </button>
                {user.isBlocked ? (
                  <button
                    className="approve-btn"
                    onClick={() => unblockUser(user?._id)}
                  >
                    UN-BLOCK
                  </button>
                ) : (
                  <button
                    className="delete-btn"
                    onClick={() => blockUser(user?._id)}
                  >
                    BLOCK
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppUsers>
  );
};

const AppUsers = styled.div`
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
        display: none;
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
        display: none;
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
        .view-btn {
          background: var(--primary);
          border: none;
          width: 30%;
          color: white;
        }
      }
    }
  }
`;
export default AllAppUserList;
