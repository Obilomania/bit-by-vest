import React, { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import HeroSection from "./homePage/HeroSection";
import PlanServices from "./homePage/PlanServices";
import Loader from "../components/Loader";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadTime = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(loadTime);
  }, []);
  return (
    <MainLayout>
      {isLoading && <Loader />}
      <HeroSection />
      <PlanServices />
    </MainLayout>
  );
};

export default HomePage;
