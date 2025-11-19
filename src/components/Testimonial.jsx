import React from 'react';
import { FaStar } from 'react-icons/fa';

const Testimonials = () => {
  return (
    <section className="py-16 px-4 border-b border-base-300">
      <div className="container mx-auto">
        <div className="flex flex-col text-center w-full mb-10 border-b border-base-300 pb-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            What Our Users Say
          </h2>
          <p className="text-lg lg:w-2/3 mx-auto">
            See how UtilityHub is making payments simpler for everyone.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card border-2 p-8">
            <div className="flex items-center mb-4">
              <div className="avatar">
                <div className="w-16 rounded-full ring ring-blue-600 ring-offset-base-100 ring-offset-2">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-lg">Sarah K.</h4>
                <p className="text-sm">Dhaka, Gulshan</p>
              </div>
            </div>
            <p className="mb-4">
              "Finally, all my bills in one place! UtilityHub is so easy to
              use and saved me so much time. I paid my DESCO and WASA bill in
              under a minute."
            </p>
            <div className="flex text-yellow-400">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>

          <div className="card border-2 p-8">
            <div className="flex items-center mb-4">
              <div className="avatar">
                <div className="w-16 rounded-full ring ring-blue-600 ring-offset-base-100 ring-offset-2">
                  <img src="https://i.ibb.co.com/8L5qs1jb/photo-1690037901153-7fd75205941a.jpg" />
                </div>
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-lg">Rahim Ahmed</h4>
                <p className="text-sm">Chittagong</p>
              </div>
            </div>
            <p className="mb-4">
              "I used to forget my internet bill all the time. The dashboard
              makes it easy to see what's due. The payment process is fast
              and secure. Highly recommend!"
            </p>
            <div className="flex text-yellow-400">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>

          <div className="card border-2 p-8">
            <div className="flex items-center mb-4">
              <div className="avatar">
                <div className="w-16 rounded-full ring ring-blue-600 ring-offset-base-100 ring-offset-2">
                  <img src="https://i.ibb.co.com/6csCvJB7/premium-photo-1682089869602-2ec199cc501a.jpg" />
                </div>
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-lg">Shuvro Dey</h4>
                <p className="text-sm">Sylhet</p>
              </div>
            </div>
            <p className="mb-4">
              "The 'My Pay Bills' history and PDF download feature is
              fantastic for keeping my family's monthly records. A very
              reliable and professional service."
            </p>
            <div className="flex text-yellow-400">
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