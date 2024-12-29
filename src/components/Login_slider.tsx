import React, { useState, useEffect } from 'react';

const Login_slider = () => {
  const images = [
    "/slider_image1.png",
    "/slider_image2.jfif",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  return (
    <div className="relative md:w-[100%] lg:w-[45%] md:h-[70vh] lg:h-[70vh] overflow-hidden flex ml-[5%]">
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${currentIndex * 80}%)`, // Adjust the offset to show part of the next image
         
        }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt=""
            className="h-[35vh] w-[150%]  md:w-full md:h-auto rounded-[40px] mr-[5%]" // Adjust `mr-[5%]` for partial visibility
          />
        ))}
      </div>
    </div>
  );
};

export default Login_slider;
