import { useEffect, useState } from "react";
import { carouselImages } from "../lib/mock";

export const LoginCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative hidden lg:flex h-full w-1/2 justify-center bg-amber-400">
      {/* carousel */}
      <div className="flex justify-center items-center">
        {carouselImages.map((i, index) => (
          <img
            key={i.id}
            className={`absolute w-full h-full transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
            src={`https://picsum.photos/id/${i.id}/200/300`}
            alt={i.title}
          />
        ))}
      </div>
    </div>
  );
};
