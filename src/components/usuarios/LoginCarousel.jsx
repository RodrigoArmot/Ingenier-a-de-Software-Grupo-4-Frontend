import { useEffect, useState } from "react";
import { carouselImages } from "../../lib/mock";

export const LoginCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative hidden lg:flex h-full w-1/2 justify-center">
      {/* carousel */}
      <div className="flex justify-center items-center">
        {carouselImages.map((i, index) => (
          <img
            key={i.id}
            className={`absolute w-full h-full transition-opacity duration-750 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
            src={i.source}
            alt={i.title}
          />
        ))}
      </div>
    </div>
  );
};
