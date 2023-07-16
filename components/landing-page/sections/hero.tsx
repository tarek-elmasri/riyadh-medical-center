"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import img1 from "@/assets/pexels-evg-kowalievska-1170979.jpg";
import img2 from "@/assets/pexels-shedrack-salami-16903641.jpg";
import { cn } from "@/lib/utils";
import CTA from "@/components/landing-page/CTA";

const imgSrc = [img1, img2];

const Hero = () => {
  const router = useRouter();
  return (
    <>
      <header
        className="w-full overflow-hidden bg-white"
        style={{ height: "var(--hero-height)" }}
      >
        <Swiper
          modules={[Autoplay, EffectFade]}
          autoplay={{ delay: 4000 }}
          effect="fade"
          slidesPerView={1}
        >
          {imgSrc.map((img, i) => (
            <SwiperSlide key={i + "bc"}>
              <div
                className="relative w-full bg-slate-500"
                style={{ height: "var(--hero-height" }}
              >
                <Image
                  src={img}
                  fill
                  className="object-cover"
                  sizes="(max-width: 100%)"
                  alt="image"
                />
                <div className="absolute z-1 inset-0 bg-slate-900 opacity-50" />
                <div
                  className={cn(
                    "absolute inset-0 flex flex-col h-full md:mx-32 items-center justify-center",
                    i % 2 === 0 ? "md:items-start" : "md:items-end"
                  )}
                >
                  <div className="max-w-xs md:max-w-sm p-8 bg-slate-900/70 rounded-lg">
                    <h2 className="text-sky-400 text-xl md:text-3xl font-bold">
                      خدمات صحية مميزة برعاية أطباء متخصصين
                    </h2>
                    <p className="mt-4 text-md md:text-md text-neutral-200 font-bold">
                      مختبرات عالية الدقة مع باقات خاصة تناسب احتياجاتك بأيدى
                      متخصصين في مختلف التحاليل و نتائج فورية
                    </p>
                    <CTA
                      className="mt-20 w-full"
                      onClick={() => router.push("/appointments")}
                    >
                      {" "}
                      احجز موعدك
                    </CTA>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </header>
    </>
  );
};

export default Hero;
