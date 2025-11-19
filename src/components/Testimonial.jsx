import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const Testimonials = () => {
  return (
    <section className="py-20 px-4 bg-base-200 text-base-content">
      <div className="container mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h2 className="text-4xl font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg opacity-70 lg:w-2/3 mx-auto">
            See how UtilityHub is making payments simpler for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="card bg-base-100 dark:bg-base-300 shadow-lg border border-base-200 dark:border-base-content/10 p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-6 right-8 text-primary/10 text-6xl">
              <FaQuoteLeft />
            </div>

            <div className="flex items-center mb-6 relative z-10">
              <div className="avatar">
                <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User" />
                </div>
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-lg text-base-content">Sarah K.</h4>
                <p className="text-sm opacity-60">Dhaka, Gulshan</p>
              </div>
            </div>

            <p className="mb-6 text-base-content/80 italic leading-relaxed relative z-10">
              "Finally, all my bills in one place! UtilityHub is so easy to
              use and saved me so much time. I paid my DESCO and WASA bill in
              under a minute."
            </p>

            <div className="flex text-orange-400 gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>

          <div className="card bg-base-100 dark:bg-base-300 shadow-lg border border-base-200 dark:border-base-content/10 p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-6 right-8 text-primary/10 text-6xl">
              <FaQuoteLeft />
            </div>

            <div className="flex items-center mb-6 relative z-10">
              <div className="avatar">
                <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src="https://i.ibb.co.com/8L5qs1jb/photo-1690037901153-7fd75205941a.jpg" alt="User" />
                </div>
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-lg text-base-content">Rahim Ahmed</h4>
                <p className="text-sm opacity-60">Chittagong</p>
              </div>
            </div>

            <p className="mb-6 text-base-content/80 italic leading-relaxed relative z-10">
              "I used to forget my internet bill all the time. The dashboard
              makes it easy to see what's due. The payment process is fast
              and secure. Highly recommend!"
            </p>

            <div className="flex text-orange-400 gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>

          <div className="card bg-base-100 dark:bg-base-300 shadow-lg border border-base-200 dark:border-base-content/10 p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="absolute top-6 right-8 text-primary/10 text-6xl">
              <FaQuoteLeft />
            </div>

            <div className="flex items-center mb-6 relative z-10">
              <div className="avatar">
                <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src="https://i.ibb.co.com/6csCvJB7/premium-photo-1682089869602-2ec199cc501a.jpg" alt="User" />
                </div>
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-lg text-base-content">Shuvro Dey</h4>
                <p className="text-sm opacity-60">Sylhet</p>
              </div>
            </div>

            <p className="mb-6 text-base-content/80 italic leading-relaxed relative z-10">
              "The 'My Pay Bills' history and PDF download feature is
              fantastic for keeping my family's monthly records. A very
              reliable and professional service."
            </p>

            <div className="flex text-orange-400 gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;