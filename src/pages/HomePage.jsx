import React, { useEffect } from "react";
import Banner from "../components/Banner";
import CategoryGrid from "./../components/CategoryGrid";
import RecentBills from "../components/RecentBills";
import CallToAction from "../components/CallToAction";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonial";
import ScrollDownArrow from "../components/ScrollDownArrow"; // Import
import StatsSection from "../components/StatsSection";
import FAQSection from "../components/FAQSection";
import NewsletterSection from "../components/NewsletterSection";
import PartnerSection from "../components/PartnerSection";

const HomePage = () => {
  useEffect(() => {
    document.title = "UtilityHub - Home";
  }, []);
  
  return (
    <div className="relative">
      <ScrollDownArrow />
      
      <Banner />
      <PartnerSection/>
      <div className="md:mx-20 lg:mx-40 mx-4">
        <CategoryGrid />
        <RecentBills />
      </div>
      <StatsSection/>
      <HowItWorks />
      <Testimonials />
      <CallToAction />
      <FAQSection/>
      <NewsletterSection/>
    </div>
  );
};

export default HomePage;