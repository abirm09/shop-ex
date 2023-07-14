import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Banner = () => {
  return (
    <>
      <div className="bg-cyan-50 py-2 md:py-5">
        <div className="ex-container">
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            <SwiperSlide
              className="py-10 select-none grid-cols-1 md:grid-cols-2 items-center gap-5"
              style={{ display: "grid" }}
            >
              <div className="space-y-3">
                <h2
                  className="font-concert text-3xl md:text-5xl ex-text-gradient"
                  data-aos="fade-up"
                  data-aos-delay="0"
                >
                  Shop online
                </h2>
                <p
                  className="font-inter font-"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  Explore a world of convenience and endless choices with our
                  online shopping experience.
                </p>
                <p
                  className="font-inter font-semibold text-xl"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  Enjoy up to{" "}
                  <span className="font-knewave ex-text-gradient text-2xl">
                    70%
                  </span>{" "}
                  Off on your shopping.
                </p>
                <div data-aos="fade-up" data-aos-delay="300">
                  <a href="#products" className="ex-btn-primary">
                    Shop now
                  </a>
                </div>
              </div>
              <div>
                <img
                  data-aos="zoom-in"
                  className="max-w-xs w-full mx-auto"
                  src="https://i.ibb.co/YRTjHs3/online-shopping-1.png"
                  alt="Online shopping"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide
              className="py-10 select-none grid-cols-1 md:grid-cols-2 items-center gap-5"
              style={{ display: "grid" }}
            >
              <div className="space-y-3">
                <h2
                  className="font-concert text-3xl md:text-5xl bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
                  data-aos="fade-up"
                  data-aos-delay="0"
                >
                  Send to friend
                </h2>
                <p
                  className="font-inter font-"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  Elevate connections with a thoughtful gesture: effortlessly
                  send gifts to your loved ones.
                </p>
                <p
                  className="font-inter font-semibold text-xl"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  Enjoy up to{" "}
                  <span className="font-knewave ex-text-gradient text-2xl">
                    70%
                  </span>{" "}
                  Off on your shopping.
                </p>
                <div data-aos="fade-up" data-aos-delay="300">
                  <a href="#products" className="ex-btn-primary">
                    Shop now
                  </a>
                </div>
              </div>
              <div>
                <img
                  data-aos="zoom-in"
                  className="max-w-xs w-full mx-auto"
                  src="https://i.ibb.co/n1TmtR9/send-gift.png"
                  alt="Send gift"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide
              className="py-10 select-none grid-cols-1 md:grid-cols-2 items-center gap-5"
              style={{ display: "grid" }}
            >
              <div className="space-y-3">
                <h2
                  className="font-concert text-3xl md:text-5xl bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent"
                  data-aos="fade-up"
                  data-aos-delay="0"
                >
                  Get awesome products
                </h2>
                <p
                  className="font-inter font-"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  Elevate connections with a thoughtful gesture: effortlessly
                  send gifts to your loved ones.
                </p>
                <p
                  className="font-inter font-semibold text-xl"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  Enjoy up to{" "}
                  <span className="font-knewave ex-text-gradient text-2xl">
                    70%
                  </span>{" "}
                  Off on your shopping.
                </p>
                <div data-aos="fade-up" data-aos-delay="300">
                  <a href="#products" className="ex-btn-primary">
                    Shop now
                  </a>
                </div>
              </div>
              <div>
                <img
                  data-aos="zoom-in"
                  className="max-w-xs w-full mx-auto"
                  src="https://i.ibb.co/c3y4HfH/chuse-items.png"
                  alt="Send gift"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Banner;
