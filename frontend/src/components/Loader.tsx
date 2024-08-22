import React from 'react'
import { Spinner } from "react-bootstrap";
import styled from "styled-components";

const Loader = () => {
  return (
    <Loading>
      <div className="overlay"></div>
      <div className="spinners">
        <Spinner animation="grow"  />
        <Spinner animation="grow"  />
        <Spinner animation="grow"  />
        <Spinner animation="grow"  />
        <Spinner animation="grow"  />
        <Spinner animation="grow"  />
      </div>
    </Loading>
  );
}

const Loading = styled.div`
  width: 100%;
  min-height: 100vh;
  height: fit-content;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background: rgba(0, 0, 0, 1);
  }
  .spinners {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9;
    color:var(--primary);
  }
  @media screen and (max-width: 1200px) {
  }
  @media screen and (max-width: 900px) {
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    min-height: 100vh;
    height: fit-content;
    position: fixed;
    top: 0;
    left: 0;
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100%;
      background: rgba(0, 0, 0, 1);
    }
    .spinners {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 9;
    }
  }
  @media screen and (max-width: 420px) {
  }
  @media screen and (max-width: 350px) {
  }
`;

export default Loader