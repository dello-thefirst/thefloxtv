import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export function MainLoadingUI() {
  return (
    <>
      <div className="carousel-cont w-full h-screen relative sm:h-[57vh]">
        <Swiper
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
          }}
          effect="autoplay"
          loop={true}
          modules={[Autoplay]}
          className="carousel w-full h-full"
        >
          <SwiperSlide className="carousel-item active relative">
            <div className="mask"></div>
            <div className="filter"></div>
            <div className="text w-[40%] h-auto overflow-hidden absolute pb-[70px] pl-[3%] left-0 bottom-0 z-[5] sm:w-full sm:pb-[50px] sm:text-center">
              <p className="logo skeleton w-[300px] h-[50px] my-5 rounded-none md:mx-auto"></p>
              <div className="flex gap-5 my-5 md:justify-center">
                <p className="skeleton w-[90px] h-3 rounded-none"></p>
                <p className="skeleton w-[90px] h-3 rounded-none"></p>
                <p className="skeleton w-[90px] h-3 rounded-none"></p>
              </div>
              <div className="md:hidden">
                <p className="skeleton w-full h-3 rounded-none"></p>
                <p className=" skeleton w-full h-3 rounded-none "></p>
                <p className=" skeleton w-full h-3 rounded-none "></p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
