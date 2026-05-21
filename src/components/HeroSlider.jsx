"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  { title: "Your Health, Booked in Seconds", sub: "300+ verified doctors across Dhaka.", img: "/hero1.jpg" },
  { title: "Top Specialists, One Click Away", sub: "Compare fees, read reviews, choose with confidence.", img: "/hero2.jpg" },
  { title: "Care You Can Trust", sub: "Real reviews from real patients.", img: "/hero3.jpg" },
];

export default function HeroSlider() {
  return (
    <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 4000 }} pagination={{ clickable: true }} loop className="h-[70vh]">
      {slides.map((s, i) => (
        <SwiperSlide key={i}>
          <div className="relative h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${s.img})` }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
              <h1 className="text-4xl font-bold md:text-6xl">{s.title}</h1>
              <p className="mt-4 text-lg">{s.sub}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

