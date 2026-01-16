import React from "react";

const NewsletterSection = () => {
  return (
    <section className="py-16 bg-base-300 text-base-content">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="opacity-70 mb-8 max-w-md mx-auto">
          Subscribe to our newsletter to get the latest updates on utility rates and features.
        </p>
        
        <form className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="input input-bordered w-full" 
            required
          />
          <button className="btn btn-primary">Subscribe</button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;