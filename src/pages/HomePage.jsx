import React from "react";
import { Link } from "react-router";
import Banner from "../components/Banner";
import CategoryGrid from "./../components/CategoryGrid";
import RecentBills from "../components/RecentBills";
import CallToAction from "../components/CallToAction";

const HomePage = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="mx-40">
        <CategoryGrid></CategoryGrid>
        <RecentBills></RecentBills>
      </div>

      {/* extra section A & B */}
      <CallToAction></CallToAction>
    </div>
  );
};

export default HomePage;
