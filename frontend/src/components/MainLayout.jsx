import React from "react";
import styled from "styled-components";
import Header from "./mainLayout/Header";
import Footer from "./mainLayout/Footer";

const MainLayout = ({ children }: any) => {
  return (
    <Layout>
      <>
        <Header />
        <div className="children">{children}</div>
        <Footer />
      </>
    </Layout>
  );
};
const Layout = styled.div`
  position: relative;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 200;
  .children {
    width: 100%;
    min-height: 83vh;
    height: fit-content;
  }
`;
export default MainLayout;
