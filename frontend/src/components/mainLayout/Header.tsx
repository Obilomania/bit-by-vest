import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RxHamburgerMenu } from "react-icons/rx";
import store from "../../redux/store";
import { logoutUser } from "../../helpers/AuthFetch";
import { resetUserTransactions } from "../../redux/usertransaction/userTransactionSlice";
import { resetUserState } from "../../redux/authentication/authSlice";
import { resetPromoCodes } from "../../redux/admin/adminSlice";

const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  const revealNav = () => setOpenNav(!openNav);
  const userRole: any = localStorage.getItem("userRole");
  const userFullname = localStorage.getItem("userName");
  const navigate = useNavigate();

  const logUserOut = async () => {
    await logoutUser();
    store.dispatch(resetUserTransactions());
    store.dispatch(resetUserState());
    store.dispatch(resetPromoCodes());
    // toast.success("Log Out Succesfull")
    localStorage.clear();
    navigate("/");
  };

  if (openNav) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
  return (
    <NavBar>
      <div className="nav-container">
        <Link to={"/"} className="logo">
          BIT<span>by</span>VEST
        </Link>
        <div className={openNav ? "navLinks" : "navClose"} onClick={revealNav}>
          <Link to={"/"}>HOME</Link>
          <Link to={"/about"}>ABOUT</Link>
          <Link to={"/faq"}>FAQs</Link>
          <Link to={"/contact"}>CONTACT</Link>

          {userRole === "Admin" && (
            <>
              <Link to={"/admin/admin-landing"} className="admin-btn auth">
                ADMIN
              </Link>
            </>
          )}
          {userFullname ? (
            <>
              <Link to={"/dashboard"} className="dashy  auth">
                DASHBOARD
              </Link>
              <button onClick={logUserOut} className="logout-btn  auth">
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <Link to={"/login"} className="login auth">
                LOGIN
              </Link>
              <Link to={"/register"} className="registration auth">
                REGISTER
              </Link>
            </>
          )}
        </div>
        <div className="authentication">
          {userRole === "Admin" && (
            <>
              <Link to={"/admin/admin-landing"} className="admin-btn">
                ADMIN
              </Link>
            </>
          )}
          {userFullname ? (
            <>
              <Link to={"/dashboard"} className="dashy">
                DASHBOARD
              </Link>
              <button onClick={logUserOut} className="logout-btn">
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <Link to={"/login"} className="login">
                LOGIN
              </Link>
              <Link to={"/register"} className="registration">
                REGISTER
              </Link>
            </>
          )}
        </div>

        <button className="hamburger" onClick={revealNav}>
          <RxHamburgerMenu />
        </button>
      </div>
    </NavBar>
  );
};

