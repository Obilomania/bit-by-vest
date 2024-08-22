import React from "react";
import MainLayout from "../components/MainLayout";
import styled from "styled-components";
import { Accordion } from "react-bootstrap";

const background = require("../assets/BG-IMG.jpg");

const FaqPage = () => {
  return (
    <MainLayout>
      <Faq>
        <img src={background} alt="" className="bg-img" />

        <div className="questions">
          <h2 className="heading headTag">FREQUENTLY ASKED QUESTIONS</h2>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header className="b">
                <b>WHAT IS BIT BY VEST?</b>
              </Accordion.Header>
              <Accordion.Body>
                <p className="answers">
                  {" "}
                  BIT BY VEST is an investment company, which was founded by a
                  team of distinguished professional financial managers, analyst
                  and experienced developers who came together to create a
                  universal platform for cryptocurrency lovers worldwide. Nova
                  Vault Ventures offers its users access to the algo-trading
                  algorithmic trading system bot via our proprietary dailypips
                  Plans that allow users to choose the system’s operating mode
                  as well as to participate in the affiliate program.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <b>IS BIT BY VEST A REGISTERED COMPANY?</b>
              </Accordion.Header>
              <Accordion.Body>
                <p className="answers">
                  Yes,it is legally registered company with the name whose
                  activities are regulated by the UK Government.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <b>HOW CAN I REGISTER TO START EARNING? ?</b>
              </Accordion.Header>
              <Accordion.Body>
                <p className="answers">
                  Simply click on signup page on the website. Each Nova Vault
                  Ventures plan package has a range of price tag on it, make the
                  exact payment and then you will finish up your registration
                  process. Once we verify your deposit which we will definitely
                  do, then we will enable your dashboard for earning and at the
                  agreed time, you will get your profit straight to your wallet.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                <b>HOW DO I ACCESS MY DASHBOARD?</b>
              </Accordion.Header>
              <Accordion.Body>
                <p className="answers">
                  At the site menu bar, click the account tab and you will be
                  redirected to login, when you are at the login page simply
                  enter your username and password and click the login button.
                  If you have an account with Nova Vault Venture you will be
                  redirected to your dashboard.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>
                <b>CAN I RE-INVEST?</b>
              </Accordion.Header>
              <Accordion.Body>
                <p className="answers">
                  Yes, you can chose to reinvest after you have your profit sent
                  to your wallet. Reinvestment is done via your dashboard.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header>
                <b>WHAT IF I LOST MY LOGIN DETAILS? ?</b>
              </Accordion.Header>
              <Accordion.Body>
                <p className="answers">
                  If you lost your login details you may wish to have a new one
                  and at that you are required to contact support and you will
                  be giving back your login details instantly.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="6">
              <Accordion.Header>
                <b>WHICH E-CURRENCIES DO YOU ACCEPT?</b>
              </Accordion.Header>
              <Accordion.Body>
                <p className="answers">BITCOIN ONLY!!!</p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="7">
              <Accordion.Header>
                <b>HOW MANY ACCOUNTS CAN I REGISTER??</b>
              </Accordion.Header>
              <Accordion.Body>
                <p className="answers">
                  You can only register one account under your name. Likewise,
                  it is forbidden to run several accounts in one household. If
                  our relevant departments are tracked that you have created
                  more than one account, we will permanently lock your personal
                  account.
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </Faq>
    </MainLayout>
  );
};

const Faq = styled.div`
  width: 100%;
  height: fit-content;
  position: relative;
  color: var(--primary);
  .bg-img {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
  }
  .headTag {
    position: relative;
    margin-bottom: 1.5rem;
  }
  .answers {
    color: var(--primary);
    position: relative;
  }
  .questions {
    padding: 11rem 10rem 0 10rem;
    b {
      color: var(--primary);
    }
  }
  @media screen and (max-width: 1200px) {
    .questions {
      padding: 5rem 1rem;
      b {
        color: var(--primary);
      }
    }
  }
  @media screen and (max-width: 900px) {
    .questions {
      padding: 1rem;
      b {
        color: var(--primary);
      }
    }
  }
  @media screen and (max-width: 600px) {
    .questions {
      padding: 5rem 1rem;
      b {
        color: var(--primary);
      }
    }
  }
  @media screen and (max-width: 420px) {
    .questions {
      padding: 1rem;
      b {
        color: var(--primary);
      }
    }
  }
  @media screen and (max-width: 350px) {
    .questions {
      padding: 1rem;
      b {
        color: var(--primary);
      }
    }
  }
`;
export default FaqPage;
