import React, { useState } from "react";
import styled from "styled-components";
import { investmentData, investmentPlans } from "../../assets/inestments";

const PlanServices = () => {
  const [investments] = useState(investmentData);
  const [planCard] = useState(investmentPlans);

  return (
    <ThePlan>
      <div className="plan-container">
        <h2 className="heading">Investment Strategies</h2>
        <div className="investment-cards">
          {investments?.map((data) => (
            <div className="invest-card" key={data?.id}>
              <p className="card-heading">{data.title}</p>
              <p className="card-content">{data.content}</p>
            </div>
          ))}
        </div>

        <div className="investment-plans">
          <div className="plans-heading">INVESTMENT PLANS</div> <br />
          <div className="plans-cards">
            {planCard?.map((data) => (
              <div className="the-plan-card" key={data.id}>
                <p className="plan-title">{data.timeFrame}</p>
                <p className="plan-timeframe">{data.returns}</p>
                <p className="plan-range">{data.range}</p>
                <p className="plan-percentage">{data.earning}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ThePlan>
  );
};
const ThePlan = styled.div`
  width: 100%;
  position: relative;
  padding: 3rem 10rem 1rem 10rem;
  color: var(--primary);
  font-family: "Poppins", sans-serif;
  .plan-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
  }
  .investment-cards {
    display: flex;
    align-items: start;
    justify-content: space-between;
    gap: 1.5rem;
    .invest-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      width: 40%;
      height: 10rem;
      padding: 0.5rem;
      text-align: center;
      border: 1px solid var(--primary);
      .card-heading {
        font-weight: 600;
        font-size: 1.2rem;
      }
    }
  }
  .investment-plans {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* gap: 1rem; */
    .plans-heading {
      font-weight: 600;
      font-size: 2rem;
      letter-spacing: 1px;
    }
    .plans-cards {
      width: 100%;
      display: flex;
      align-items: start;
      justify-content: space-between;
    }
    .the-plan-card {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      border: 1px solid var(--primary);
      padding: 0.5rem;
      width: 19%;
      gap: -1rem;
      p {
        margin-bottom: 0.2rem;
      }
      .plan-title {
        font-weight: 600;
        font-size: 1.2rem;
        color: white;
      }
    }
  }

  @media screen and (max-width: 1200px) {
    width: 100%;
    position: relative;
    padding: 1rem;
    color: var(--primary);
    font-family: "Poppins", sans-serif;
    .plan-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
    }
    .investment-cards {
      display: flex;
      align-items: start;
      justify-content: space-between;
      flex-direction: column;
      gap: 1.5rem;
      .invest-card {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        width: 100%;
        height: 10rem;
        padding: 0.5rem;
        text-align: center;
        border: 1px solid var(--primary);
        .card-heading {
          font-weight: 600;
          font-size: 1rem;
        }
      }
    }
    .investment-plans {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      /* gap: 1rem; */
      .plans-heading {
        font-weight: 600;
        font-size: 1.5rem;
        letter-spacing: 1px;
      }
      .plans-cards {
        width: 100%;
        display: flex;
        align-items: start;
        justify-content: space-between;
        flex-wrap: wrap;
        /* flex-direction:column; */
        gap: 1rem;
      }
      .the-plan-card {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border: 1px solid var(--primary);
        padding: 0.5rem;
        width: 48%;
        gap: -1rem;
        p {
          margin-bottom: 0.2rem;
        }
        .plan-timeframe {
          font-weight: 600;
          text-align: center;
        }
        .plan-title {
          font-weight: 600;
          font-size: 1rem;
          color: white;
        }
      }
    }
  }
  @media screen and (max-width: 900px) {
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    position: relative;
    padding: 1rem;
    color: var(--primary);
    font-family: "Poppins", sans-serif;
    .plan-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
    }
    .investment-cards {
      display: flex;
      align-items: start;
      justify-content: space-between;
      flex-direction: column;
      gap: 1.5rem;
      .invest-card {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        width: 100%;
        height: 10rem;
        padding: 0.5rem;
        text-align: center;
        border: 1px solid var(--primary);
        .card-heading {
          font-weight: 600;
          font-size: 1rem;
        }
      }
    }
    .investment-plans {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      /* gap: 1rem; */
      .plans-heading {
        font-weight: 600;
        font-size: 1.5rem;
        letter-spacing: 1px;
      }
      .plans-cards {
        width: 100%;
        display: flex;
        align-items: start;
        justify-content: space-between;
        flex-wrap: wrap;
        /* flex-direction:column; */
        gap: 1rem;
      }
      .the-plan-card {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border: 1px solid var(--primary);
        padding: 0.5rem;
        width: 48%;
        gap: -1rem;
        p {
          margin-bottom: 0.2rem;
        }
        .plan-timeframe {
          font-weight: 600;
          text-align: center;
        }
        .plan-title {
          font-weight: 600;
          font-size: 1rem;
          color: white;
        }
      }
    }
  }
  @media screen and (max-width: 420px) {
    width: 100%;
    position: relative;
    padding: 1rem;
    color: var(--primary);
    font-family: "Poppins", sans-serif;
    .plan-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
    }
    .investment-cards {
      display: flex;
      align-items: start;
      justify-content: space-between;
      flex-direction: column;
      gap: 1.5rem;
      .invest-card {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        width: 100%;
        height: 10rem;
        padding: 0.5rem;
        text-align: center;
        border: 1px solid var(--primary);
        .card-heading {
          font-weight: 600;
          font-size: 1rem;
        }
      }
    }
    .investment-plans {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      /* gap: 1rem; */
      .plans-heading {
        font-weight: 600;
        font-size: 1.5rem;
        letter-spacing: 1px;
      }
      .plans-cards {
        width: 100%;
        display: flex;
        align-items: start;
        justify-content: space-between;
        flex-wrap: wrap;
        /* flex-direction:column; */
        gap: 1rem;
      }
      .the-plan-card {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border: 1px solid var(--primary);
        padding: 0.5rem;
        width: 47%;
        gap: -1rem;
        p {
          margin-bottom: 0.2rem;
        }
        .plan-title {
          font-weight: 600;
          font-size: 1rem;
          color: white;
        }
      }
    }
  }
  @media screen and (max-width: 350px) {
    width: 100%;
    position: relative;
    padding: 1rem;
    color: var(--primary);
    font-family: "Poppins", sans-serif;
    .plan-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
    }
    .investment-cards {
      display: flex;
      align-items: start;
      justify-content: space-between;
      flex-direction: column;
      gap: 1.5rem;
      .invest-card {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        width: 100%;
        height: 10rem;
        padding: 0.5rem;
        text-align: center;
        border: 1px solid var(--primary);
        .card-heading {
          font-weight: 600;
          font-size: 1rem;
        }
      }
    }
    .investment-plans {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      /* gap: 1rem; */
      .plans-heading {
        font-weight: 600;
        font-size: 1.5rem;
        letter-spacing: 1px;
      }
      .plans-cards {
        width: 100%;
        display: flex;
        align-items: start;
        justify-content: space-between;
        flex-wrap: wrap;
        /* flex-direction:column; */
        gap: 1rem;
      }
      .the-plan-card {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border: 1px solid var(--primary);
        padding: 0.5rem;
        width: 48%;
        gap: -1rem;
        p {
          margin-bottom: 0.2rem;
        }
        .plan-title {
          font-weight: 600;
          font-size: 1rem;
          color: white;
        }
      }
    }
  }
`;
export default PlanServices;