const NavBar = styled.div`
  width: 100%;
  height: 10vh;
  position: absolute;
  z-index: 10;
  padding: 1rem 10rem;
  .logo {
    font-family: "Poppins", sans-serif;
    font-size: 2rem;
    color: var(--primary);
    font-weight: 600;
    text-decoration: none;
    margin-bottom: 1.5rem;
    span {
      font-family: "Edu VIC WA NT Beginner", cursive;
      font-size: 3.3rem;
      font-weight: 400;
      color: white;
    }
  }
  .hamburger {
    display: none;
  }
  .auth {
    display: none;
  }
  .nav-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .navLinks {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5rem;
      a {
        color: var(--primary);
        transition: var(--transition);
        font-weight: 500;
        &:hover {
          transition: var(--transition);
          color: white;
        }
      }
    }
    .navClose {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5rem;
      a {
        color: var(--primary);
        transition: var(--transition);
        font-weight: 500;
        &:hover {
          transition: var(--transition);
          color: white;
        }
      }
    }
    .authentication {
      display: flex;
      align-items: center;
      justify-content: center;
      button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 7rem;
        background: var(--primary);
        color: white;
        padding: 0.2rem 0;
        font-weight: 500;
        border: 1.5px solid var(--primary);
        transition: var(--transition);
        &:hover {
          border: 1.5px solid white;
          transition: var(--transition);
          margin-bottom: 0.5rem;
          background: none;
          color: var(--primary);
        }
      }
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 7rem;
        background: var(--primary);
        color: white;
        padding: 0.2rem 0;
        font-weight: 500;
        border: 1.5px solid var(--primary);
        transition: var(--transition);
        &:hover {
          border: 1.5px solid white;
          transition: var(--transition);
          margin-bottom: 0.5rem;
          background: none;
          color: var(--primary);
        }
      }
      .admin-btn,
      .dashy,
      .logout-btn {
        border: 2px solid white;
      }
    }
  }

  @media screen and (max-width: 1200px) {
    width: 100%;
    height: 10vh;
    position: reltive;
    top: 0;
    left: 0;
    background: black;
    z-index: 100;
    padding: 1rem;
    .logo {
      font-family: "Poppins", sans-serif;
      font-size: 1.5rem;
      color: var(--primary);
      font-weight: 600;
      text-decoration: none;
      span {
        font-family: "Edu VIC WA NT Beginner", cursive;
        font-size: 2.5rem;
        font-weight: 400;
        color: white;
      }
    }
    .hamburger {
      display: flex;
      background: none;
      color: var(--primary);
      border: none;
      font-size: 1.8rem;
      margin-top: 1rem;
      font-weight: 600;
      margin-bottom: 1.8rem;
    }
    .auth {
      display: flex;
    }
    .nav-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .navLinks {
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 10vh;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding: 5rem 0;
        background: rgba(0, 0, 0, 1);
        gap: 5rem;
        transition: var(--transition);
        a {
          color: var(--primary);
          transition: var(--transition);
          font-weight: 500;
          &:hover {
            transition: var(--transition);
            color: white;
          }
        }
      }
      .navClose {
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 10vh;
        left: -100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding: 5rem 0;
        background: rgba(0, 0, 0, 1);
        gap: 5rem;
        transition: var(--transition);
        a {
          color: var(--primary);
          transition: var(--transition);
          font-weight: 500;
          &:hover {
            transition: var(--transition);
            color: white;
          }
        }
      }
      .authentication {
        display: none;
      }
    }
  }
  @media screen and (max-width: 900px) {
    width: 100%;
    height: 10vh;
    position: relative;
    top: 0;
    left: 0;
    background: black;
    z-index: 100;
    padding: 1rem;
    .logo {
      font-family: "Poppins", sans-serif;
      font-size: 1.5rem;
      color: var(--primary);
      font-weight: 600;
      text-decoration: none;
      span {
        font-family: "Edu VIC WA NT Beginner", cursive;
        font-size: 2.5rem;
        font-weight: 400;
        color: white;
      }
    }
    .hamburger {
      display: flex;
      background: none;
      color: var(--primary);
      border: none;
      font-size: 1.8rem;
      margin-top: 1rem;
      font-weight: 600;
      margin-bottom: 1.8rem;
    }
    .auth {
      display: flex;
    }
    .nav-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .navLinks {
        width: 100%;
        height: 100vh;
        position: absolute;
        z-index: 100;
        top: 10vh;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding: 5rem 0;
        background: black;
        gap: 5rem;
        transition: var(--transition);
        a {
          color: var(--primary);
          transition: var(--transition);
          font-weight: 500;
          &:hover {
            transition: var(--transition);
            color: white;
          }
        }
      }
      .navClose {
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 10vh;
        left: -100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding: 5rem 0;
        background: rgba(0, 0, 0, 1);
        gap: 5rem;
        transition: var(--transition);
        a {
          color: var(--primary);
          transition: var(--transition);
          font-weight: 500;
          &:hover {
            transition: var(--transition);
            color: white;
          }
        }
      }
      .authentication {
        display: none;
      }
    }
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    height: 10vh;
    position: relative;
    top: 0;
    left: 0;
    background: black;
    z-index: 100;
    padding: 1rem;
    .logo {
      font-family: "Poppins", sans-serif;
      font-size: 1.5rem;
      color: var(--primary);
      font-weight: 600;
      text-decoration: none;
      z-index: 300;
      span {
        font-family: "Edu VIC WA NT Beginner", cursive;
        font-size: 2.5rem;
        font-weight: 400;
        color: white;
      }
    }
    .hamburger {
      display: flex;
      background: none;
      color: var(--primary);
      border: none;
      font-size: 1.8rem;
      margin-top: 1rem;
      font-weight: 600;
      margin-bottom: 1.8rem;
      z-index: 300;
    }
    .auth {
      display: flex;
    }
    .nav-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .navLinks {
        width: 100%;
        height: 100vh;
        position: fixed;
        z-index: 100;

        top: 0vh;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding: 10rem 0;
        background: black;
        gap: 1rem;
        transition: var(--transition);
        a {
          color: var(--primary);
          transition: var(--transition);
          font-weight: 500;
          &:hover {
            transition: var(--transition);
            color: white;
          }
        }
        .logout-btn {
          background: none;
          color: var(--primary);
          border: 1px solid var(--primary);
          padding: 0.2rem 1.5rem;
        }
      }
      .navClose {
        width: 100%;
        height: 100vh;
        position: fixed;
        top: vh;
        left: -100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding: 5rem 0;
        background: rgba(0, 0, 0, 0.8);
        gap: 5rem;
        transition: var(--transition);
        a {
          color: var(--primary);
          transition: var(--transition);
          font-weight: 500;
          &:hover {
            transition: var(--transition);
            color: white;
          }
        }
      }
      .authentication {
        display: none;
      }
    }
  }
  @media screen and (max-width: 420px) {
    width: 100%;
    height: 10vh;
    position: absolute;
    top: 0;
    left: 0;
    background: black;
    z-index: 100;
    padding: 1rem;
    .logo {
      font-family: "Poppins", sans-serif;
      font-size: 1.5rem;
      color: var(--primary);
      font-weight: 600;
      text-decoration: none;
      z-index: 300;
      span {
        font-family: "Edu VIC WA NT Beginner", cursive;
        font-size: 2.5rem;
        font-weight: 400;
        color: white;
      }
    }
    .hamburger {
      display: flex;
      background: none;
      color: var(--primary);
      border: none;
      font-size: 1.8rem;
      margin-top: 1rem;
      font-weight: 600;
      z-index: 300;
    }
    .auth {
      display: flex;
    }
    .nav-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .navLinks {
        width: 100%;
        height: 100vh;
        position: absolute;
        z-index: 100;
        top: 10vh;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding: 5rem 0;
        background: black;
        gap: 2rem;
        transition: var(--transition);
        a {
          color: var(--primary);
          transition: var(--transition);
          font-weight: 500;
          &:hover {
            transition: var(--transition);
            color: white;
          }
        }
      }
      .navClose {
        width: 100%;
        height: 100vh;
        position: absolute;
        z-index: 100;
        top: 10vh;
        left: -100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding: 5rem 0;
        background: rgba(0, 0, 0, 0.8);
        gap: 5rem;
        transition: var(--transition);
        a {
          color: var(--primary);
          transition: var(--transition);
          font-weight: 500;
          &:hover {
            transition: var(--transition);
            color: white;
          }
        }
      }
      .authentication {
        display: none;
      }
    }
  }
  @media screen and (max-width: 350px) {
    width: 100%;
    height: 10vh;
    position: absolute;
    top: 0;
    left: 0;
    background: black;
    z-index: 100;
    padding: 1rem;
    .logo {
      font-family: "Poppins", sans-serif;
      font-size: 1.5rem;
      color: var(--primary);
      font-weight: 600;
      text-decoration: none;
      z-index: 300;
      span {
        font-family: "Edu VIC WA NT Beginner", cursive;
        font-size: 2.5rem;
        font-weight: 400;
        color: white;
      }
    }
    .hamburger {
      display: flex;
      background: none;
      color: var(--primary);
      border: none;
      font-size: 1.8rem;
      margin-top: 1rem;
      font-weight: 600;
      z-index: 300;
    }
    .auth {
      display: flex;
    }
    .nav-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .navLinks {
        width: 100%;
        height: 100vh;
        position: absolute;
        z-index: 100;
        top: 10vh;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding: 5rem 0;
        background: rgba(0, 0, 0, 0.8);
        gap: 2rem;
        transition: var(--transition);
        a {
          color: var(--primary);
          transition: var(--transition);
          font-weight: 500;
          &:hover {
            transition: var(--transition);
            color: white;
          }
        }
      }
      .navClose {
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 10vh;
        left: -100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding: 5rem 0;
        background: black;
        gap: 5rem;
        transition: var(--transition);
        a {
          color: var(--primary);
          transition: var(--transition);
          font-weight: 500;
          &:hover {
            transition: var(--transition);
            color: white;
          }
        }
      }
      .authentication {
        display: none;
      }
    }
  }
`;
export default Header;
