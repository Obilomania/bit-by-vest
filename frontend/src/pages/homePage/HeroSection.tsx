import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CryptoUpdates from "../../components/CryptoUpdates";

const background = require("../../assets/BG-IMG.jpg");
const HeroSection = () => {
  const userFullname = localStorage.getItem("userName");

  return (
    <TheHero>
      <img src={background} alt="" className="bg-img" />
      <div className="hero-container">
        <div className="hero-content">
          <h1>WELCOME</h1>
          <p>
            This is BitByVest, where we redefine the rules of the investment
            game in the crypto realm! Our mission is clear: to empower you with
            the tools, insights, and opportunities to maximize the potential of
            your investments in the dynamic world of digital assets. Get ready
            to embark on a journey of financial empowerment and innovation
            unlike any other!
          </p>
          {userFullname ? (
            <Link to={"/about"}>
              ABOUT US 
            </Link>
          ) : (
            <Link to={"/login"}>
              GET STARTED <span>&rarr;</span>
            </Link>
          )}
        </div>
        <div className="cryptoContainer">
          <CryptoUpdates />
        </div>
      </div>
    </TheHero>
  );
};

const TheHero = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  .bg-img {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
  }
  .hero-container {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .hero-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 40%;
      h1 {
        font-weight: 800;
        font-size: 8rem;
        color: var(--primary);
        animation: glow 2s infinite alternate;
        font-family: "Poppins", sans-serif;
      }
      p {
        color: var(--primary);
        text-align: center;
        font-size: 1.2rem;
        letter-spacing: 1px;
        font-family: "Poppins", sans-serif;
        text-align: justify;
      }
      a {
        border: 1.5px solid var(--primary);
        padding: 0.8rem 4rem;
        letter-spacing: 1px;
        font-family: "Poppins", sans-serif;

        transition: var(--transition);
        &:hover {
          border: 1.5px solid white;
          padding: 0.8rem 4rem;
          letter-spacing: 1px;
          transition: var(--transition);
        }
      }
    }
  }
  @keyframes glow {
    0% {
      text-shadow: 0 0 5px #2c71fa, 0 0 10px #2c71fa, 0 0 15px #2c71fa,
        0 0 10px #2c71fa, 0 0 10px #2c71fa, 0 0 10px #2c71fa, 0 0 10px #2c71fa;
      -webkit-text-stroke: 1px black; /* For WebKit browsers */
      text-stroke: 1px black; /* For other modern browsers */
    }
    100% {
      text-shadow: 0 0 5px #88adf8, 0 0 10px #88adf8, 0 0 15px #88adf8,
        0 0 15px #88adf8, 0 0 15px #88adf8, 0 0 15px #88adf8, 0 0 15px #88adf8;
      letter-spacing: 0.2rem;
      -webkit-text-stroke: 1px black; /* For WebKit browsers */
      text-stroke: 1px var(--primary); /* For other modern browsers */
    }
  }
  @media screen and (max-width: 1200px) {
    .hero-container {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 3;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .hero-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 90%;
        h1 {
          font-weight: 800;
          font-size: 3.5rem;
          color: var(--primary);
          animation: glow 2s infinite alternate;
        }
        p {
          color: var(--primary);
          text-align: center;
          font-size: 1rem;
          letter-spacing: 1px;
        }
        a {
          border: 1.5px solid var(--primary);
          padding: 0.8rem 4rem;
          letter-spacing: 1px;
          transition: var(--transition);
          &:hover {
            border: 1.5px solid white;
            padding: 0.8rem 4rem;
            letter-spacing: 1px;
            transition: var(--transition);
          }
        }
      }
    }
    @keyframes glow {
      0% {
        text-shadow: 0 0 5px #2c71fa, 0 0 10px #2c71fa, 0 0 15px #2c71fa,
          0 0 10px #2c71fa, 0 0 10px #2c71fa, 0 0 10px #2c71fa, 0 0 10px #2c71fa;
        -webkit-text-stroke: 1px black;
        text-stroke: 1px black;
      }
      100% {
        text-shadow: 0 0 5px #88adf8, 0 0 10px #88adf8, 0 0 15px #88adf8,
          0 0 15px #88adf8, 0 0 15px #88adf8, 0 0 15px #88adf8, 0 0 15px #88adf8;
        letter-spacing: 0.2rem;
        -webkit-text-stroke: 1px black;
        text-stroke: 1px var(--primary);
      }
    }
  }
  @media screen and (max-width: 900px) {
    .hero-container {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 3;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .hero-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 90%;
        h1 {
          font-weight: 800;
          font-size: 3.5rem;
          color: var(--primary);
          animation: glow 2s infinite alternate;
        }
        p {
          color: var(--primary);
          text-align: center;
          font-size: 1rem;
          letter-spacing: 1px;
        }
        a {
          border: 1.5px solid var(--primary);
          padding: 0.8rem 4rem;
          letter-spacing: 1px;
          transition: var(--transition);
          &:hover {
            border: 1.5px solid white;
            padding: 0.8rem 4rem;
            letter-spacing: 1px;
            transition: var(--transition);
          }
        }
      }
    }
    @keyframes glow {
      0% {
        text-shadow: 0 0 5px #2c71fa, 0 0 10px #2c71fa, 0 0 15px #2c71fa,
          0 0 10px #2c71fa, 0 0 10px #2c71fa, 0 0 10px #2c71fa, 0 0 10px #2c71fa;
        -webkit-text-stroke: 1px black;
        text-stroke: 1px black;
      }
      100% {
        text-shadow: 0 0 5px #88adf8, 0 0 10px #88adf8, 0 0 15px #88adf8,
          0 0 15px #88adf8, 0 0 15px #88adf8, 0 0 15px #88adf8, 0 0 15px #88adf8;
        letter-spacing: 0.2rem;
        -webkit-text-stroke: 1px black;
        text-stroke: 1px var(--primary);
      }
    }
  }
  @media screen and (max-width: 600px) {
    .hero-container {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .hero-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 90%;
        h1 {
          font-weight: 800;
          font-size: 3.5rem;
          color: var(--primary);
          animation: glow 2s infinite alternate;
        }
        p {
          color: var(--primary);
          text-align: center;
          font-size: 0.8rem;
          letter-spacing: 1px;
        }
        a {
          border: 1.5px solid var(--primary);
          padding: 0.8rem 4rem;
          letter-spacing: 1px;
          transition: var(--transition);
          &:hover {
            border: 1.5px solid white;
            padding: 0.8rem 4rem;
            letter-spacing: 1px;
            transition: var(--transition);
          }
        }
      }
    }
    @keyframes glow {
      0% {
        text-shadow: 0 0 5px #2c71fa, 0 0 10px #2c71fa, 0 0 15px #2c71fa,
          0 0 10px #2c71fa, 0 0 10px #2c71fa, 0 0 10px #2c71fa, 0 0 10px #2c71fa;
        -webkit-text-stroke: 1px black; /* For WebKit browsers */
        text-stroke: 1px black; /* For other modern browsers */
      }
      100% {
        text-shadow: 0 0 5px #88adf8, 0 0 10px #88adf8, 0 0 15px #88adf8,
          0 0 15px #88adf8, 0 0 15px #88adf8, 0 0 15px #88adf8, 0 0 15px #88adf8;
        letter-spacing: 0.2rem;
        -webkit-text-stroke: 1px black; /* For WebKit browsers */
        text-stroke: 1px var(--primary); /* For other modern browsers */
      }
    }
  }
  @media screen and (max-width: 420px) {
    .hero-container {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 3;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .hero-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 90%;
        h1 {
          font-weight: 800;
          font-size: 3.5rem;
          color: var(--primary);
          animation: glow 2s infinite alternate;
        }
        p {
          color: var(--primary);
          text-align: center;
          font-size: 0.8rem;
          letter-spacing: 1px;
        }
        a {
          background: var(--primary);
          padding: 0.5rem 2rem;
          letter-spacing: 1px;
          transition: var(--transition);
          color: white;
          &:hover {
            border: 1.5px solid white;
            padding: 0.8rem 4rem;
            letter-spacing: 1px;
            transition: var(--transition);
          }
        }
      }
    }
    @keyframes glow {
      0% {
        text-shadow: 0 0 5px #2c71fa, 0 0 10px #2c71fa, 0 0 15px #2c71fa,
          0 0 10px #2c71fa, 0 0 10px #2c71fa, 0 0 10px #2c71fa, 0 0 10px #2c71fa;
        -webkit-text-stroke: 1px black;
        text-stroke: 1px black;
      }
      100% {
        text-shadow: 0 0 5px #88adf8, 0 0 10px #88adf8, 0 0 15px #88adf8,
          0 0 15px #88adf8, 0 0 15px #88adf8, 0 0 15px #88adf8, 0 0 15px #88adf8;
        letter-spacing: 0.2rem;
        -webkit-text-stroke: 1px black;
        text-stroke: 1px var(--primary);
      }
    }
  }
  @media screen and (max-width: 350px) {
  }
`;
export default HeroSection;
