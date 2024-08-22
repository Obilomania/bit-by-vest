import React, { useState } from "react";
import MainLayout from "../../components/MainLayout";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";




const background = require("../../assets/BG-IMG.jpg");
const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    email: "",
    clientUrl: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // await recoverUserPassword({
    //   email: userInput.email,
    //   clientUrl: "http://localhost:3000/resetpassword",
    // });
    // navigate("/");
    // setIsLoading(false);
  };
  return (
    <MainLayout>
      <Forgot>
        <img src={background} alt="" className="bg-img" />;
        <div className="auth-content">
          <h1 className="heading">RECOVER PASSWORD</h1>
          <p>
            <b>
              If reset email doesn`t come to your email after 10 minutes,
              contact support
            </b>
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter Your Registered Email Address"
              value={userInput.email}
              onChange={(e) => handleInputChange(e)}
              name="email"
            />

            <input type="submit" className="submit" value="RECOVER PASSWORD" />
          </form>{" "}
          <br />
          <Link to="/login" className="back-to-login">
            BACK TO LOGIN
          </Link>
        </div>
      </Forgot>
    </MainLayout>
  );
};

const Forgot = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  padding: 10vh 10rem;
  .bg-img {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
  }
  .back-to-login {
    text-decoration: none;
    width: 40%;
    text-align: center;
    padding: 0.5rem 0;
    background: var(--primary);
    color: white;
    font-weight: 500;
    letter-spacing: 1px;
    border: 1px solid var(--primary);
    transition: var(--transition);
    &:hover {
      border: 1px solid var(--primary);
      color: var(--primary);
      background: none;
    }
  }
  .auth-content {
    position: absolute;
    top: 20%;
    left: 0;
    z-index: 8;
    color: white;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    form {
      width: 40%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: start;
      gap: 1rem;
      .password {
        width: 100%;
        position: relative;
        .eye-reveal {
          position: absolute;
          top: 0.5rem;
          right: 1rem;
          cursor: pointer;
        }
      }
      .submit {
        text-decoration: none;
        width: 100%;
        text-align: center;
        padding: 0.5rem 0;
        background: var(--primary);
        color: white;
        font-weight: 500;
        letter-spacing: 1px;
        border: 1px solid var(--primary);
        transition: var(--transition);
        &:hover {
          border: 1px solid var(--primary);
          color: var(--primary);
          background: none;
        }
      }
      .form-input {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        width: 100%;
      }
      input {
        width: 100%;
        padding: 0.5rem;
        background: transparent;
        border: 1px solid var(--primary);
        color: var(--primary);
        outline: none;
        &::placeholder {
          color: var(--primary);
        }
      }
      .form-checkbox {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: start;
        gap: 1rem;
        font-weight: 500;
        input {
          width: fit-content;
        }
        p {
          width: 100%;
          margin-top: 0.9rem;
          a {
            text-decoration: none;
            color: var(--primary);
            font-weight: 600;
          }
        }
      }
    }
  }
  .dont-have {
    display: flex;
    width: 40%;
    align-items: center;
    justify-content: space-between;
  }
  .have-account a {
    text-decoration: none;
    color: var(--primary);
    font-weight: 600;
  }
  @media screen and (max-width: 1200px) {
    width: 100%;
    height: 80vh;
    position: relative;
    overflow: hidden;
    video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
    .overlay {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      position: absolute;
      z-index: 5;
    }
    .back-to-login {
      text-decoration: none;
      width: 60%;
      text-align: center;
      padding: 0.5rem 0;
      background: var(--primary);
      color: white;
      font-weight: 500;
      letter-spacing: 1px;
      border: 1px solid var(--primary);
      transition: var(--transition);
      &:hover {
        border: 1px solid var(--primary);
        color: var(--primary);
        background: none;
      }
    }
    .auth-content {
      position: absolute;
      top: 20%;
      left: 0;
      z-index: 8;
      color: white;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0 1rem;

      form {
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
        gap: 1rem;
        .password {
          width: 100%;
          position: relative;
          .eye-reveal {
            position: absolute;
            top: 0.5rem;
            right: 1rem;
            cursor: pointer;
          }
        }
        .submit {
          background: var(--primary);
          color: white;
          font-weight: 500;
          letter-spacing: 1px;
          border: 1px solid var(--primary);
          transition: var(--transition);
          &:hover {
            border: 1px solid var(--primary);
            color: var(--primary);
            background: none;
          }
        }
        .form-input {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
        }
        input {
          width: 100%;
          padding: 0.5rem;
          background: transparent;
          border: 1px solid var(--primary);
          color: white;
        }
        .form-checkbox {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: start;
          gap: 1rem;
          font-weight: 500;
          input {
            width: fit-content;
          }
          p {
            width: 100%;
            margin-top: 0.9rem;
            a {
              text-decoration: none;
              color: var(--primary);
              font-weight: 600;
            }
          }
        }
      }
    }
    .dont-have {
      display: flex;
      width: 100%;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  @media screen and (max-width: 900px) {
    width: 100%;
    height: 80vh;
    position: relative;
    overflow: hidden;
    video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
    .overlay {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      position: absolute;
      z-index: 5;
    }
    .back-to-login {
      text-decoration: none;
      width: 60%;
      text-align: center;
      padding: 0.5rem 0;
      background: var(--primary);
      color: white;
      font-weight: 500;
      letter-spacing: 1px;
      border: 1px solid var(--primary);
      transition: var(--transition);
      &:hover {
        border: 1px solid var(--primary);
        color: var(--primary);
        background: none;
      }
    }
    .auth-content {
      position: absolute;
      top: 20%;
      left: 0;
      z-index: 8;
      color: white;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0 1rem;
      form {
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
        gap: 1rem;
        .password {
          width: 100%;
          position: relative;
          .eye-reveal {
            position: absolute;
            top: 0.5rem;
            right: 1rem;
            cursor: pointer;
          }
        }
        .submit {
          background: var(--primary);
          color: white;
          font-weight: 500;
          letter-spacing: 1px;
          border: 1px solid var(--primary);
          transition: var(--transition);
          &:hover {
            border: 1px solid var(--primary);
            color: var(--primary);
            background: none;
          }
        }
        .form-input {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
        }
        input {
          width: 100%;
          padding: 0.5rem;
          background: transparent;
          border: 1px solid var(--primary);
          color: white;
        }
        .form-checkbox {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: start;
          gap: 1rem;
          font-weight: 500;
          input {
            width: fit-content;
          }
          p {
            width: 100%;
            margin-top: 0.9rem;
            a {
              text-decoration: none;
              color: var(--primary);
              font-weight: 600;
            }
          }
        }
      }
    }
    .dont-have {
      display: flex;
      width: 100%;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    height: 80vh;
    position: relative;
    overflow: hidden;
    video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
    .overlay {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      position: absolute;
      z-index: 5;
    }
    .back-to-login {
      text-decoration: none;
      width: 100%;
      text-align: center;
      padding: 0.5rem 0;
      background: var(--primary);
      color: white;
      font-weight: 500;
      letter-spacing: 1px;
      border: 1px solid var(--primary);
      transition: var(--transition);
      &:hover {
        border: 1px solid var(--primary);
        color: var(--primary);
        background: none;
      }
    }
    .auth-content {
      position: absolute;
      top: 20%;
      left: 0;
      z-index: 8;
      color: white;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0 1rem;
      form {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
        gap: 1rem;
        .password {
          width: 100%;
          position: relative;
          .eye-reveal {
            position: absolute;
            top: 0.5rem;
            right: 1rem;
            cursor: pointer;
          }
        }
        .submit {
          background: var(--primary);
          color: white;
          font-weight: 500;
          letter-spacing: 1px;
          border: 1px solid var(--primary);
          transition: var(--transition);
          &:hover {
            border: 1px solid var(--primary);
            color: var(--primary);
            background: none;
          }
        }
        .form-input {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
        }
        input {
          width: 100%;
          padding: 0.5rem;
          background: transparent;
          border: 1px solid var(--primary);
          color: white;
        }
        .form-checkbox {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: start;
          gap: 1rem;
          font-weight: 500;
          input {
            width: fit-content;
          }
          p {
            width: 100%;
            margin-top: 0.9rem;
            a {
              text-decoration: none;
              color: var(--primary);
              font-weight: 600;
            }
          }
        }
      }
    }
    .dont-have {
      display: flex;
      width: 100%;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  @media screen and (max-width: 420px) {
  }
  @media screen and (max-width: 350px) {
  }
`;
export default ForgotPassword;
