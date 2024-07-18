import { SwiperSlide } from "swiper/react";

export function DDLoadingUI() {
  let iteratorKey = 1;
  return [1, 2, 3].map(() => (
    <SwiperSlide
      className="w-full h-full rounded-2xl skeleton p-2 relative overflow-hidden"
      key={iteratorKey++}
    ></SwiperSlide>
  ));
}
