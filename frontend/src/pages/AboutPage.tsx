import React from "react";
import styled from "styled-components";
import MainLayout from "../components/MainLayout";

const background = require("../assets/BG-IMG.jpg");
const AboutPage = () => {
  return (
    <MainLayout>
      <HomeSection>
        <img src={background} alt="" className="bg-img" />
        <div className="about-container">
          <h2 className="heading">ABOUT US</h2>
          <p>
            BIT BY VEST is an investment company, which was founded by a
            team of distinguished professional financial managers, analyst and
            experienced developers who came together to create a universal
            platform for cryptocurrency lovers worldwide. BIT BY VEST
            offers its users access to the algo-trading algorithmic trading
            system bot via our proprietary matrix Plans that allow users to
            choose the system’s operating mode as well as to participate in the
            affiliate program. Since our team develops its own strategies of
            trading and currency exchange applying all professional knowledge,
            techniques and skills that allow us to generate stable cash flows
            with minimal risk of financial loss. These rules are developed by
            experts in the field of multicurrency trading and fundamental
            analysis of the Forex market, they are ideal for our business and
            constantly being improved. In 2018 we have decided to enter the
            international market of long-term investments and offer unique
            cooperation terms for people who prefer a passive online income and
            are seeking for reliable financial partners. BIT BY VEST is
            fully legit and officially registered company whose activities are
            regulated by the financial control authorities under the
            jurisdiction of the Australian Securities & Investments Commission
            (ASIC) . Accepting our terms of cooperation, you can be absolutely
            sure of getting a guaranteed profit and full return on your
            investment. We offer the best conditions for placing your deposits
            and are ready to provide quality service to all comers. consists of
            professional traders that manage your brokerage account on your
            behalf. Whether you are a small or large investor, we can assist you
            with your investment goals. Furthermore, you will have access to our
            streamlined service and ongoing support. We provide a service that
            is based on integrity and is fully transparent. Our investment
            methods are unique. We utilize cutting edge technology and trade a
            diverse range of currency pairs. With the simple and logical
            investment plans accompanied by high and stable profit, it will
            simplify everyone's thinking about the online investment world and
            help people make money more easily in that. The most important
            aspect of our investments, which range from low, middle and high
            income are based on the fact that our core investment is always
            guaranteed, and now we welcome everyone with Internet access and an
            account in any of the received digital currency payment processing.
            Not everyone has the detailed knowledge of financial markets and for
            many people the best choice is to work with financial services
            provider such as forexcryptotraders, who gained required expertise
            and therefore can provide financial products in the form of fixed
            income managed accounts. After years of professional trading we have
            joined our skills, knowledge and talents in the effort to bring a
            new reliable investment opportunity. Its business spreads in the
            United States, Canada, Singapore, Russia and other countries around
            the world; BIT BY VEST have led the rapid development of the
            blockchain industry.We expect young and energetic new members to
            join us in contributing to the global blockchain business. At Nova
            Vault Ventures, we believe in in serving our clients in the most
            trusted manner possible. The well-researched and prudent investments
            you make with us are certain to reap profits. The strategy, which
            employs the arbitrage principles and exploits ineffective and
            unbalanced market prices.
          </p>
        </div>
      </HomeSection>
    </MainLayout>
  );
};

const HomeSection = styled.div`
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
  .about-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    p {
      color: var(--primary);
      text-align: justify;
    }
  }
  @media screen and (max-width: 1200px) {
    width: 100%;
    height: fit-content;
    overflow: hidden;
    position: relative;
    padding: 6rem 1rem 1rem 1rem;
    .bg-img {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
    }
    .about-container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 100%;
      height: 100%;
      p {
        color: var(--primary);
        text-align: justify;
      }
    }
  }
  @media screen and (max-width: 900px) {
    width: 100%;
    height: fit-content;
    overflow: hidden;
    position: relative;
    padding: 6rem 1rem 1rem 1rem;
    .bg-img {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
    }
    .about-container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 100%;
      height: 100%;
      p {
        color: var(--primary);
        text-align: justify;
      }
    }
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    height: fit-content;
    overflow: hidden;
    position: relative;
    padding: 6rem 1rem 1rem 1rem;
    .bg-img {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
    }
    .about-container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 100%;
      height: 100%;
      p {
        color: var(--primary);
        text-align: justify;
      }
    }
  }
  @media screen and (max-width: 420px) {
    width: 100%;
    height: fit-content;
    overflow: hidden;
    position: relative;
    padding: 6rem 1rem 1rem 1rem;
    .bg-img {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
    }
    .about-container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 100%;
      height: 100%;
      p {
        color: var(--primary);
        text-align: justify;
      }
    }
  }
  @media screen and (max-width: 350px) {
    width: 100%;
    height: fit-content;
    overflow: hidden;
    position: relative;
    padding: 6rem 1rem 1rem 1rem;
    .bg-img {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
    }
    .about-container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 100%;
      height: 100%;
      p {
        color: var(--primary);
        text-align: justify;
      }
    }
  }
`;
export default AboutPage;
