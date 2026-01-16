import React from "react";

const FAQSection = () => {
  return (
    <section className="py-16 bg-base-300 text-base-content">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          <p className="opacity-70 mt-2">Got questions? We have answers.</p>
        </div>

        <div className="join join-vertical w-full">
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" defaultChecked /> 
            <div className="collapse-title text-xl font-medium">
              Is my payment information secure?
            </div>
            <div className="collapse-content">
              <p>Yes, we use industry-standard encryption to protect your data. We do not store your sensitive banking details directly.</p>
            </div>
          </div>

          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" /> 
            <div className="collapse-title text-xl font-medium">
              Can I pay bills for previous months?
            </div>
            <div className="collapse-content">
              <p>Currently, our system is optimized for paying the current month's bills to ensure timely processing and avoid late fees.</p>
            </div>
          </div>

          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="my-accordion-4" /> 
            <div className="collapse-title text-xl font-medium">
              How do I download my payment receipt?
            </div>
            <div className="collapse-content">
              <p>After logging in, go to the "My Pay Bills" section. You will find a button to download a PDF report of all your paid bills.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;