import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { useState } from "react";
import PLogin from "../components/auth/PLogin";
import PCadastro from "../components/auth/PCadastro";

function Login() {
  const imagens = [
    "img_login.svg",
    "img_login_dois.svg",
    "img_login_tres.svg",
    "img_login_quatro.svg",
    "img_login_cinco.svg",
    "img_login_seis.svg",
    "img_login_sete.svg",
    "img_login.svg",
    "img_login_dois.svg",
    "img_login_tres.svg",
    "img_login_quatro.svg",
    "img_login_cinco.svg",
    "img_login_seis.svg",
    "img_login_sete.svg",
    "img_login.svg",
    "img_login_dois.svg",
    "img_login_tres.svg",
    "img_login_quatro.svg",
    "img_login_cinco.svg",
    "img_login_seis.svg",
    "img_login_sete.svg",
  ];

  const [abaAtiva, setAbaAtiva] = useState("cadastro");

  return (
    <div className="h-full">
      <div className="flex w-full h-full">
        <div className="w-1/2 h-full">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            rewind={true}
            slidesPerView={1}
            speed={800}
            className="h-full"
          >
            {imagens.map((src, i) => (
              <SwiperSlide className="h-full" key={i}>
                <img
                  src={src}
                  alt={`Slide ${i}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="w-1/2 h-full flex flex-col items-center justify-center">
          <div className=" flex w-100/100  items-center justify-center">
            <div className="flex w-4/6 space-x-8 border-b border-gray ">
              <button
                onClick={() => {
                  setAbaAtiva("cadastro");
                }}
                className={`pb-2 transition-all ${
                  abaAtiva === "cadastro"
                    ? "text-purpledark border-b-3 border-purpledark font-bold"
                    : "text-gray border-b-3 border-transparent"
                }`}
              >
                Cadastro
              </button>

              <button
                onClick={() => {
                  setAbaAtiva("login");
                }}
                className={`pb-2 transition-all ${
                  abaAtiva === "login"
                    ? "text-purpledark border-b-3 border-purpledark font-bold"
                    : "text-gray border-b-3 border-transparent"
                }`}
              >
                Login
              </button>
            </div>
          </div>
          {abaAtiva === "login" &&
            <PLogin />
          }

          {abaAtiva === "cadastro" &&
           <PCadastro />
          }
        </div>
      </div>
    </div>
  );
}

export default Login;
