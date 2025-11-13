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
    img: "https://images.unsplash.com/photo-1761839258671-6495fdc188b3?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
  },
  {
    title: "Track Your Monthly Expenses Easily",
    text: "Get detailed insights into your payments and billing history.",
    btn: "Go to Dashboard",
    link: "/bills",
    img: "https://images.unsplash.com/photo-1664180921788-67c34b589ae0?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=987",
  },
  {
    title: "Secure Online Payments",
    text: "Pay your bills safely with encryption and secure gateways.",
    btn: "Pay Now",
    link: "/bills",
    img: "https://images.unsplash.com/photo-1581091870621-df32f6b3bb8a?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=1170",
  },
  {
    title: "Stay Notified",
    text: "Get reminders for upcoming bills so you never miss a payment.",
    btn: "Set Alerts",
    link: "/bills",
    img: "https://images.unsplash.com/photo-1573164574396-8f9a0e3b2f7d?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=1170",
  },
];

const Banner = () => {
  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-[70vh] flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              {/* Overlay supporting dark mode */}
              <div className="absolute inset-0 bg-black bg-opacity-40 dark:bg-black dark:bg-opacity-60"></div>

              <div className="relative z-10 text-center text-white px-4">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  {slide.title}
                </h2>
                <p className="mb-6 text-lg md:text-xl">{slide.text}</p>
                <Link
                  to={slide.link}
                  className="btn btn-primary transition-transform duration-300 hover:scale-105"
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
