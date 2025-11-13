// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../App.css";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router";

const slides = [
  {
    title: "Manage All Your Utility Bills in One Place",
    text: "Pay for electricity, gas, water, and internet quickly and securely.",
    btn: "View Bills",
    link: "/bills",
    img: "https://i.ibb.co.com/HpKHw7bR/artem-beliaikin-Dz-Iij3-Crp-M-unsplash.jpg",
  },
  {
    title: "Track Your Monthly Expenses Easily",
    text: "Get detailed insights into your payments and billing history.",
    btn: "Go to Dashboard",
    link: "/bills",
    img: "https://i.ibb.co.com/D3mKYKQ/chanhee-lee-vkv-HBK8n-gs-unsplash.jpg",
  },
  {
    title: "Secure Online Payments",
    text: "Pay your bills safely with encryption and secure gateways.",
    btn: "Pay Now",
    link: "/bills",
    img: "https://i.ibb.co.com/DP9qsyQY/rupixen-Q59-Hmz-K38e-Q-unsplash.jpg",
  },
  {
    title: "Stay Notified",
    text: "Get reminders for upcoming bills so you never miss a payment.",
    btn: "Set Alerts",
    link: "/bills",
    img: "https://i.ibb.co.com/WNxptbvj/towfiqu-barbhuiya-j-Oeh3-Lv88x-A-unsplash.jpg",
  },
];

const Banner = () => {
  return (
    <div className="w-full">
      <Swiper
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-[70vh] flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/50 dark:bg-black/70"></div>

              {/* Text content */}
              <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="mb-8 text-lg md:text-xl opacity-90">
                  {slide.text}
                </p>
                <Link
                  to={slide.link}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-transform transform hover:scale-105"
                >
                  {slide.btn}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
