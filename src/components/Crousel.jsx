import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function Crousel({
  pagination = false,
  autoplay = false,
  delay = 3000,
  images = [],
  className,
}) {
  return (
    // <div className={`${className} rounded-lg`}>
    <Swiper
      modules={[Pagination, Autoplay]}
      autoplay={{
        enabled: autoplay,
        delay: delay,
        disableOnInteraction: true,
      }}
      pagination={{
        enabled: pagination,
        clickable: true,
      }}
      className=""
    >
      {images.map((image, index) => (
        <SwiperSlide key={image.url}>
          <img
            src={image.url}
            alt={image.name}
            className="h-full w-full object-contain object-center"
          />
        </SwiperSlide>
      ))}
    </Swiper>
    // </div>
  );
}

export default Crousel;
