import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const ScrollDownArrow = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    if (documentHeight - scrollPosition < 150) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  const scrollToNextSection = () => {
    window.scrollBy({
      top: window.innerHeight * 0.8,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      onClick={scrollToNextSection}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-bounce cursor-pointer"
    >
      <div className="bg-primary hover:bg-primary/80 text-primary-content p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300">
        <FaChevronDown size={24} />
      </div>
    </div>
  );
};

export default ScrollDownArrow;