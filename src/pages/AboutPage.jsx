import React, { useEffect } from "react";

const AboutPage = () => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "UtilityHub - About Us";
    return () => {
      document.title = originalTitle;
    };
  }, []);

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-base-100 dark:bg-base-300 rounded-xl shadow-xl p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">
          About UtilityHub
        </h1>

        <div className="space-y-6 text-base-content text-lg leading-relaxed text-justify opacity-90">
          <p>
            Welcome to <strong>UtilityHub</strong>, your centralized solution for managing monthly household utility payments. In an era where time is our most valuable resource, we realized that standing in lines or logging into multiple different websites to pay for Electricity, Gas, Water, and Internet was inefficient. UtilityHub was born out of the necessity to bring all these essential services under one secure, digital roof.
          </p>

          <p>
            Our platform is designed with simplicity and accessibility in mind. We bridge the gap between utility service providers and consumers, offering a seamless interface where you can view your bills, check due dates, and verify payment amounts instantly. By digitizing this process, we aim to reduce paper waste and provide a more organized way for families to track their monthly expenses.
          </p>

          <p>
            Security and reliability are the pillars of our service. We understand that managing bills involves sensitive personal data. That is why we have implemented robust authentication and data protection measures to ensure that your information remains private. Our system also provides detailed payment histories and downloadable PDF reports, giving you complete proof of payment and peace of mind.
          </p>

          <p>
            As we look to the future, UtilityHub is committed to expanding our features and covering more regions across the country. We believe that technology should make life easier, not more complicated. Thank you for trusting us to handle your utility management needs so that you can focus on what truly matters.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;