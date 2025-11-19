import React, { useEffect } from "react";
import { Link } from "react-router";
import Banner from "../components/Banner";
import CategoryGrid from "./../components/CategoryGrid";
import RecentBills from "../components/RecentBills";
import CallToAction from "../components/CallToAction";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonial";

const HomePage = () => {
  useEffect(() => {
    document.title = "UtilityHub - Home";
  }, []);
  return (
    <div>
      <Banner></Banner>
      <div className="mx-40">
        <CategoryGrid></CategoryGrid>
        <RecentBills></RecentBills>
      </div>
      <HowItWorks></HowItWorks>
      <CallToAction></CallToAction>
      <Testimonials></Testimonials>
    </div>
  );
};

export default HomePage;
