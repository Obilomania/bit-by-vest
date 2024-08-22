import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiArrowDownLeft, FiArrowUpRight } from "react-icons/fi";
import Loader from "./Loader";

const CryptoUpdates = () => {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const url =
      "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "0cbdcdba5emsh8f975896d7dad2ap199d8bjsn8f58d9545f73",
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      },
    };

    async function cryptoAPI() {
      await fetch(url, options)
        .then((response) => response.json())
        .then((data) => setCryptoData(data.data.coins))
        .catch((error) => console.error("Error:", error));
    }
    cryptoAPI();
  }, []);
  
  return (
    <CryptoBlocks>
      {cryptoData
        ?.map((data: any, index: any) => (
          <div className="blockCrypto" key={index}>
            <img src={data?.iconUrl} alt="" />
            <span className="coin-name">{data?.name}</span>
            <span className="price">{`$${Number(
              data?.price.toLocaleString("en-US")
            ).toFixed(2)}`}</span>
            {data?.change < 0 ? (
              <span className="red" style={{ color: "red" }}>
                <FiArrowDownLeft />
                {data?.change}%
              </span>
            ) : (
              <span className="green" style={{ color: "green" }}>
                <FiArrowUpRight />
                {data?.change}%
              </span>
            )}
          </div>
        ))
        .slice(0, 22)}
    </CryptoBlocks>
  );
};

const CryptoBlocks = styled.div`
  width: 100%;
  height: fit-content;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 3;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  .blockCrypto {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    line-height: 1.2rem;
    font-size: 0.8rem;
    border: 1px solid var(--primary);
    width: 10rem;
    height: 6rem;
    img {
      width: 1rem;
      margin-right: 0.5rem;
    }
    .coin-name {
      text-align: center;
      color: var(--primary);
    }
  }

  @media screen and (max-width: 1200px) {
    display:none;
  }
  @media screen and (max-width: 900px) {
    display:none;
  }
  @media screen and (max-width: 600px) {
    display:none;
  }
  @media screen and (max-width: 420px) {
    display:none;
  }
  @media screen and (max-width: 350px) {
    display:none;
  }
`;
export default CryptoUpdates;
