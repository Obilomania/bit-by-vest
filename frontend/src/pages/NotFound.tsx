import React from 'react'
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import MainLayout from '../components/MainLayout';
const background = require("../assets/BG-IMG.jpg");

const NotFound = () => {
  return (
    <MainLayout>
      <NotF>
        <img src={background} alt="" className="bg-img" />
        <div className="theNotFound">

        <div className="notFound">
          <h1>PAGE NOT FOUND !!!</h1>
          <Link to="/" className="not-found-btn">
            <AiOutlineHome />
            Back Home
          </Link>
        </div>
        </div>
      </NotF>
    </MainLayout>
  );
}


const NotF = styled.div`
  width: 100%;
  position: relative;
  min-height: 80vh;
  height: fit-content;
  overflow: hidden;
  padding: 0rem 10rem;
  font-family: "Poppins", sans-serif;
  position: relative;
  width: 100%;
  height: fit-content;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  padding: 18vh 10rem;
  color: rgb(255, 255, 255);
  .theNotFound {
    position: relative;
    width: 100%;
    height: 50vh;
    border: 1px solid var(--primary);
    padding: 1rem;
  }
  .bg-img {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
  }
  .notFound {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  h1 {
    font-size: 4rem;
    font-weight: bold;
    color: red;
  }
  a {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    gap: 1rem;
    text-decoration: none;
    background: var(--primary);
    color: white;
    padding: 1rem 0;
  }
  @media screen and (max-width: 1200px) {
    .notFound {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    h1 {
      font-size: 3rem;
      font-weight: bold;
      color: red;
    }
    a {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      gap: 1rem;
      text-decoration: none;
      background: var(--primary);
      color: white;
      padding: 0.5rem 0;
    }
  }
  @media screen and (max-width: 900px) {
    padding: 1rem;

    .notFound {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    h1 {
      font-size: 1.2rem;
      font-weight: bold;
      color: red;
    }
    a {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      gap: 1rem;
      text-decoration: none;
      background: var(--primary);
      color: white;
      padding: 0.5rem 0;
    }
  }
  @media screen and (max-width: 600px) {
    padding: 1rem;

    .notFound {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    h1 {
      font-size: 1.2rem;
      font-weight: bold;
      color: red;
    }
    a {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      gap: 1rem;
      text-decoration: none;
      background: var(--primary);
      color: white;
      padding: 0.2rem 0;
    }
  }
  @media screen and (max-width: 420px) {
    padding: 1rem;

    .notFound {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    h1 {
      font-size: 1.2rem;
      font-weight: bold;
      color: red;
    }
    a {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      gap: 1rem;
      text-decoration: none;
      background: var(--primary);
      color: white;
      padding: 0.2rem 0;
    }
  }
  @media screen and (max-width: 350px) {
    padding: 1rem;

    .notFound {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    h1 {
      font-size: 1.2rem;
      font-weight: bold;
      color: red;
    }
    a {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      gap: 1rem;
      text-decoration: none;
      background: var(--primary);
      color: white;
      padding: 0.2rem 0;
    }
  }
`;
export default NotFound