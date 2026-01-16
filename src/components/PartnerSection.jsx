import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { FaBolt, FaWater, FaWifi, FaFire, FaLeaf, FaBuilding, FaSolarPanel, FaRecycle } from "react-icons/fa";
import 'swiper/css';

const PartnerSection = () => {
  const partners = [
    { icon: FaBolt, name: "DESCO" },
    { icon: FaWater, name: "WASA" },
    { icon: FaFire, name: "TITAS" },
    { icon: FaWifi, name: "Link3" },
    { icon: FaLeaf, name: "GreenEnergy" },
    { icon: FaBuilding, name: "CityGroup" },
    { icon: FaSolarPanel, name: "SolarHome" },
    { icon: FaRecycle, name: "EcoWaste" }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Our Trusted Partners</h2>
          <p className="opacity-60 mt-2 uppercase tracking-widest text-sm">Empowering 100+ Utility Providers</p>
        </div>

        <div
          className="w-full max-w-6xl mx-auto"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          }}
        >
          <Swiper
            modules={[Autoplay]}
            spaceBetween={50}
            slidesPerView={3}
            loop={true}
            speed={4000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            breakpoints={{
              640: { slidesPerView: 3, spaceBetween: 40 },
              768: { slidesPerView: 4, spaceBetween: 50 },
              1024: { slidesPerView: 5, spaceBetween: 60 },
            }}
            className="w-full py-4"
          >
            {partners.map((partner, index) => (
              <SwiperSlide key={index} className="flex flex-col items-center justify-center group cursor-default">
                <partner.icon className="text-5xl text-base-content/40 group-hover:text-primary transition-colors duration-300 mb-2" />
                <span className="text-base-content/40 font-bold group-hover:text-primary transition-colors duration-300">
                  {partner.name}
                </span>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;