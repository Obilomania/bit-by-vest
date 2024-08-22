import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Foot>
      <p>
        <span>20-22 Wenlock Road, London, England, N1 7GU</span> &nbsp; &nbsp;
        <span>support@bitbyvest.com</span> &nbsp; &nbsp;
        © 2021 Bit<span>by</span>Vest. All Rights Reserved
      </p>
    </Foot>
  );
};

const Foot = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  border-top: 1px solid var(--primary);
  margin-top: 4rem;
  padding: 1rem 0;
  p {
    font-weight: 600;
    font-family: "Poppins", sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap:wrap;
    span {
      font-family: "Edu VIC WA NT Beginner", cursive;
      color: white;
    }
  }
`;
export default Footer;
